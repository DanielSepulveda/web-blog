import React from 'react'
import datoAPI from 'lib/datocms'
import { renderMetaTags } from 'react-datocms'
import Head from 'next/head'
import Layout, { Container } from 'components/layout'
import PostCard from 'components/blog/PostCard'
import HeroPost from 'components/blog/HeroPost'

const HOMEPAGE_QUERY = `
{
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
  heroPost: post(orderBy: _createdAt_DESC) {
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
  recentPosts: allPosts(skip: "1", first: "5", orderBy: _createdAt_DESC) {
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
  likedPosts: allPosts(first: "5", orderBy: likes_DESC, filter: {likes: {gt: "0"}}) {
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
  const data = await datoAPI(HOMEPAGE_QUERY)
  return {
    props: {
      data,
    },
  }
}

const Home = ({ data }) => {
  const { recentPosts, heroPost, likedPosts } = data

  return (
    <Layout>
      <Head>
        {renderMetaTags(data.blogSeo.seo.concat(data.site.favicon))}
        <title>Blogging - Home</title>
      </Head>
      <Container>
        <HeroPost {...heroPost} />
        <section className="mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
            Recent Posts
          </h1>
          <div className="flex flex-wrap -mx-2 blogPosts-container">
            {recentPosts.map((blogPost) => (
              <article className="px-2 w-1/3" key={blogPost.id}>
                <PostCard {...blogPost} />
              </article>
            ))}
          </div>
        </section>
        <section>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
            Most Liked Posts
          </h1>
          <div className="flex flex-wrap -mx-2 blogPosts-container">
            {likedPosts.map((blogPost) => (
              <article className="px-2 w-1/3" key={blogPost.id}>
                <PostCard {...blogPost} />
              </article>
            ))}
          </div>
        </section>
      </Container>
    </Layout>
  )
}

export default Home
