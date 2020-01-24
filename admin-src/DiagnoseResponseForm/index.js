import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  answer: '',
  answeredBy: ''
}

const schema = Yup.object().shape({
  answer: Yup.string().required(' Required '),
  answeredBy: Yup.string().required(' Required ')
})

const answerAs = [
  'AlFumeta',
  'THCPower',
  '25gr',
  'fernando_cannabis',
  'sativa_91',
  'RubenStonner',
  'CRIPY',
  'weedow',
  'ganjahman',
  'tricoman',
  'thegreendoctor',
  'bluesativa',
  'Sintabaco',
  'paulaenverde',
  'joseliyo',
  'jamaica97',
  'cannabisIndica',
  'cogollosano'
]

export const DiagnoseResponseForm = ({ handleSubmit, isSubmitting }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {() => (
        <Form>
          <div>
            <Field className='answer-field' component='textarea' name='answer' placeholder='answer here' />
            <ErrorMessage name='answer' />
          </div>
          <div>
            <Field name='answeredBy' component='select'>
              <option value='' label='Answer as' />
              {answerAs.map((user, index) => (
                <option key={index} value={user}>{user}</option>
              ))}
            </Field>
            <ErrorMessage name='answeredBy' />
          </div>
          <div>
            <button disabled={isSubmitting} type='submit'>Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
