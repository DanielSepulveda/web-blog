import React from 'react'
import datoAPI from 'lib/datocms'
import useSWR from 'swr'
import { Formik, Form, Field } from 'formik'
import classnames from 'classnames'
import { SiteClient } from 'datocms-client'
import TextField from 'components/shared/TextField'
import { useCurrentUser } from 'lib/hooks'
import { useSnackbar } from 'notistack'
import schema from '../../lib/schemas/comment'

const GET_POST_COMMENTS = `
  query PostComments($id: ItemId) {
    allComments(filter: { post: { eq: $id }, approved: {eq: "false" } }) {
      id
      content
    }
  }
`

const client = new SiteClient(process.env.SITE_CLIENT)

const Comments = ({ postId }) => {
  const { data } = useSWR(GET_POST_COMMENTS, (query) => datoAPI(query, { variables: { id: postId } }))
  const [user, { mutate }] = useCurrentUser()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (values, formik) => {
    try {
      const commentDato = await client.items.create({
        ...values,
        post: postId,
        approved: false,
        meta: {},
        itemType: '237912',
      })

      const res = await fetch('/api/comments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId: commentDato.id }),
      })

      if (!res.ok) throw new Error(await res.text())

      enqueueSnackbar('Comment created and pending aproval!', { variant: 'success' })
      formik.resetForm()
    } catch (_) {
      enqueueSnackbar('Error creating comment, try again later', { variant: 'error' })
    }
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const comments = data.allComments

  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tighter leading-tight mb-4">Comments</h2>
      <div className="max-w-4xl mx-auto">
        <div className="comments">
          {comments.map((comment) => (
            <div key={comment.id} className="py-5 px-2 border border-solid rounded border-black">
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
        <div className="my-8">
          {!user ? (
            <p className="font-bold italic text-lg">Signin to write comments!</p>
          ) : (
            <Formik
              initialValues={{
                content: '',
              }}
              validationSchema={schema}
              validateOnBlur={false}
              onSubmit={handleSubmit}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <div className="flex flex-col items-start">
                    <Field name="content">
                      {({ field, meta }) => (
                        <TextField field={field} meta={meta} label="Add a comment" name="content" />
                      )}
                    </Field>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comments
