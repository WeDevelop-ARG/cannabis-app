import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { isEmpty } from 'lodash'
import pluralize from 'pluralize'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import { ForceCleanUpOnScreenLeave, ForceRerenderOnNavigation } from '~/navigationService'
import Background from '~/components/Background'
import { Header as HeaderText } from '~/components/texts'
import VerticalSeparator from '~/components/VerticalSeparator'
import { firebaseTimestampToMoment } from '~/mixins/date'
import Carousel from './components/Carousel'
import NoCommentsYet from './components/NoCommentsYet'
import Metadata from './components/Metadata'
import HeaderForCarousel from './components/HeaderForCarousel'
import HeaderForScrolling from './components/HeaderForScrolling'
import ProblemDescription from './components/ProblemDescription'
import AppDefaultStatusBar from '~/components/statusBars/AppDefaultStatusBar'
import StatusBar from '~/components/statusBars/StatusBar'
import StatusBarForCarousel from './components/StatusBarForCarousel'
import StatusBarOnScroll from './components/StatusBarOnScroll'
import NewComment from './components/NewComment'
import calendar from '~/assets/images/DetailedDiagnose/calendar.svg'
import comments from '~/assets/images/DetailedDiagnose/comments.svg'
import { renderResponses, renderResponse } from './renderUtilities'
import { OFFSET_THRESHOLD_TO_CHANGE_HEADER } from './constants'
import styles from './styles'

const DetailedDiagnose = ({ navigation }) => {
  const diagnose = navigation.state.params.diagnose
  const flatListRef = useRef()
  const [isScrolling, setIsScrolling] = useState(false)
  const [carouselSection, setCarouselSection] = useState(null)
  const [responses, setResponses] = useState([])
  const [amountOfResponses, setAmountOfResponses] = useState(diagnose.amountOfAnswers || 0)
  const [fetchedResponses, setFetchedResponses] = useState(false)
  const [error, setError] = useState(null)
  const date = firebaseTimestampToMoment(diagnose.createdAt, 'es').format('D MMM')

  AnalyticsService.setCurrentScreenName('Detailed Diagnose')

  const handleReturn = () => {
    navigation.goBack()
  }

  const cleanCarouselStatusBar = () => {
    AppDefaultStatusBar.setAsCurrent()
    StatusBar.setTranslucent(false, true)
  }

  const rerenderCorrectStatusBar = () => {
    StatusBar.setTranslucent(true, true)
    isScrolling ? StatusBarOnScroll.setAsCurrent() : StatusBarForCarousel.setAsCurrent()
  }

  useEffect(() => {
    const buildResponses = async () => {
      const rawResponses = await DatabaseService.getResponsesForDiagnose(diagnose.id)
      const renderedResponses = await renderResponses(rawResponses)

      setResponses(renderedResponses)
      setFetchedResponses(true)
    }

    buildResponses()
  }, [])

  useEffect(() => {
    const buildCarouselSection = () => {
      return (
        <>
          <StatusBarForCarousel />
          <HeaderForCarousel
            photoQuantity={diagnose.imageReferences.length}
            onGoBack={handleReturn}
          />
          <Carousel images={diagnose.imageReferences} />
          <Metadata metadataContainerStyle={styles.metadataContainer}>
            <Metadata.Item
              style={styles.metadataAsColumn}
              data={date}
              svg={calendar}
            />
            <VerticalSeparator />
            <Metadata.Item
              style={styles.metadataAsColumn}
              data={amountOfResponses}
              svg={comments}
            />
          </Metadata>
          <View style={styles.informationContainer}>
            <ProblemDescription description={diagnose.text} />
            <HeaderText>
              {amountOfResponses} {pluralize('Comentario', amountOfResponses)}
            </HeaderText>
            {fetchedResponses && isEmpty(responses) && <NoCommentsYet />}
          </View>
        </>
      )
    }

    setCarouselSection(buildCarouselSection())
  }, [responses, fetchedResponses, amountOfResponses])

  const onNewComment = async (answer) => {
    try {
      const response = await DatabaseService.addDiagnoseResponse(diagnose.id, answer)
      const renderedResponse = await renderResponse(response)

      setResponses([renderedResponse, ...responses])
      setAmountOfResponses(v => v + 1)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Background>
      <ForceCleanUpOnScreenLeave cleanUpFunction={cleanCarouselStatusBar} />
      <ForceRerenderOnNavigation resetStateFunction={rerenderCorrectStatusBar} />
      <HeaderForScrolling
        show={isScrolling}
        onGoBack={handleReturn}
        date={date}
        commentCount={amountOfResponses}
      />
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={carouselSection}
        data={responses}
        renderItem={({ item }) => item}
        keyExtractor={(item, index) => String(index)}
        disableVirtualization={false}
        onScroll={({ nativeEvent }) => {
          const showHiddenComponentsIfScrolling = () => {
            if (nativeEvent.contentOffset.y > OFFSET_THRESHOLD_TO_CHANGE_HEADER) {
              setIsScrolling(true)
              StatusBarOnScroll.setAsCurrent()
            } else {
              setIsScrolling(false)
              StatusBarForCarousel.setAsCurrent()
            }
          }

          showHiddenComponentsIfScrolling()
        }}
      />
      <NewComment onNewComment={onNewComment} />
    </Background>
  )
}

DetailedDiagnose.navigationOptions = ({ navigation }) => ({
  header: null
})

export default DetailedDiagnose
