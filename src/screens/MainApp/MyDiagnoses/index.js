import React, { useState, useEffect, useRef } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { isEmpty, intersection } from 'lodash'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import { renderDiagnose } from './renderUtilities'
import Background from '~/components/Background'
import NoDiagnoses from './components/NoDiagnoses'
import StaticHeader from './components/StaticHeader'
import DetailedDiagnose from '../DetailedDiagnose'
import HeaderForScrolling from './components/HeaderForScrolling'
import { buildStackNavigator } from '~/components/StackNavigator'
import { OFFSET_THRESHOLD_TO_CHANGE_HEADER } from './constants'
import styles from './styles'

const buildDiagnose = (doc) => {
  const diagnose = doc.data({ serverTimestamps: 'estimate' })
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

const MyDiagnoses = () => {
  const flatListRef = useRef()
  const [diagnoses, setDiagnoses] = useState([])
  const [downloadingDiagnoses, setDownloadingDiagnoses] = useState(true)
  const [scrolling, setScrolling] = useState(false)

  AnalyticsService.setCurrentScreenName('My Diagnoses')

  useEffect(
    () => {
      const unsuscribe = DatabaseService.fetchDiagnosesFromCurrentUser(async (snapshot) => {
        setDownloadingDiagnoses(true)
        snapshot.docChanges().map(docChange => {
          const doc = docChange.doc
          const changeType = docChange.type

          switch (changeType) {
            case 'added': setDiagnoses(v => processAddedDiagnose(v, doc)); break
            case 'modified': setDiagnoses(v => processModifiedDiagnose(v, doc)); break
            case 'removed': setDiagnoses(v => processRemovedDiagnose(v, doc)); break
          }
        })
        setDownloadingDiagnoses(false)
      })
      return () => { unsuscribe() }
    },
    []
  )

  if (isEmpty(diagnoses)) {
    return (
      <Background>
        <NoDiagnoses />
        <View style={styles.noDiagnosesActivityIndicator}>
          {downloadingDiagnoses && <ActivityIndicator size='large' />}
        </View>
      </Background>
    )
  }

  return (
    <Background>
      <HeaderForScrolling show={scrolling} />
      <View style={styles.container}>
        {diagnoses &&
          <FlatList
            ref={flatListRef}
            data={diagnoses}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<StaticHeader />}
            renderItem={({ item }) => renderDiagnose(item.builtDiagnose, item.id)}
            keyExtractor={item => item.id}
            disableVirtualization={false}
            contentContainerStyle={styles.flatListContainer}
            onScroll={({ nativeEvent }) => { setScrolling(isScrollWithinSnapThreshold(nativeEvent)) }}
          />}
      </View>
    </Background>
  )
}

MyDiagnoses.navigationOptions = () => ({
  header: null
})

const MyDiagnosesStack = buildStackNavigator(
  {
    MyDiagnoses,
    DetailedDiagnose
  },
  {
    initialRouteName: 'MyDiagnoses'
  }
)

const allowedRoutesToShowTabBar = ['MyDiagnoses']

MyDiagnosesStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes.length <= 1) return {}

  const routesInHistoryWithTabBar = intersection(navigation.state.routes, allowedRoutesToShowTabBar)

  return { tabBarVisible: !isEmpty(routesInHistoryWithTabBar) }
}

export default MyDiagnosesStack
