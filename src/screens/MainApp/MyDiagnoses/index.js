import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native'
import { isEmpty, includes } from 'lodash'
import { SwipeListView } from 'react-native-swipe-list-view'
import { verticalScale, scale } from 'react-native-size-matters/extend'
import { TabView, TabBar } from 'react-native-tab-view'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import { buildStackNavigator } from '~/components/StackNavigator'
import SvgButton from '~/components/buttons/SvgButton.js'
import Background from '~/components/Background'
import FloatingMessage from '~/components/FloatingMessage'
import NoResolvedDiagnoses from './components/NoResolvedDiagnoses'
import NoOpenDiagnoses from './components/NoOpenDiagnoses'
import StaticHeader from './components/StaticHeader'
import RenderDiagnose from './components/RenderDiagnose'
import DetailedDiagnose from '../DetailedDiagnose'
import SolutionRequest from './screens/SolutionRequest'
import FinishScreen from './screens/FinishScreen'
import FullScreenImagesView from './screens/FullScreenImagesView'
import NoDiagnosesYet from './screens/NoDiagnosesYet'
import useQueryListener from './hooks'
import { OFFSET_THRESHOLD_TO_CHANGE_HEADER } from './constants'
import trashIcon from '~/assets/images/MyDiagnoses/trash.svg'
import styles, { inactiveColor, activeColor } from './styles'

const FLOATING_MESSAGE_DURATION = 3000
const DIAGNOSE_ANIMATION_DURATION = 500

const isScrollWithinSnapThreshold = (nativeEvent) => {
  return nativeEvent.contentOffset.y > OFFSET_THRESHOLD_TO_CHANGE_HEADER
}

const deleteDiagnose = (diagnose) => {
  return DatabaseService.setDiagnoseRemovedMark(diagnose.id, true)
}

const routes = [
  { key: 'OpenDiagnoses', title: 'Abiertas' },
  { key: 'ResolvedDiagnoses', title: 'Resueltas' }
]

const MyDiagnoses = ({ navigation }) => {
  const flatListRef = useRef()
  const [diagnoses, setDiagnoses] = useState([])
  const [scrolling, setScrolling] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false)
  const [isListSwipeEnabled, setIsListSwipeEnabled] = useState(true)
  const diagnoseToRemoveRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [tab, setTab] = useState()

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

  const { results: openDiagnoses, loading: openDiagnosesLoading } = useQueryListener({
    fetch: DatabaseService.fetchUnsolvedDiagnosesFromCurrentUser
  })
  const { results: closedDiagnoses, loading: closedDiagnosesLoading } = useQueryListener({
    fetch: DatabaseService.fetchSolvedDiagnosesFromCurrentUser
  })
  const downloadingDiagnoses = openDiagnosesLoading || closedDiagnosesLoading

  useEffect(() => {
    AnalyticsService.setCurrentScreenName('My Diagnoses')
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

  const renderHiddenItem = useCallback(() => {
    return (
      <View style={[styles.hiddenField]}>
        <SvgButton
          height={verticalScale(30)}
          width={scale(21)}
          svg={trashIcon}
        />
      </View>
    )
  }, [])

  const memoizedHeader = useMemo(() => {
    return (
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
        {isEmpty(openDiagnoses) && tab === 'OpenDiagnoses' && <NoOpenDiagnoses />}
        {isEmpty(closedDiagnoses) && tab === 'ResolvedDiagnoses' && <NoResolvedDiagnoses />}
      </View>
    )
  }, [index, renderTabBar, closedDiagnoses, openDiagnoses])

  const renderItem = useCallback(({ item }) => {
    return <RenderDiagnose animationDuration={DIAGNOSE_ANIMATION_DURATION} item={item} />
  }, [])

  if (isEmpty(openDiagnoses) && isEmpty(closedDiagnoses)) {
    return (
      <Background>
        {!downloadingDiagnoses && <NoDiagnosesYet />}
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
        ListHeaderComponent={memoizedHeader}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        disableVirtualization={false}
        contentContainerStyle={styles.flatListContainer}
        onScroll={({ nativeEvent }) => { setScrolling(isScrollWithinSnapThreshold(nativeEvent)) }}
        renderHiddenItem={renderHiddenItem}
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
