/* eslint-disable */
import useSWR from 'swr';
import fetcher from './fetch';

export const useCurrentUser = () => {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data ? data.user : undefined;
  return [user, { mutate }];
}

export const useUser = (id) => {
  const { data } = useSWR(`/api/users/${id}`, fetcher);
  return data ? data.user : undefined;
}