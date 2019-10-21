import 'react-native'
import * as firebase from 'firebase'
import firebaseConfig from '~/configs/firebase'
import DatabaseService from '~/databaseService'

// careful, all these test involve real transactions in a database so I will put a describe clause to facilitate skipping

const username = 'user'
const email = 'user@test.com'

describe.skip('test that involve real database transactions', () => {
  beforeAll(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig)
    }
  })

  beforeEach(async () => {
    await firebase.firestore().doc('testing/user').set({
      email,
      username
    })
  })

  test('set on database', async () => {
    await DatabaseService.set('testing/another', {
      email: 'another@test.com',
      username: 'another'
    })
    const databaseSnapshot = await firebase.firestore().doc('testing/another').get()
    const values = databaseSnapshot.data()
    expect(values).toEqual({
      email: 'another@test.com',
      username: 'another'
    })
  })

  test('get to the database', async () => {
    const values = await DatabaseService.get('testing/user')
    expect(values).toEqual({
      email: 'user@test.com',
      username: 'user'
    })
  })

  test('get email from username', async () => {
    const email = await DatabaseService.queryEmailFromUsername('user', 'testing')
    expect(email).toBe('user@test.com')
  })

  test('get email from non-existant username', async () => {
    const email = await DatabaseService.queryEmailFromUsername('notUser', 'testing')
    expect(email).toBeUndefined()
  })

  test('username already in user', async () => {
    expect(await DatabaseService.usernameAlreadyInUse('user', 'testing')).toBeTruthy()
  })

  test('update tests', async () => {
    const data = {
      email: '2@test.com',
      username: 'user'
    }

    await DatabaseService.update('testing/user', data)

    const databaseSnapshot = await firebase.firestore().doc('testing/user').get()
    const values = databaseSnapshot.data()
    expect(values).toEqual({
      email: '2@test.com',
      username: 'user'
    })
  })
})
