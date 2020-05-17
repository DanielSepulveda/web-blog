import { GraphQLClient } from 'graphql-request'
import { CMS_ENDPOINT } from './constants'

const request = ({ query, variables }) => {
  const client = new GraphQLClient(CMS_ENDPOINT, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  })

  return client.request(query, variables)
}

export default request
