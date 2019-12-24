import React from 'react'
import { View, FlatList } from 'react-native'
import { Text } from '~/components'
import styles from './styles'

const Answer = ({ text, by }) => {
  return (
    <View style={styles.answerContainer}>
      <Text fontVariant='h3' colorVariant='black'>{by}</Text>
      <Text colorVariant='black'>{text}</Text>
    </View>
  )
}

const AnswerList = ({ data }) => (
  <View style={styles.listContainer}>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Answer
          text={item.answer}
          by={item.by}
        />
      )}
      keyExtractor={(item, index) => String(index)}
    />
  </View>
)

export default AnswerList
