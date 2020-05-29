import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUser, useUserInfo } from '../lib/hooks'
import Layout, { Container } from 'components/layout'
import Head from 'next/head'
import CommentCard from 'components/profile/Comment'
import Likes from 'components/profile/Likes'
import shortid from 'shortid'

const UserPage = () => {
  const router = useRouter()
  const [userInfo] = useUserInfo()
  const [user, { mutate }] = useCurrentUser()

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user])

  if (!userInfo) return <h1>loading...</h1>
  return (
    <Layout>
      <Head>
        <title>{`${userInfo.name} ${userInfo.lastname}`}</title>
      </Head>
      <Container>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          Profile
        </h1>
        <section className="mb-10">
          <div className="flex flex-col mb-4">
            <p className="font-bold mb-2">Name</p>
            <p>{`${userInfo.name} ${userInfo.lastname}`}</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="font-bold mb-2">Email</p>
            <p>{userInfo.email}</p>
          </div>
        </section>
        <section className="mb-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
            Comments
          </h1>
          {userInfo?.comments?.length > 0 ? (
            userInfo?.comments?.map((comment) => (
              <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md" key={shortid.generate()}>
                <CommentCard id={comment.commentId} />
              </div>
            ))
          ) : (
            <p className="text-lg italic">No comments</p>
          )}
        </section>
        <section>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
            Likes
          </h1>
          {userInfo?.likes?.length > 0 ? (
            <div className="flex flex-wrap -mx-2 blogPosts-container">
              {userInfo?.likes?.map((likes) => (
                <article className="px-2 w-1/3" key={shortid.generate()}>
                  <Likes postId={likes?.postId} />
                </article>
              ))}
            </div>
          ) : (
            <p className="text-lg italic">No likes</p>
          )}
        </section>
      </Container>
    </Layout>
  )
}

export default UserPage
