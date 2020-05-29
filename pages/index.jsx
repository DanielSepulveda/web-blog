import React from 'react'
import datoAPI from 'lib/datocms'
import { renderMetaTags } from 'react-datocms'
import Head from 'next/head'
import Layout, { Container } from 'components/layout'
import PostCard from 'components/blog/PostCard'
import HeroPost from 'components/blog/HeroPost'

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
  recentPost: post(orderBy: _createdAt_DESC) {
    id
    title
    excerpt
    date
    slug
    author {
        name
        picture {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
        }
      }
    categories {
      id
      name
    }
    coverImage {
      responsiveImage(imgixParams: { fm: jpg, fit: crop, w: 2000, h: 1000 }) {
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
  allPosts(skip: "1", first: $limit, orderBy: _createdAt_DESC) {
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
  const { allPosts, recentPost } = data

  return (
    <Layout>
      <Head>
        {renderMetaTags(data.blogSeo.seo.concat(data.site.favicon))}
        <title>Blogging - Home</title>
      </Head>
      <Container>
        <HeroPost {...recentPost} />
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
