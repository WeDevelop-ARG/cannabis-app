import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { isEmpty } from 'lodash'
import pluralize from 'pluralize'
import * as AnalyticsService from '~/analyticsService'
import Background from '~/components/Background'
import { Header as HeaderText } from '~/components/texts'
import VerticalSeparator from '~/components/VerticalSeparator'
import { firebaseTimestampToMoment } from '~/mixins/date'
import Carousel from './components/Carousel'
import Comment from './components/Comment'
import NoCommentsYet from './components/NoCommentsYet'
import Metadata from './components/Metadata'
import HeaderForCarousel from './components/HeaderForCarousel'
import HeaderForScrolling from './components/HeaderForScrolling'
import ProblemDescription from './components/ProblemDescription'
import calendar from '~/assets/images/DetailedDiagnose/calendar.svg'
import comments from '~/assets/images/DetailedDiagnose/comments.svg'
import { OFFSET_THRESHOLD_TO_CHANGE_HEADER } from './constants'
import styles from './styles'

const DetailedDiagnose = ({ navigation }) => {
  const diagnose = navigation.state.params.diagnose
  const flatListRef = useRef()
  const [showHeaderForScroll, setShowHeaderForScroll] = useState(false)
  const [carouselSection, setCarouselSection] = useState(null)
  const date = firebaseTimestampToMoment(diagnose.createdAt, 'es').format('D MMM')
  const answers = []

  AnalyticsService.setCurrentScreenName('Detailed Diagnose')

  if (diagnose.answer) {
    answers.push({
      answer: diagnose.answer,
      by: diagnose.answeredBy,
      date: firebaseTimestampToMoment(diagnose.updatedAt, 'es').format('l')
    })
  }

  const handleReturn = () => {
    navigation.goBack()
  }

  useEffect(() => {
    const buildCarouselSection = () => {
      return (
        <>
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
              data={answers.length}
              svg={comments}
            />
          </Metadata>
          <View style={styles.informationContainer}>
            <ProblemDescription description={diagnose.text} />
            <HeaderText>
              {answers.length} {pluralize('Comentario', answers.length)}
            </HeaderText>
            {isEmpty(answers) && <NoCommentsYet />}
          </View>
        </>
      )
    }

    setCarouselSection(buildCarouselSection())
  }, [])

  return (
    <Background>
      <HeaderForScrolling
        show={showHeaderForScroll}
        onGoBack={handleReturn}
        date={date}
        commentCount={answers.length}
      />
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={carouselSection}
        data={answers}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Comment
              text={item.answer}
              by={item.by}
              date={item.date}
            />
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
        disableVirtualization={false}
        onScroll={({ nativeEvent }) => {
          const showSecondHeaderIfScrolling = () => {
            if (nativeEvent.contentOffset.y > OFFSET_THRESHOLD_TO_CHANGE_HEADER) {
              setShowHeaderForScroll(true)
            } else {
              setShowHeaderForScroll(false)
            }
          }

          showSecondHeaderIfScrolling()
        }}
      />
    </Background>
  )
}

DetailedDiagnose.navigationOptions = ({ navigation }) => ({
  header: null
})

export default DetailedDiagnose
