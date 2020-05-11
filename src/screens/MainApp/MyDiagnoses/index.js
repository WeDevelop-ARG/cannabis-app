import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native'
import { isEmpty, includes } from 'lodash'
import { SwipeListView } from 'react-native-swipe-list-view'
import { verticalScale, scale } from 'react-native-size-matters/extend'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import SvgButton from '~/components/buttons/SvgButton.js'
import Background from '~/components/Background'
import FloatingMessage from '~/components/FloatingMessage'
import NoDiagnoses from './components/NoDiagnoses'
import StaticHeader from './components/StaticHeader'
import RenderDiagnose from './components/RenderDiagnose'
import DetailedDiagnose from '../DetailedDiagnose'
import SolutionRequest from './screens/SolutionRequest'
import FinishScreen from './screens/FinishScreen'
import FullScreenImagesView from './screens/FullScreenImagesView'
import NoDiagnoseScreen from './screens/NoDiagnoseScreen'
import { buildStackNavigator } from '~/components/StackNavigator'
import { OFFSET_THRESHOLD_TO_CHANGE_HEADER } from './constants'
import trashIcon from '~/assets/images/MyDiagnoses/trash.svg'
import styles, { inactiveColor, activeColor } from './styles'
import { TabView, TabBar } from 'react-native-tab-view'

const FLOATING_MESSAGE_DURATION = 3000
const DIAGNOSE_ANIMATION_DURATION = 500

const buildDiagnose = (doc) => {
  const diagnose = doc.data({ serverTimestamps: 'estimate' })

  diagnose.id = doc.id
  diagnose.thumbnail = diagnose.imageReferences[0]

  return diagnose
}

const processAddedDiagnose = (diagnoses, doc) => {
  const _diagnoses = [...diagnoses]
  const builtDiagnose = buildDiagnose(doc)

  _diagnoses.unshift({ builtDiagnose, id: doc.id })

  return _diagnoses
}

const processModifiedDiagnose = (diagnoses, doc) => {
  const _diagnoses = [...diagnoses]
  const builtDiagnose = buildDiagnose(doc)
  const index = _diagnoses.findIndex(diagnose => diagnose.id === doc.id)

  _diagnoses[index] = { builtDiagnose, id: doc.id }

  return _diagnoses
}

const processRemovedDiagnose = (diagnoses, doc) => {
  return diagnoses.filter((diagnose) => diagnose.id !== doc.id)
}

const isScrollWithinSnapThreshold = (nativeEvent) => {
  return nativeEvent.contentOffset.y > OFFSET_THRESHOLD_TO_CHANGE_HEADER
}

const deleteDiagnose = (diagnose) => {
  return DatabaseService.setDiagnoseRemovedMark(diagnose.id, true)
}

