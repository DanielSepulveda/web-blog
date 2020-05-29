import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Layout, { Container } from 'components/layout'
import { useCurrentUser } from '../lib/hooks'
import { Form, Formik, Field } from 'formik'
import { useSnackbar } from 'notistack'
import TextField from 'components/shared/TextField'
import schema from '../lib/schemas/signup'

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (user) Router.replace('/')
  }, [user])

  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...restValues } = values
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restValues),
      })

      if (!res.ok) throw new Error(await res.text())

      const userObj = await res.json()

      enqueueSnackbar('Signup successful', { variant: 'success' })

      mutate(userObj)
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    }
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Sign up</title>
        </Head>
        <Container>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
            Sign up
          </h1>
          <div className="max-w-4xl mx-auto">
            <Formik
              initialValues={{
                name: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <Field name="name">
                    {({ field, meta }) => <TextField field={field} meta={meta} label="Name" name="name" />}
                  </Field>
                  <Field name="lastname">
                    {({ field, meta }) => <TextField field={field} meta={meta} label="Lastname" name="lastname" />}
                  </Field>
                  <Field name="email">
                    {({ field, meta }) => <TextField field={field} meta={meta} label="Email" name="email" />}
                  </Field>
                  <Field name="password">
                    {({ field, meta }) => (
                      <TextField field={field} meta={meta} label="Password" name="password" type="password" />
                    )}
                  </Field>
                  <Field name="confirmPassword">
                    {({ field, meta }) => (
                      <TextField
                        field={field}
                        meta={meta}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                      />
                    )}
                  </Field>
                  <div className="flex justify-center mt-8">
                    <button
                      className="shadow bg-gray-800 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      Sign Up
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
export default SignupPage
