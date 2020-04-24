import React from 'react'
import Background from '~/components/Background'
import Title from './Title'
import Navigation from './Navigation'
import Form from './Form'
import Separator from './Separator'
import SocialNetworks from './SocialNetworks'
import PrivacyPolicy from './PrivacyPolicy'
import styles from './styles'
import ForgotPassword from './ForgotPassword'
import RecoveryEmail from './RecoveryEmail'
import Logo from './Logo'

const Auth = ({ children }) => (
  <Background style={styles.container}>
    {children}
  </Background>
)

Auth.Navigation = Navigation
Auth.Logo = Logo
Auth.Title = Title
Auth.Form = Form
Auth.Separator = Separator
Auth.SocialNetworks = SocialNetworks
Auth.PrivacyPolicy = PrivacyPolicy
Auth.ForgotPassword = ForgotPassword
Auth.RecoveryEmail = RecoveryEmail

export default Auth
