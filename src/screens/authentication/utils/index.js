import MessagingService from '~/messagingService'

export const isValidEmail = (text) => text.includes('@')

export const enableNotificationsForUser = async () => {
  try{
    await MessagingService.checkForPermissions()
    await MessagingService.saveFCMTokenForCurrentUser()
  } catch (error) {
    console.error(error.message)
  }
}