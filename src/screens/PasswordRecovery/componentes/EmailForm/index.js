import React from 'react'
import {
  KeyboardAvoidingView,
  TextInput
} from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Body, Description, PrimaryButton } from '~/components'
import styles, { PLACEHOLDER_COLOR } from './styles'
import { formHasBlankValues } from '~/mixins/form/formHasBlankValues'
import { isValidEmail } from '~/mixins/form/isValidEmail'

const initialValues = {
  email: ''
}

const Error = ({ error }) => (
  error && (
    <Body style={styles.error}>
      Email invalido
    </Body>
  )
)

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Requerido')
})

const SubmitButton = ({ onPress, disabled, children }) => (
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

const EmailForm = ({
  handleSubmit,
  error,
  applyValidation
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={applyValidation && schema}
    >
      {formikProps => (
        <KeyboardAvoidingView>
          <TextInput
            style={styles.label}
            placeholder='Ingresá tu e-mail'
            placeholderTextColor={PLACEHOLDER_COLOR}
            onChangeText={formikProps.handleChange('email')}
            onBlur={formikProps.handleBlur('email')}
            value={formikProps.values.email}
          />
          <Error error={error} />
          <SubmitButton
            onPress={formikProps.handleSubmit}
            disabled={formHasBlankValues(formikProps.values) || !isValidEmail(formikProps.values.email)}
          >
            Mandarme las instrucciones
          </SubmitButton>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

export default EmailForm
