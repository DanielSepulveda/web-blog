import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Layout, { Container } from 'components/layout'
import { useCurrentUser } from '../lib/hooks'
import { Form, Formik, Field } from 'formik';
import schema from '../lib/schemas/signup'

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser()
  const [errorMsg, setErrorMsg] = useState('')
  useEffect(() => {
    if (user) Router.replace('/')
  }, [user])

  const handleSubmit = async (values, formik) => {
    try {
			const body = {
				email: values.email,
				name: values.name,
				lastname: values.lastname,
				password: values.password,
			}
			const res = await fetch('/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			if (res.status === 201) {
				const userObj = await res.json()
				mutate(userObj)
			} else {
				setErrorMsg(await res.text())
			} 
		} catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Sign up</title>
        </Head>
        <Container>
          <h2>Sign up</h2>
          <Formik
            initialValues={{
							name: '',
							lastname: '',
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
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="name"
                  />
                </div>
                {errors.name && touched.name ? (
                  <p>{errors.name}</p>
                ) : null}
								<div className="md:flex md:items-center mb-6">
                  <Field
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    type="lastname"
                  />
                </div>
                {errors.lastname && touched.lastname ? (
                  <p>{errors.lastname}</p>
                ) : null}
                <div className="md:flex md:items-center mb-6">
                  <Field
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="email"
                    name="email"
                    placeholder="Email"
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
                    placeholder="Password"
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
                      Sign Up
                    </button>
                  }
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Layout>
    </>
  )
}
export default SignupPage