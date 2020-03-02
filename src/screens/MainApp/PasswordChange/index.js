import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import * as AuthenticationService from '~/authenticationService'
import * as AnalyticsService from '~/analyticsService'
import Background from '~/components/Background'
import { Title } from '~/components/texts'
import Header from './components/Header'
import Form from './components/Form'
import styles from './styles'

const PasswordChange = ({ navigation }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    AnalyticsService.setCurrentScreenName('Password Change')
  }, [])

  const goBack = () => {
    navigation.pop()
  }

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setErrorText('')

    try {
      await AuthenticationService.changePassword(values.lastPassword, values.newPassword)
      navigation.pop()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          setErrorText('La contraseña actual ingresada no coincide con nuestros registros.')
          break
        case 'auth/weak-password':
          setErrorText('Contraseña muy debil.')
          break
        default:
          setErrorText('Ocurrió un error inesperado, por favor intente más tarde.')
          break
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Background style={styles.container}>
      <Header goBack={goBack} />
      <View style={styles.body}>
        <Title>Cambiá tu contraseña</Title>
        <Form
          handleSubmit={handleSubmit}
          submitting={submitting}
          errorText={errorText}
        />
      </View>
    </Background>
  )
}

PasswordChange.navigationOptions = () => ({
  header: null
})

export default PasswordChange
