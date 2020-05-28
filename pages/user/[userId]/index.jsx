import React from 'react';
import { useCurrentUser } from '../../../lib/hooks';
import Layout, { Container } from 'components/layout'

const UserPage = ({user}) => {
  const [currentUser] = useCurrentUser();
  console.log(currentUser)
  // const currentUser = currentUser?._id === user._id;
  return (
    <Layout>
      <h1>la</h1>
    </Layout>
  );
}


export default UserPage