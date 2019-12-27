import React from 'react'
import { View } from 'react-native'
import { isEmpty } from 'lodash'
import { Text } from '~/components'
import { firebaseTimestampToMoment } from '~/mixins/date'
import pluralize from 'pluralize'
import Carousel from './Carousel'
import AnswerList from './AnswerList'
import NoAnswersYet from './NoAnswersYet'
import Datetime from './Datetime'
import Description from './Description'
import styles from './styles'

const DetailedDiagnose = ({ navigation }) => {
  const diagnose = navigation.state.params.diagnose
  const date = firebaseTimestampToMoment(diagnose.createdAt)
  const answers = []

  if (diagnose.answer) {
    answers.push({
      answer: diagnose.answer,
      by: diagnose.answeredBy
    })
  }

  return (
    <View style={styles.container}>
      <Carousel images={diagnose.imageReferences} />
      <View style={styles.informationContainer}>
        <Datetime date={date} />
        <Description description={diagnose.text} />
        <View>
          <Text fontVariant='h2' colorVariant='black'>
            {answers.length} {pluralize('Respuesta', answers.length)}
          </Text>
          <Text />
        </View>
        <AnswerList data={answers} />
        {isEmpty(answers) && <NoAnswersYet />}
        <View style={styles.container} />
      </View>
    </View>
  )
}

DetailedDiagnose.navigationOptions = () => ({
  headerTransparent: true,
  headerTintColor: 'white'
})

export default DetailedDiagnose
