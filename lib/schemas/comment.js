import * as yup from 'yup'

const schema = yup.object().shape({
  content: yup.string().required('Please provide a comment'),
})

export default schema
