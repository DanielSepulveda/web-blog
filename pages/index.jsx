import React from 'react'
import Head from 'next/head'
import Layout, { Container } from '../components/layout'

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Blogging - Home</title>
      </Head>
      <Container>
        <h3>from layout</h3>
      </Container>
    </Layout>
  )
}

export default Home
