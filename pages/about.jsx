import React from 'react'
import datoAPI from 'lib/datocms'
import { renderMetaTags } from 'react-datocms'
import Head from 'next/head'
import Layout, { Container } from 'components/layout'
import PostCard from 'components/blog/PostCard'
import HeroPost from 'components/blog/HeroPost'
import shortid from 'shortid'

const ABOUT_QUERY = `
{
  allUploads(filter: {id: {in: ["1777749", "1735483"]}}) {
    id
    url(imgixParams: {fm: jpg, fit: crop, w: 300, h: 300})
  }
}`

export async function getStaticProps() {
  const data = await datoAPI(ABOUT_QUERY)
  return {
    props: {
      data,
    },
  }
}

const Page = ({ data }) => {
  const martin = data.allUploads.find((el) => el.id === '1777749')
  const daniel = data.allUploads.find((el) => el.id === '1735483')
  return (
    <Layout>
      <Head>
        <title>Blogging - About Us</title>
      </Head>
      <Container>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
          <div className="flex items-center flex-col">
            <img src={martin.url} className="rounded-full mb-2" alt="Martin photo" />
            <div className="text-xl font-bold mb-4">Martin</div>
            <div className="italic text-sm mb-4">
              Front end developer @{' '}
              <a className="text-blue-400 hover:underline" href="https://vitau.mx/" target="_blank" rel="noopener">
                Vitau
              </a>
            </div>
            <div className="text-base"></div>
          </div>
          <div className="flex items-center flex-col">
            <img src={daniel.url} className="rounded-full mb-2" alt="Daniel photo" />
            <div className="text-xl font-bold mb-4">Daniel</div>
            <div className="italic text-sm mb-4">
              Front end developer @{' '}
              <a className="text-blue-400 hover:underline" href="https://vitau.mx/" target="_blank" rel="noopener">
                Vitau
              </a>
            </div>
            <p className="text-base mb-2">
              Front-End Developer with experience in React.js, Apollo, Graphql, and Node.js. Currently working at{' '}
              <a className="text-blue-400 hover:underline" href="https://vitau.mx/" target="_blank" rel="noopener">
                Vitau
              </a>{' '}
              building the e-commerce site
            </p>
            <p className="text-base">
              Computer science major from{' '}
              <a className="text-blue-400 hover:underline" href="https://tec.mx/es" target="_blank" rel="noopener">
                Tec
              </a>{' '}
              currently cursing my 6'th semester
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Page
