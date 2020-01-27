import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { PrimaryButton, GrayButton, Description } from '~/components'
import { theme } from '~/constants'
import styles from './styles'

const NewComment = ({ onNewComment }) => {
  const [comment, setComment] = useState('')
  const [inputEnabled, setInputEnabled] = useState(true)

  const sendEnabled = (comment.length > 0)
  const handlePress = async () => {
    setInputEnabled(false)
    if (onNewComment) await onNewComment(comment)
    setInputEnabled(true)
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setComment}
        value={comment}
        style={styles.input}
        editable={inputEnabled}
        placeholder='Responder...'
        placeholderTextColor={theme.colors.gray}
      />
      {sendEnabled &&
        <PrimaryButton onPress={handlePress}>
          <Description white>Enviar</Description>
        </PrimaryButton>}
      {!sendEnabled &&
        <GrayButton>
          <Description white>Enviar</Description>
        </GrayButton>}
    </View>
  )
}

export default NewComment
