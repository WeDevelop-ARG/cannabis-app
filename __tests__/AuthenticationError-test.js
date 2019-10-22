import AuthenticationError from '~/AppErrors/AuthenticationError'

describe('Authentication error tests', () => {
  test('Assert Auth error has name AuthenticationError', () => {
    expect(new AuthenticationError('A test problem').name).toBe('AuthenticationError')
  })

  test('Assert Auth error has correct message', () => {
    expect(new AuthenticationError('A test problem').message).toBe('A test problem')
  })

  test('Assert Auth error has a stack trace', () => {
    expect(new AuthenticationError('').stack).not.toBe(undefined)
  })

  test.skip('Auth error prints using polymorphism', () => {
    new AuthenticationError('A message to appear in console').logError()
  })
})
