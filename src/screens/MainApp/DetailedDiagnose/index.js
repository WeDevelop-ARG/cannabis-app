import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { isEmpty } from 'lodash'
import pluralize from 'pluralize'
import * as AnalyticsService from '~/analyticsService'
import * as DatabaseService from '~/databaseService'
import NavigationService, { ForceCleanUpOnScreenLeave, ForceRerenderOnNavigation } from '~/navigationService'
import Background from '~/components/Background'
import { Header as HeaderText } from '~/components/texts'
import VerticalSeparator from '~/components/VerticalSeparator'
import { firebaseTimestampToMoment } from '~/mixins/date'
import { isRequestSolved } from '~/mixins/diagnose/isRequestSolved'
import { getRequestStateText } from '~/mixins/diagnose/getRequestStateText'
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
import solvedSVG from '~/assets/images/DetailedDiagnose/solved.svg'
import { renderResponses, renderResponse } from './renderUtilities'
import { OFFSET_THRESHOLD_TO_CHANGE_HEADER } from './constants'
import { useActionSheet } from '@expo/react-native-action-sheet'
import styles from './styles'

const goToSolveDiagnoseScreen = (diagnose) => {
  NavigationService.navigate('SolutionRequest', { diagnose })
}

const removeDiagnose = async (diagnose, navigation) => {
  try {
    await DatabaseService.setDiagnoseRemovedMark(diagnose.id, true)
    navigation.pop()
  } catch (error) {
    Alert.alert(
      'Error',
      'No se pudo eliminar su solicitud. Intente nuevamente más tarde.'
    )
  }
}

const askForDeleteConfirmation = (diagnose, navigation) => {
  Alert.alert(
    'Eliminar consulta',
    '¿Está seguro de que desea eliminar su consulta?',
    [
      {
        text: 'Si',
        onPress: () => removeDiagnose(diagnose, navigation)
      },
      {
        text: 'No'
      }
    ]
  )
}

const DetailedDiagnose = ({ navigation }) => {
  const diagnose = navigation.state.params.diagnose
  const flatListRef = useRef()
  const [isScrolling, setIsScrolling] = useState(false)
  const [carouselSection, setCarouselSection] = useState(null)
  const [responses, setResponses] = useState([])
  const [amountOfResponses, setAmountOfResponses] = useState(diagnose.amountOfAnswers || 0)
  const [fetchedResponses, setFetchedResponses] = useState(false)
  const [error, setError] = useState(null)
  const [solved, setSolved] = useState(isRequestSolved(diagnose))
  const [solvedText, setSolvedText] = useState(getRequestStateText(diagnose))
  const { showActionSheetWithOptions } = useActionSheet()
  const date = firebaseTimestampToMoment(diagnose.createdAt, 'es').format('D MMM')

  AnalyticsService.setCurrentScreenName('Detailed Diagnose')

  const reopenDiagnose = useCallback(async (diagnose) => {
    try {
      await DatabaseService.setDiagnoseSolvedMark(diagnose.id, false)
      setSolvedText('En discusión')
      setSolved(false)
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo volver a abrir su solicitud. Intente nuevamente más tarde.'
      )
    }
  }, [])

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

  const decideIfCloseOrOpen = useCallback(
    () => {
      if (!solved) {
        goToSolveDiagnoseScreen(diagnose)
      } else {
        reopenDiagnose(diagnose)
      }
    },
    [diagnose, solved, reopenDiagnose]
  )

  const goToSolveCurrentDiagnose = useCallback(() => goToSolveDiagnoseScreen(diagnose), [diagnose])
  const reopenCurrentDiagnose = useCallback(() => reopenDiagnose(diagnose), [diagnose, reopenDiagnose])

  const onThreeDotsPress = useCallback(() => {
    const options = [(solved) ? 'Reabrir solicitud' : 'Resolver solicitud', 'Eliminar', 'Cancelar']
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0: decideIfCloseOrOpen(); break
          case 1: askForDeleteConfirmation(diagnose, navigation); break
        }
      }
    )
  }, [diagnose, navigation, solved, decideIfCloseOrOpen])

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
            onThreeDotsPress={onThreeDotsPress}
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
              data={solvedText}
              svg={solvedSVG}
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
  }, [responses, fetchedResponses, amountOfResponses, solvedText, onThreeDotsPress])

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
        solved={solved}
        onSolveTapped={goToSolveCurrentDiagnose}
        onReopenTapped={reopenCurrentDiagnose}
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
      {!solved && <NewComment onNewComment={onNewComment} />}
    </Background>
  )
}

DetailedDiagnose.navigationOptions = ({ navigation }) => ({
  header: null
})

export default DetailedDiagnose
