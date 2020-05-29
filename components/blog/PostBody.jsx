import React from 'react'
import LikeIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { useCurrentUser, usePostLiked } from 'lib/hooks'
import { useSnackbar } from 'notistack'
import { SiteClient } from 'datocms-client'
import useSWR from 'swr'

const client = new SiteClient(process.env.SITE_CLIENT)

const PostBody = ({ content, postId, likes }) => {
  const [user, { mutate }] = useCurrentUser()
  const { data: dataPostLiked, mutate: mutatePostLiked } = useSWR('/api/likes/postLiked', (url) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId }),
    }).then((r) => r.json())
  )
  const { enqueueSnackbar } = useSnackbar()

  const [postLikes, setPostLikes] = React.useState(likes)

  const handleLike = async () => {
    try {
      await client.items.update(postId, {
        likes: Number(likes) + 1,
      })

      const res = await fetch('/api/likes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      })

      if (!res.ok) throw new Error(await res.text())

      enqueueSnackbar('Post liked!', { variant: 'success' })
      mutatePostLiked({ isPostLiked: true })
      setPostLikes((oldLikes) => oldLikes + 1)
    } catch (e) {
      enqueueSnackbar('Error liking post, try again later', { variant: 'error' })
    }
  }

  const handleDislike = async () => {
    try {
      await client.items.update(postId, {
        likes: Number(likes) - 1,
      })

      const res = await fetch('/api/likes/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      })

      if (!res.ok) throw new Error(await res.text())

      enqueueSnackbar('Post unliked!', { variant: 'success' })
      mutatePostLiked({ isPostLiked: false })
      setPostLikes((oldLikes) => oldLikes - 1)
    } catch (e) {
      enqueueSnackbar('Error unliking post, try again later', { variant: 'error' })
    }
  }

  const isPostLiked = dataPostLiked && dataPostLiked.isPostLiked

  return (
    <div className="max-w-4xl mx-auto flex">
      {user && (
        <aside className="relative post-aside">
          <div className="post-action sticky">
            <div className="cursor-pointer">
              {isPostLiked ? <ThumbUpIcon onClick={handleDislike} /> : <LikeIcon onClick={handleLike} />}
            </div>
            <p className="text-sm text-center">{postLikes}</p>
            <p className="text-sm text-center">likes</p>
          </div>
        </aside>
      )}
      <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default PostBody
