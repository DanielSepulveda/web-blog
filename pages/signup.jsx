/* eslint-disable import/named */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Layout, { Container } from 'components/layout'
import { useCurrentUser } from '../lib/hooks'

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser()
  const [errorMsg, setErrorMsg] = useState('')
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace('/')
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    }
    // eslint-disable-next-line no-undef
    const res = await fetch('/api/users', {
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
  }

  return (
    <>
      <style jsx>
        {`
          h2 {
            color: #333;
            text-align: center;
          }
          label {
            display: flex;
            margin-bottom: 0.5rem;
            align-items: center;
            width: 100%;
          }
          form {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          input {
            font-family: monospace;
            flex: 1 1 0%;
            margin-left: 0.5rem;
            box-shadow: none;
            width: 100%;
            color: #000;
            background-color: transparent;
            border: 1px solid #d8d8d8;
            border-radius: 5px;
            outline: 0px;
            padding: 10px 25px;
          }
          button {
            display: block;
            margin-bottom: 0.5rem;
            color: #fff;
            border-radius: 5px;
            border: none;
            background-color: #000;
            cursor: pointer;
            transition: all 0.2s ease 0s;
            padding: 10px 25px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
          }
          button:hover,
          button:active {
            transform: translate3d(0px, -1px, 0px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }
        `}
      </style>
      <Layout>
        <Head>
          <title>Sign up</title>
        </Head>
        <Container>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
            {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
            <label htmlFor="name">
              <input id="name" name="name" type="text" placeholder="Your name" />
            </label>
            <label htmlFor="email">
              <input id="email" name="email" type="email" placeholder="Email address" />
            </label>
            <label htmlFor="password">
              <input id="password" name="password" type="password" placeholder="Create a password" />
            </label>
            <button type="submit">Sign up</button>
          </form>
        </Container>
      </Layout>
    </>
  )
}

export default SignupPage
