import React from 'react'
import datoAPI from 'lib/datocms'
import { renderMetaTags } from 'react-datocms'
import Head from 'next/head'
import Layout, { Container } from 'components/layout'
import PostCard from 'components/blog/PostCard'
import HeroPost from 'components/blog/HeroPost'
import shortid from 'shortid'

const HOMEPAGE_QUERY = `
{
  allPosts {
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
      slug
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

const formatPostsByCategory = (posts) => {
  const normalizedMap = {}
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (!normalizedMap[category.name]) {
        normalizedMap[category.name] = []
      }
      normalizedMap[category.name].push(post)
    })
  })

  const sortedMap = Object.entries(normalizedMap).sort((a, b) => a[0] > b[0])

  const postsByCategory = []

  for (let [key, value] of sortedMap) {
    postsByCategory.push({
      category: key,
      posts: value,
    })
  }

  return postsByCategory
}

const Page = ({ data }) => {
  const { allPosts } = data

  const postsByCategories = formatPostsByCategory(allPosts)

  return (
    <Layout>
      <Head>
        <title>Blogging - Topics</title>
      </Head>
      <Container>
        {postsByCategories.map((section) => (
          <section className="mb-16" key={shortid.generate()}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
              {section.category}
            </h1>
            <div className="flex flex-wrap -mx-2 blogPosts-container">
              {section.posts.map((blogPost) => (
                <article className="px-2 w-1/3" key={blogPost.id}>
                  <PostCard {...blogPost} />
                </article>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </Layout>
  )
}

export default Page
