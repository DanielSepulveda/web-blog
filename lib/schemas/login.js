import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string()
      .required('El correo es requerido')
      .email('Debe de ser un correo válido'),
  password: Yup.string()
      .min(6, 'La contraseña debe tener 6 caracteres como mínimo')
      .required('Contraseña requerida')
});

export default schema