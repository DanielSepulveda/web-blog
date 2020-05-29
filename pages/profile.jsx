import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useCurrentUser, useUserInfo } from '../lib/hooks';
import Layout, { Container } from 'components/layout'
import Head from 'next/head';
import CommentCard from 'components/profile/Comment'
import Likes from 'components/profile/Likes'

const UserPage = () => {
  const router = useRouter()
  const [userInfo] = useUserInfo()
  const [user, { mutate }] = useCurrentUser()
  useEffect(() => {
    if (!user) router.push('/login')
  }, [user])
  
  if(!userInfo) return <h1>loading...</h1>
  console.log(userInfo)
  return (
    <Layout>
      <Head>
        <title>{`${userInfo.name} ${userInfo.lastname}`}</title>
      </Head>
      <Container>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <section>
            Nombre
            <p>
              {`${userInfo.name} ${userInfo.lastname}`}
            </p>
          </section>
          <section>
            Email
            <p>
              {userInfo.email}
            </p>
          </section>
        </div>
        <div>
          { userInfo?.comments?.map((comment) => 
            <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
              <CommentCard id={comment.id}/>
            </div>
          )}

          <h1>Your Likes</h1>
          <div className="flex flex-wrap -mx-2 blogPosts-container">
            {console.log(userInfo.likes)}
            { userInfo?.likes?.map((likes) => 
              <article className="px-2 w-1/3" key={likes?.postId}>
                <h1>{likes?.postId}</h1>
                <Likes postId={likes?.postId}/>
              </article> 
            )}
            <article className="px-2 w-1/3">
              <Likes postId={4731943}/>
            </article> 
          </div>

        </div>
      </Container>
    </Layout>
  );
}

export default UserPage