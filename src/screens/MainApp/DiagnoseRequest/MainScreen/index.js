import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { ImageSelection, Text, Button } from '~/components'
import styles from './styles'

export const MainScreen = ({ navigation }) => {
  const [showImageSelection, setShowImageSelection] = useState(false)

  const onImagesSelected = (images) => {
    const reduced = images.reduce((a, c) => {
      a.push(c.path)
      return a
    }, [])
    setShowImageSelection(false)
    console.log(reduced)
  }

  return (
    <>
      {showImageSelection && <ImageSelection onCancel={() => setShowImageSelection(false)} onImagesSelected={onImagesSelected} />}
      <View style={styles.container}>
        <Text fontVariant='h1' colorVariant='black' styles={styles.title}>Estado de mi planta</Text>
        <Image style={styles.image} />
        <Text fontVariant='h2' colorVariant='black' styles={styles.subtitle}>Conocé el estado de tu planta</Text>
        <Text fontVariant='description' colorVariant='black' style={styles.description}>Agregá un mínimo de 3 fotos en detalle y bien iluminadas para que nuestros expertos puedan darte su opinión</Text>
        <Button variant='black' style={styles.button} onPress={() => setShowImageSelection(true)}>
          <Text fontVariant='h3'>Agregar fotos</Text>
        </Button>
      </View>
    </>
  )
}

export default MainScreen
