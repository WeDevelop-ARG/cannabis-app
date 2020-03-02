import React from 'react'
import { View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { formHasBlankValues } from '~/mixins/form/formHasBlankValues'
import { Description, Body } from '~/components/texts'
import { PrimaryButton } from '~/components/buttons'
import PasswordTextInput from '~/components/inputs/PasswordTextInput'
import ActivityIndicator from '~/components/ActivityIndicator'
import styles from './styles'

const initialValues = {
  lastPassword: '',
  newPassword: '',
  repeatPassword: ''
}

const schema = Yup.object().shape({
  lastPassword: Yup.string(),
  newPassword: Yup.string()
    .min(6, 'Contraseña muy corta'),
  repeatPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir')
})

const SubmitButton = ({ disabled, onPress }) => {
  return (
    <PrimaryButton
      onPress={onPress}
      disabled={disabled}
      style={styles.submitButton}
    >
      <Description white>
          Cambiar
      </Description>
    </PrimaryButton>
  )
}

const Error = ({ errorText }) => (
  Boolean(errorText) && (
    <Body style={styles.errorMessage}>
      {errorText}
    </Body>
  )
)

const SubmittingIndicator = ({ submitting }) => (
  Boolean(submitting) && (
    <ActivityIndicator />
  )
)

const Form = ({
  handleSubmit,
  errorText,
  submitting
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <View style={styles.formContainer}>
          <PasswordTextInput
            onChangeText={formikProps.handleChange('lastPassword')}
            onBlur={formikProps.handleBlur('lastPassword')}
            placeholder='Contraseña actual'
          />
          <PasswordTextInput
            onChangeText={formikProps.handleChange('newPassword')}
            onBlur={formikProps.handleBlur('newPassword')}
            placeholder='Nueva contraseña'
          />
          {formikProps.errors.newPassword && formikProps.touched.newPassword &&
            <Body style={styles.errorMessage}>{formikProps.errors.newPassword}</Body>}
          <PasswordTextInput
            onChangeText={formikProps.handleChange('repeatPassword')}
            onBlur={formikProps.handleBlur('repeatPassword')}
            placeholder='Confirmar contraseña'
          />
          {formikProps.errors.repeatPassword && formikProps.touched.repeatPassword &&
            <Body style={styles.errorMessage}>{formikProps.errors.repeatPassword}</Body>}
          <Error errorText={errorText} />
          <SubmittingIndicator submitting={submitting} />
          <SubmitButton
            onPress={formikProps.handleSubmit}
            disabled={!formikProps.isValid || formHasBlankValues(formikProps.values)}
          />
        </View>
      )}
    </Formik>
  )
}

export default Form
