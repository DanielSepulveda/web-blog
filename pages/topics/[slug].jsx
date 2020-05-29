import React from 'react'
import datoAPI from 'lib/datocms'
import { renderMetaTags } from 'react-datocms'
import Head from 'next/head'
import Layout, { Container } from 'components/layout'
import PostCard from 'components/blog/PostCard'
import HeroPost from 'components/blog/HeroPost'
import shortid from 'shortid'
import { useRouter } from 'next/router'

const Home = ({ category, heroPost, recentPosts, likedPosts }) => {
  const router = useRouter()
  if (!router.isFallback && !category?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <Head>
            <title>Blogging - Topic {category.name}</title>
          </Head>
          <Container>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
              {category.name}
            </h1>
            <HeroPost {...heroPost} />
            {recentPosts.length > 0 && (
              <section className="mb-16">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
                  More Posts
                </h1>
                <div className="flex flex-wrap -mx-2 blogPosts-container">
                  {recentPosts.map((blogPost) => (
                    <article className="px-2 w-1/3" key={blogPost.id}>
                      <PostCard {...blogPost} />
                    </article>
                  ))}
                </div>
              </section>
            )}
            {likedPosts.length > 0 && (
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
            )}
          </Container>
        </>
      )}
    </Layout>
  )
}

export default Home

const GET_CATEGORY_BY_SLUG = `
  query CategoryBySlug($slug: String) {
    category(filter: { slug: { eq: $slug } }) {
      id
      name
      slug
    }
  }
`

const POSTS_BY_CATEGORY = `
query PostsByCategory($id: [ItemId]) {
  heroPost: post(filter: {categories: {anyIn: $id}}, orderBy: _createdAt_DESC) {
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
      slug
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
  recentPosts: allPosts(filter: {categories: {anyIn: $id}}, skip: "1", first: "5", orderBy: _createdAt_DESC) {
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
  likedPosts: allPosts(first: "5", orderBy: likes_DESC, filter: {likes: {gt: "0"}, categories: {anyIn: $id}}) {
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

export async function getStaticProps({ params }) {
  const { category } = await datoAPI(GET_CATEGORY_BY_SLUG, { variables: { slug: params.slug } })
  const posts = await datoAPI(POSTS_BY_CATEGORY, { variables: { id: [category.id] } })

  return {
    props: {
      category,
      ...posts,
    },
  }
}

const GET_STATIC_PATHS = `
  {
    allCategories {
      slug
    }
  }
`

export async function getStaticPaths() {
  const { allCategories } = await datoAPI(GET_STATIC_PATHS)
  console.log(allCategories)
  return {
    paths:
      allCategories?.map(({ slug }) => ({
        params: {
          slug,
        },
      })) || [],
    fallback: true,
  }
}
