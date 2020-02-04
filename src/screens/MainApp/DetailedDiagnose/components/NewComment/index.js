import React, { useState, useEffect } from 'react'
import { View, TextInput, ActivityIndicator, Keyboard } from 'react-native'
import { theme } from '~/constants'
import SvgButton from '~/components/buttons/SvgButton'
import arrowUpSvg from '~/assets/images/DetailedDiagnose/arrowUp.svg'
import styles, { SEND_BUTTON_ICON_HEIGHT, SEND_BUTTON_ICON_WIDTH, INPUT_PADDING_ON_KEYBOARD_OPENED, INPUT_PADDING_STATIC } from './styles'

const SendButton = ({ onPress, disabled, submitting }) => {
  if (submitting) {
    return (
      <View style={styles.sendButton}>
        <ActivityIndicator color='white' />
      </View>
    )
  } else {
    return (
      <SvgButton
        buttonStyle={styles.sendButton}
        svg={arrowUpSvg}
        width={SEND_BUTTON_ICON_WIDTH}
        height={SEND_BUTTON_ICON_HEIGHT}
        onPress={onPress}
        disabled={disabled}
      />
    )
  }
}

const NewComment = ({ onNewComment }) => {
  const [comment, setComment] = useState('')
  const [inputEnabled, setInputEnabled] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [commentPadding, setCommentPadding] = useState(INPUT_PADDING_STATIC)

  const sendDisabled = (comment.length === 0)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setCommentPadding(INPUT_PADDING_ON_KEYBOARD_OPENED)
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setCommentPadding(INPUT_PADDING_STATIC)
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const handlePress = async () => {
    const savedComment = comment.slice()
    Keyboard.dismiss()
    setSubmitting(true)
    setInputEnabled(false)
    setComment('')

    if (onNewComment) await onNewComment(savedComment)

    setInputEnabled(true)
    setSubmitting(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputBorders} />
      <TextInput
        onChangeText={setComment}
        value={comment}
        style={[styles.input, { paddingBottom: commentPadding }]}
        editable={inputEnabled}
        placeholder='Responder...'
        placeholderTextColor={theme.colors.gray}
      />
      <SendButton
        onPress={handlePress}
        submitting={submitting}
        disabled={sendDisabled}
      />
    </View>
  )
}

export default NewComment
