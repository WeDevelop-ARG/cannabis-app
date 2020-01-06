import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TextInput,
  View
} from 'react-native'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Formik } from 'formik'
import { isEmpty, values } from 'lodash'
import { Body, Description, GrayButton, PrimaryButton, Button } from '~/components'
import AuthenticatingIndicator from '../../AuthenticatingIndicator'
import styles, { PLACEHOLDER_COLOR, PASSWORD_TOGGLE_ICON_SIZE } from './styles'

const initialValues = {
  credential: '',
  password: ''
}

const schema = Yup.object().shape({
  credential: Yup.string()
    .email('Email inválido')
    .required('Requerido'),
  password: Yup.string()
    .min(6, 'Contraseña muy corta')
    .required('Requerido')
})

const Error = ({ error }) => (
  error && (
    <Body style={styles.error}>
  Credenciales no aceptadas
    </Body>
  )
)

const SubmitButton = ({ onPress, blankValuesExist, error, disabled, children }) => {
  if (blankValuesExist || error) {
    return (
      <GrayButton style={styles.submitButton}>
        <Description white>
          {children}
        </Description>
      </GrayButton>
    )
  } else {
    return (
      <PrimaryButton
        onPress={onPress}
        style={styles.submitButton}
        disabled={disabled}
      >
        <Description white>
          {children}
        </Description>
      </PrimaryButton>
    )
  }
}

const PasswordVisibleToggle = ({ onPress, isVisible }) => {
  return (
    <Button
      onPress={onPress}
      style={styles.togglePasswordButton}
    >
      <Icon
        type='font-awesome'
        name={isVisible ? 'eye-slash' : 'eye'}
        size={PASSWORD_TOGGLE_ICON_SIZE}
        color={PLACEHOLDER_COLOR}
      />
    </Button>
  )
}

const formHasBlankValues = (formValues) => {
  const blankValues = values(formValues).filter(element => element === '')
  return !isEmpty(blankValues)
}

const Form = ({
  handleSubmit,
  error,
  authenticating,
  credentialText,
  submitText,
  applyValidation
}) => {
  const [passwordVisible, togglePasswordVisible] = useState(false)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={applyValidation && schema}
    >
      {formikProps => (
        <KeyboardAvoidingView style={styles.container}>
          <TextInput
            style={styles.label}
            placeholder={credentialText}
            placeholderTextColor={PLACEHOLDER_COLOR}
            onChangeText={formikProps.handleChange('credential')}
            onBlur={formikProps.handleBlur('credential')}
            value={formikProps.values.credential}
          />
          {formikProps.errors.credential && formikProps.touched.credential &&
            <Body style={styles.errorMessage}>{formikProps.errors.credential}</Body>}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.label}
              placeholder='Ingresá tu contraseña'
              placeholderTextColor={PLACEHOLDER_COLOR}
              secureTextEntry={!passwordVisible}
              onChangeText={formikProps.handleChange('password')}
              onBlur={formikProps.handleBlur('password')}
              value={formikProps.values.password}
            />
            <PasswordVisibleToggle
              isVisible={passwordVisible}
              onPress={() => togglePasswordVisible(!passwordVisible)}
            />
          </View>
          {formikProps.errors.password && formikProps.touched.password &&
            <Body style={styles.errorMessage}>{formikProps.errors.password}</Body>}
          <Error error={error} />
          <AuthenticatingIndicator authenticating={authenticating} />
          <SubmitButton
            onPress={formikProps.handleSubmit}
            blankValuesExist={formHasBlankValues(formikProps.values)}
            error={!formikProps.isValid}
            disabled={authenticating}
          >
            {submitText}
          </SubmitButton>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

export default Form
