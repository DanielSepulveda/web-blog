/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Layout, { Container } from 'components/layout'
import { useCurrentUser } from '../lib/hooks'

const ProfileSection = () => {
  const [user, { mutate }] = useCurrentUser()
  const [isUpdating, setIsUpdating] = useState(false)
  const nameRef = useRef()
  const bioRef = useRef()
  const profilePictureRef = useRef()
  const [msg, setMsg] = useState({ message: '', isError: false })

  useEffect(() => {
    nameRef.current.value = user.name
    bioRef.current.value = user.bio
  }, [user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isUpdating) return
    setIsUpdating(true)
    const formData = new FormData()
    if (profilePictureRef.current.files[0]) {
      formData.append('profilePicture', profilePictureRef.current.files[0])
    }
    formData.append('name', nameRef.current.value)
    formData.append('bio', bioRef.current.value)
    // eslint-disable-next-line no-undef
    const res = await fetch('/api/user', {
      method: 'PATCH',
      body: formData,
    })
    if (res.status === 200) {
      const userData = await res.json()
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      })
      setMsg({ message: 'Profile updated' })
    } else {
      setMsg({ message: await res.text(), isError: true })
    }
  }

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault()
    const body = {
      oldPassword: e.currentTarget.oldPassword.value,
      newPassword: e.currentTarget.newPassword.value,
    }
    e.currentTarget.oldPassword.value = ''
    e.currentTarget.newPassword.value = ''

    // eslint-disable-next-line no-undef
    const res = await fetch('/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 200) {
      setMsg({ message: 'Password updated' })
    } else {
      setMsg({ message: await res.text(), isError: true })
    }
  }

  async function sendVerificationEmail() {
    // eslint-disable-next-line no-undef
    await fetch('/api/user/email/verify', {
      method: 'POST',
    })
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
          input, textarea {
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
          <title>Settings</title>
        </Head>
        <Container>
          <section>
            <h2>Edit Profile</h2>
            {msg.message ? (
              <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p>
            ) : null}
            <form onSubmit={handleSubmit}>
              {!user.emailVerified ? (
                <p>
                  Your email has not been verify.
                  <a role="button" onClick={sendVerificationEmail}>
                    Send verification email
                  </a>
                </p>
              ) : null}
              <label htmlFor="name">
                Name
                <input required id="name" name="name" type="text" placeholder="Your name" ref={nameRef} />
              </label>
              <label htmlFor="bio">
                Bio
                <textarea id="bio" name="bio" type="text" placeholder="Bio" ref={bioRef} />
              </label>
              <label htmlFor="avatar">
                Profile picture
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" ref={profilePictureRef} />
              </label>
              <button disabled={isUpdating} type="submit">
                Save
              </button>
            </form>
            <form onSubmit={handleSubmitPasswordChange}>
              <label htmlFor="oldpassword">
                Old Password
                <input type="password" name="oldPassword" id="oldpassword" required />
              </label>
              <label htmlFor="newpassword">
                New Password
                <input type="password" name="newPassword" id="newpassword" required />
              </label>
              <button type="submit">Change Password</button>
            </form>
          </section>
        </Container>
      </Layout>
    </>
  )
}

const SettingPage = () => {
  const [user] = useCurrentUser()

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    )
  }
  return (
    <>
      <ProfileSection />
    </>
  )
}

export default SettingPage
