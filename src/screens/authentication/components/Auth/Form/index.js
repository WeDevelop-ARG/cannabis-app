import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { formHasBlankValues } from '~/mixins/form/formHasBlankValues'
import PasswordTextInput from '~/components/inputs/PasswordTextInput'
import ThemedTextInputWithError from '~/components/inputs/ThemedTextInputWithError'
import { Description, PrimaryButton } from '~/components'
import Error from '~/components/texts/Error'
import AuthenticatingIndicator from '../../AuthenticatingIndicator'
import styles, { PLACEHOLDER_COLOR } from './styles'

const initialValues = {
  credential: '',
  password: ''
}

const schema = Yup.object().shape({
  credential: Yup.string()
    .email('Ops! Este no es un e-mail válido')
    .required('Requerido'),
  password: Yup.string()
    .min(6, 'Tu contraseña debe tener un mínimo de 6 caracteres')
    .required('Requerido')
})

const FormError = ({ error }) => (
  error && (
    <Error style={styles.error}>
      Credenciales no aceptadas
    </Error>
  )
)

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

const Form = ({
  handleSubmit,
  error,
  authenticating,
  credentialText,
  submitText,
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
          <ThemedTextInputWithError
            placeholder={credentialText}
            placeholderTextColor={PLACEHOLDER_COLOR}
            onChangeText={formikProps.handleChange('credential')}
            onBlur={formikProps.handleBlur('credential')}
            value={formikProps.values.credential}
            error={formikProps.errors.credential && formikProps.touched.credential}
          />
          {formikProps.errors.credential && formikProps.touched.credential &&
            <Error style={styles.errorMessage}>{formikProps.errors.credential}</Error>}
          <PasswordTextInput
            placeholder='Ingresá tu contraseña'
            placeholderTextColor={PLACEHOLDER_COLOR}
            onChangeText={formikProps.handleChange('password')}
            onBlur={formikProps.handleBlur('password')}
            value={formikProps.values.password}
            error={formikProps.errors.password && formikProps.touched.password}
          />
          {formikProps.errors.password && formikProps.touched.password &&
            <Error style={styles.errorMessage}>{formikProps.errors.password}</Error>}
          <FormError error={error} />
          <AuthenticatingIndicator authenticating={authenticating} />
          <SubmitButton
            onPress={formikProps.handleSubmit}
            disabled={!formikProps.isValid || formHasBlankValues(formikProps.values) || authenticating}
          >
            {submitText}
          </SubmitButton>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

export default Form
