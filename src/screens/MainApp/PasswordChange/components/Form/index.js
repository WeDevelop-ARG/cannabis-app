import React from 'react'
import { View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { formHasBlankValues } from '~/mixins/form/formHasBlankValues'
import { Description, Error } from '~/components/texts'
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
    .min(6, 'Tu contraseña debe tener un mínimo de 6 caracteres'),
  repeatPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Tus contraseñas no coinciden')
})

const SubmitButton = ({ disabled, onPress }) => {
  return (
    <PrimaryButton
      onPress={onPress}
      disabled={disabled}
      style={styles.submitButton}
    >
      <Description white>
          Guardar cambios
      </Description>
    </PrimaryButton>
  )
}

const FormError = ({ errorText }) => (
  Boolean(errorText) && (
    <Error style={styles.formErrorMessage}>
      {errorText}
    </Error>
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
            placeholder='Contraseña nueva'
            error={formikProps.errors.newPassword && formikProps.touched.newPassword}
          />
          {formikProps.errors.newPassword && formikProps.touched.newPassword &&
            <Error style={styles.errorMessage}>{formikProps.errors.newPassword}</Error>}
          <PasswordTextInput
            onChangeText={formikProps.handleChange('repeatPassword')}
            onBlur={formikProps.handleBlur('repeatPassword')}
            placeholder='Volvé a escribir tu contraseña nueva'
            error={formikProps.errors.repeatPassword && formikProps.touched.repeatPassword}
          />
          {formikProps.errors.repeatPassword && formikProps.touched.repeatPassword &&
            <Error style={styles.errorMessage}>{formikProps.errors.repeatPassword}</Error>}
          <FormError errorText={errorText} />
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
