import React from 'react'
import LikeIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const PostBody = ({ content }) => {
  const handleLike = () => {
    console.log('like')
  }

  return (
    <div className="max-w-4xl mx-auto flex">
      <aside className="relative post-aside">
        <div className="post-action sticky">
          <div className="cursor-pointer">
            <LikeIcon onClick={handleLike} />
          </div>
        </div>
      </aside>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default PostBody
