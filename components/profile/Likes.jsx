import React from 'react'
import datoAPI from 'lib/datocms'
import useSWR from 'swr'
import PostCard from 'components/blog/PostCard'

const POST_QUERY = `
	query Post($id: ItemId) {
		post(filter: { id: { eq: $id } }) {
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
	}
`

const Likes = ({ postId }) => {
	//const data = await datoAPI(POST_QUERY, { variables: { id: params.postId } })
	console.log(postId)
	const { data } = useSWR(POST_QUERY, (query) => datoAPI(query, { variables: { id: postId } }))
	console.log(data)

  if (!data) {
    return <div>Loading...</div>
  }

  const { post } = data
  return (
    <PostCard {...post}/>
  )
}

export default Likes