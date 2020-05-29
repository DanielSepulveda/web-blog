const extractUser = (req) => {
  if (!req.user) return null

  const { name, email, _id } = req.user

  return {
    name,
    email,
    _id
  }
}

export default extractUser
