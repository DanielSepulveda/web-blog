import React from 'react'
import datoAPI from 'lib/datocms'
import { renderMetaTags } from 'react-datocms'
import Head from 'next/head'
import Layout, { Container } from 'components/layout'
import PostCard from 'components/blog/PostCard'

const HOMEPAGE_QUERY = `
query HomePage($limit: IntType) {
  site: _site {
    favicon: faviconMetaTags {
      attributes
      content
      tag
    }
  }
  blogSeo {
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
  }
  allPosts(first: $limit) {
    id
    title
    excerpt
    date
    slug
    author {
      name
    }
    categories {
      id
      name
    }
    coverImage {
      responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
}`

export async function getStaticProps() {
  const data = await datoAPI(HOMEPAGE_QUERY, {
    variables: { limit: 10 },
  })
  return {
    props: {
      data,
    },
  }
}

const Home = ({ data }) => {
  const { allPosts } = data
  return (
    <Layout>
      <Head>
        {renderMetaTags(data.blogSeo.seo.concat(data.site.favicon))}
        <title>Blogging - Home</title>
      </Head>
      <Container>
        <div className="flex flex-wrap -mx-2 blogPosts-container">
          {allPosts.map((blogPost) => (
            <article className="px-2 w-1/3" key={blogPost.id}>
              <PostCard {...blogPost} />
            </article>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export default Home
