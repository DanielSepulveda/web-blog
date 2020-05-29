import React from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import datoAPI from 'lib/datocms'
import markdownToHtml from 'lib/markdownToHtml'
import Layout, { Container } from 'components/layout'
import PostTitle from 'components/blog/PostTitle'
import PostHeader from 'components/blog/PostHeader'
import PostBody from 'components/blog/PostBody'
import PostComments from 'components/blog/PostComments'
import PostTopics from 'components/blog/PostTopics'
import MorePosts from 'components/blog/MorePosts'

const Post = ({ post, morePosts }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{` Blogging - ${post.title}`}</title>
              </Head>
              <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} author={post.author} />
              <PostBody content={post.content} postId={post.id} likes={post.likes} />
            </article>
            <hr className="border-accent-2 mt-28 mb-12" />
            <PostComments postId={post.id} />
            <hr className="border-accent-2 mt-28 mb-12" />
            <PostTopics categories={post.categories} />
            <hr className="border-accent-2 mt-28 mb-12" />
            <MorePosts posts={morePosts} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

const GET_POST_BY_SLUG = `
  query PostBySlug($slug: String) {
    post(filter: { slug: { eq: $slug } }) {
      id
      slug
      title
      date
      content
      likes
      categories {
        id
        name
      }
      author {
        name
        picture {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
        }
      }
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          bgColor
          base64
        }
      }
    }

    morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
      id
      title
      slug
      excerpt
      date
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
  }
`

export async function getStaticProps({ params }) {
  const data = await datoAPI(GET_POST_BY_SLUG, { variables: { slug: params.slug } })
  const content = await markdownToHtml(data?.post?.content || '')

  return {
    props: {
      post: {
        ...data?.post,
        content,
      },
      morePosts: data?.morePosts || [],
    },
  }
}

const GET_STATIC_PATHS = `
  {
    allPosts {
      slug
    }
  }
`

export async function getStaticPaths() {
  const { allPosts } = await datoAPI(GET_STATIC_PATHS)
  return {
    paths:
      allPosts?.map(({ slug }) => ({
        params: {
          slug,
        },
      })) || [],
    fallback: true,
  }
}
