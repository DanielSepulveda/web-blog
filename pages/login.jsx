import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout, { Container } from 'components/layout'
import { useCurrentUser } from '../lib/hooks'
import { Form, Formik, Field } from 'formik';
import schema from '../lib/schemas/login'

const LoginPage = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [user, { mutate }] = useCurrentUser()
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/')
  }, [user])

  const handleSubmit = async (values, formik) => {
    try {
      console.log("12341")
      const body = {
        email: values.email,
        password: values.password,
      }
      // eslint-disable-next-line no-undef
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        const userObj = await res.json()
        mutate(userObj)
      } else {
        setErrorMsg('Incorrect username or password. Try again!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Sign in</title>
        </Head>
        <Container>
          <h2>Sign in</h2>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ touched, field, errors, isValid, isSubmitting }) => (
              <Form noValidate>
                {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
                <div className="md:flex md:items-center mb-6">
                  <Field
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    type="email"
                  />
                </div>
                {errors.email && touched.email ? (
                  <p>{errors.email}</p>
                ) : null}
                <div className="md:flex md:items-center mb-6">
                  <Field
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    type="password"
                  />
                </div>
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <div className="flex justify-center">
                  {isValid ? 
                    <button 
                      className="shadow bg-gray-800 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                      type="submit"
                    >
                      Sign In
                    </button> 
                      : 
                    <button 
                      className="shadow bg-gray-400 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 cursor-not-allowed" 
                      type="submit"
                    >
                      Sign In
                    </button>
                  }
                </div>
              </Form>
            )}
          </Formik>
          {/* <form onSubmit={onSubmit}>
            {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
            <label htmlFor="email">
              <input id="email" type="email" name="email" placeholder="Email address" />
            </label>
            <label htmlFor="password">
              <input id="password" type="password" name="password" placeholder="Password" />
            </label>
            <button type="submit">Sign in</button>
          </form> */}
        </Container>
      </Layout>
    </>
  )
}
export default LoginPage