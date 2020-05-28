import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  lastname: Yup.string()
    .required('Last Name is required'),
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  password: Yup.string()
      .min(6, 'Password needs to be more than 6 characters')
      .required('Password is required')
});

export default schema