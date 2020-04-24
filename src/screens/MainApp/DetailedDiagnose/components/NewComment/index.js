import React, { useState, useEffect, useMemo } from 'react'
import { View, TextInput, ActivityIndicator, Keyboard } from 'react-native'
import { without } from 'lodash'
import { theme } from '~/constants'
import SvgButton from '~/components/buttons/SvgButton'
import CameraButton from '~/components/buttons/CameraButton'
import Gallery from '~/components/Gallery'
import NewCommentImageList from '../NewCommentImageList'
import arrowUpSvg from '~/assets/images/DetailedDiagnose/arrowUp.svg'
import styles, {
  SEND_BUTTON_ICON_HEIGHT,
  SEND_BUTTON_ICON_WIDTH,
  INPUT_PADDING_ON_KEYBOARD_OPENED,
  INPUT_PADDING_STATIC,
  INPUT_PADDING_WITH_IMAGES
} from './styles'

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
  const [showImageSelection, setShowImageSelection] = useState(false)
  const [commentImages, setCommentImages] = useState([])

  const sendDisabled = (comment.length === 0)

  useEffect(() => {
    const setCorrectPadding = () => {
      if (commentImages.length === 0 || showImageSelection) setCommentPadding(INPUT_PADDING_STATIC)
      else setCommentPadding(INPUT_PADDING_WITH_IMAGES)
    }

    setCorrectPadding()

    Keyboard.removeAllListeners('keyboardDidShow')
    Keyboard.removeAllListeners('keyboardDidHide')

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (commentImages.length) setCommentPadding(INPUT_PADDING_WITH_IMAGES)
        else setCommentPadding(INPUT_PADDING_ON_KEYBOARD_OPENED)
      }
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setCorrectPadding()
      }
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [commentImages.length, showImageSelection])

  const handlePress = async () => {
    const commentBody = {
      comment: comment.slice(),
      images: commentImages
    }

    Keyboard.dismiss()
    setSubmitting(true)
    setInputEnabled(false)

    if (onNewComment) await onNewComment(commentBody)

    setComment('')
    setCommentImages([])
    setShowImageSelection(false)
    setInputEnabled(true)
    setSubmitting(false)
  }

  const toggleGallery = () => {
    Keyboard.dismiss()
    setShowImageSelection(!showImageSelection)
  }

  const selectPhotos = (images) => {
    setCommentImages(images)
    setShowImageSelection(false)
  }

  const removeImageFromList = (image) => {
    const chosenImages = without(commentImages, image)
    setCommentImages(chosenImages)
  }

  const onTextInputFocus = () => {
    setShowImageSelection(false)
  }

  const galleryComponent = useMemo(() => {
    return (
      <Gallery
        params={{ selectedImages: commentImages }}
        onSubmit={selectPhotos}
        minSelectionCount={1}
        containerStyle={styles.galleryContainer}
      />
    )
  }, [commentImages])

  return (
    <>
      <View style={styles.container}>
        <CameraButton onPress={toggleGallery} />
        <View style={styles.inputBorders} />
        <TextInput
          onChangeText={setComment}
          value={comment}
          style={[styles.input, { paddingBottom: commentPadding }]}
          editable={inputEnabled}
          placeholder='Responder...'
          placeholderTextColor={theme.colors.gray}
          onFocus={onTextInputFocus}
        />
        <SendButton
          onPress={handlePress}
          submitting={submitting}
          disabled={sendDisabled}
        />
      </View>
      {Boolean(commentImages.length) && !showImageSelection && (
        <NewCommentImageList
          images={commentImages}
          onImagePress={removeImageFromList}
          style={[styles.newCommentImageListOnTextSubmission]}
        />
      )}
      {showImageSelection && (
        <View style={styles.imageSelectionContainer}>
          {Boolean(commentImages.length) && (
            <NewCommentImageList images={commentImages} onImagePress={removeImageFromList} />
          )}
          {galleryComponent}
        </View>
      )}
    </>
  )
}

export default NewComment
