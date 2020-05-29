import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout, { Container } from 'components/layout'
import { useSnackbar } from 'notistack'
import { useCurrentUser } from '../lib/hooks'
import { Form, Formik, Field } from 'formik'
import TextField from 'components/shared/TextField'
import schema from '../lib/schemas/login'

const LoginPage = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [user, { mutate }] = useCurrentUser()

  useEffect(() => {
    if (user) router.push('/')
  }, [user])

  const handleSubmit = async (values, formik) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error(await res.text())

      const userObj = await res.json()

      enqueueSnackbar('Signin successful', { variant: 'success' })

      mutate(userObj)
    } catch (_) {
      enqueueSnackbar('Incorrect email or password', { variant: 'error' })
    }
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Sign in</title>
        </Head>
        <Container>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
            Sign in
          </h1>
          <div className="max-w-4xl mx-auto">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <Field name="email">
                    {({ field, meta }) => <TextField field={field} meta={meta} label="Email" name="email" />}
                  </Field>
                  <Field name="password">
                    {({ field, meta }) => (
                      <TextField field={field} meta={meta} label="Password" name="password" type="password" />
                    )}
                  </Field>
                  <div className="flex justify-center mt-8">
                    <button
                      className="shadow bg-gray-800 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      Sign In
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Layout>
    </>
  )
}
export default LoginPage
