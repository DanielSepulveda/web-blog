import React from 'react'
import datoAPI from 'lib/datocms'
import useSWR from 'swr'
import { Formik, Form, Field } from 'formik'
import classnames from 'classnames'
import { SiteClient } from 'datocms-client'
import schema from '../../lib/schemas/comment'

const GET_POST_COMMENTS = `
  query PostComments($id: ItemId) {
    allComments(filter: { post: { eq: $id }, approved: {eq: "false" } }) {
      id
      content
    }
  }
`

const client = new SiteClient('5ec478748b94d8f65d051ae6195144')

const Comments = ({ postId }) => {
  const { data } = useSWR(GET_POST_COMMENTS, (query) => datoAPI(query, { variables: { id: postId } }))

  const handleSubmit = (values) => {
    console.log(values)
    client.items
      .create({
        ...values,
        post: postId,
        approved: false,
        meta: {},
        itemType: '237912',
      })
      .then((item) => {
        console.log(item)
      })
      .catch((error) => {
        console.error(error)
      })
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
                      <div className="w-full">
                        <label
                          className={classnames('block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2', {
                            'border-red-500': Boolean(meta.touched && meta.error),
                          })}
                          htmlFor="content"
                        >
                          Add a comment
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="content"
                          type="text"
                          {...field}
                        />
                        {meta.touched && meta.error && <p className="text-red-500 text-xs italic mb-6">{meta.error}</p>}
                      </div>
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
        </div>
      </div>
    </div>
  )
}

export default Comments