const MyDiagnoses = ({ navigation }) => {
  const flatListRef = useRef()
  const [diagnoses, setDiagnoses] = useState([])
  const [downloadingDiagnoses, setDownloadingDiagnoses] = useState(true)
  const [scrolling, setScrolling] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false)
  const [isListSwipeEnabled, setIsListSwipeEnabled] = useState(true)
  const diagnoseToRemoveRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [tab, setTab] = useState()
  const [openDiagnoses, setOpenDiagnoses] = useState([])
  const [closedDiagnoses, setClosedDiagnoses] = useState([])

  const [routes] = useState([
    { key: 'OpenDiagnoses', title: 'Abiertas' },
    { key: 'ResolvedDiagnoses', title: 'Resueltas' }
  ])

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      indicatorStyle={styles.indicatorStyle}
      indicatorContainerStyle={styles.indicatorContainer}
      style={styles.tabBarStyle}
      labelStyle={styles.label}
    />
  )

  useEffect(
    () => {
      AnalyticsService.setCurrentScreenName('My Diagnoses')
      const unsuscribe = DatabaseService.fetchSolvedDiagnosesFromCurrentUser(async (snapshot) => {
        setDownloadingDiagnoses(true)
        snapshot.docChanges().map(docChange => {
          const doc = docChange.doc
          const changeType = docChange.type

          switch (changeType) {
            case 'added': setClosedDiagnoses(v => processAddedDiagnose(v, doc)); break
            case 'modified': setClosedDiagnoses(v => processModifiedDiagnose(v, doc)); break
            case 'removed': setClosedDiagnoses(v => processRemovedDiagnose(v, doc)); break
          }
        })
        setDownloadingDiagnoses(false)
      })
      return () => { unsuscribe() }
    },
    []
  )

  useEffect(
    () => {
      const unsuscribe = DatabaseService.fetchUnsolvedDiagnosesFromCurrentUser(async (snapshot) => {
        setDownloadingDiagnoses(true)
        snapshot.docChanges().map(docChange => {
          const doc = docChange.doc
          const changeType = docChange.type

          switch (changeType) {
            case 'added': setOpenDiagnoses(v => processAddedDiagnose(v, doc)); break
            case 'modified': setOpenDiagnoses(v => processModifiedDiagnose(v, doc)); break
            case 'removed': setOpenDiagnoses(v => processRemovedDiagnose(v, doc)); break
          }
        })
        setDownloadingDiagnoses(false)
      })
      return () => { unsuscribe() }
    },
    []
  )

  useEffect(() => {
    if (index === 0) {
      setDiagnoses(openDiagnoses)
      setTab('OpenDiagnoses')
    } else {
      setDiagnoses(closedDiagnoses)
      setTab('ResolvedDiagnoses')
    }
  },
  [index, openDiagnoses, closedDiagnoses])

  const setDiagnoseIsClosed = useCallback((diagnoseId, isClosed) => {
    const newDiagnoses = [...diagnoses]
    const index = newDiagnoses.findIndex(item => item.id === diagnoseId)

    newDiagnoses[index] = { ...newDiagnoses[index], isClosed }
    setDiagnoses(newDiagnoses)
  }, [diagnoses])

  const recoverDiagnose = useCallback(() => {
    if (diagnoseToRemoveRef.current === null) return

    setIsListSwipeEnabled(false)
    setDiagnoseIsClosed(diagnoseToRemoveRef.current.id, false)

    setTimeout(() => {
      diagnoseToRemoveRef.current.row.closeRow()
      diagnoseToRemoveRef.current = null
      setIsListSwipeEnabled(true)
    }, DIAGNOSE_ANIMATION_DURATION)
  }, [setDiagnoseIsClosed])

  const removeDiagnose = useCallback(async () => {
    if (diagnoseToRemoveRef.current === null) return

    const diagnose = diagnoseToRemoveRef.current

    setMessageVisible(false)
    setIsListSwipeEnabled(true)

    try {
      await deleteDiagnose(diagnose)
      diagnoseToRemoveRef.current = null
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la consulta. Intente nuevamente mas tarde.')
      recoverDiagnose()
    }
  })

  const handleListItemSwipe = useCallback((rowKey, rowMap) => {
    setMessageVisible(true)
    setIsListSwipeEnabled(false)
    diagnoseToRemoveRef.current = { id: rowKey, row: rowMap[rowKey] }
    setDiagnoseIsClosed(rowKey, true)
    setTimeout(removeDiagnose, FLOATING_MESSAGE_DURATION)
  }, [diagnoses, recoverDiagnose, setDiagnoseIsClosed, removeDiagnose])

  const handleRemoveCancelled = useCallback(() => {
    setMessageVisible(false)
    recoverDiagnose()
  }, [recoverDiagnose])

  if (isEmpty(openDiagnoses) && isEmpty(closedDiagnoses) && !downloadingDiagnoses) {
    return (
      <Background>
        {!downloadingDiagnoses && <NoDiagnoseScreen />}
        <View style={styles.noDiagnosesActivityIndicator}>
          {downloadingDiagnoses && <ActivityIndicator size='large' />}
        </View>
      </Background>
    )
  }

  return (
    <Background>
      <SwipeListView
        ref={flatListRef}
        data={diagnoses}
        extraData={tab}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        ListHeaderComponent={
          <View>
            <StaticHeader />
            <TabView
              navigationState={{ index, routes }}
              renderScene={() => null}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              swipeEnabled={false}
              lazy
            />
            {isEmpty(closedDiagnoses) && !downloadingDiagnoses && tab === 'ResolvedDiagnoses' && <NoDiagnoses tab={tab} />}
            {isEmpty(openDiagnoses) && !downloadingDiagnoses && tab === 'OpenDiagnoses' && <NoDiagnoses tab={tab} />}
          </View>
        }
        renderItem={({ item }) => <RenderDiagnose animationDuration={DIAGNOSE_ANIMATION_DURATION} item={item} />}
        keyExtractor={item => item.id}
        disableVirtualization={false}
        contentContainerStyle={styles.flatListContainer}
        onScroll={({ nativeEvent }) => { setScrolling(isScrollWithinSnapThreshold(nativeEvent)) }}
        renderHiddenItem={(data, rowMap) => (
          <View style={[styles.hiddenField]}>
            <SvgButton
              height={verticalScale(30)}
              width={scale(21)}
              svg={trashIcon}
            />
          </View>
        )}
        disableRightSwipe
        disableLeftSwipe={!isListSwipeEnabled}
        onRowOpen={handleListItemSwipe}
        rightOpenValue={scale(-375)}
      />

      <FloatingMessage
        text='Solicitud eliminada'
        buttonText='Deshacer'
        visible={messageVisible}
        onButtonPressed={handleRemoveCancelled}
      />
    </Background>
  )
}

MyDiagnoses.navigationOptions = () => ({
  header: null
})

const MyDiagnosesStack = buildStackNavigator(
  {
    MyDiagnoses,
    DetailedDiagnose,
    SolutionRequest,
    FinishScreen,
    FullScreenImagesView
  },
  {
    initialRouteName: 'MyDiagnoses'
  }
)

const allowedRoutesToShowTabBar = ['MyDiagnoses', 'FinishScreen']

MyDiagnosesStack.navigationOptions = ({ navigation }) => {
  const routes = navigation.state.routes
  const latestRouteName = routes[routes.length - 1].routeName
  const tabBarVisible = includes(allowedRoutesToShowTabBar, latestRouteName)

  return { tabBarVisible, swipeEnabled: tabBarVisible }
}
export default MyDiagnosesStack
