import React, { useEffect, useState, memo } from 'react'
import { View } from 'react-native'
import pluralize from 'pluralize'
import { firebaseTimestampToMoment } from '~/mixins/date'
import { RealThumbnailOrPlaceholder } from '~/components'
import { Subheader, Body } from '~/components/texts'
import VerticalSeparator from '~/components/VerticalSeparator'
import styles from './styles'
import { getURL } from '~/mixins/storage'

const Diagnose = ({ thumbnail, firebaseTimestamp, description, answerQuantity, solved }) => {
  const [imageThumbnail, setImageThumbnail] = useState('')

  useEffect(() => {
    const loadThumbnail = async () => {
      setImageThumbnail(await getURL(thumbnail))
    }
    loadThumbnail()
  }, [])

  const date = firebaseTimestampToMoment(firebaseTimestamp)
  let state

  if (solved) state = <Body primary>Resuelta</Body>
  else if (answerQuantity) state = <Body secondary>En discusión</Body>
  else state = <Body secondary>Abierta</Body>

  return (
    <View style={styles.container}>
      <View>
        <RealThumbnailOrPlaceholder
          thumbnail={imageThumbnail}
          style={styles.image}
        />
      </View>
      <View style={styles.information}>
        <View style={styles.dates}>
          <Subheader>{date.format('D MMM')}</Subheader>
        </View>
        <View style={styles.description}>
          <Body numberOfLines={2}>{description}</Body>
        </View>
        <View style={styles.metadata}>
          {state}
          <VerticalSeparator style={styles.separator} />
          <Body gray>
            {answerQuantity} {pluralize('respuesta', answerQuantity)}
          </Body>
        </View>
      </View>
    </View>
  )
}

export default memo(Diagnose)
