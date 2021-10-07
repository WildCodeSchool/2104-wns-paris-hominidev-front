import { gql, useQuery } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const getData = () => {
   const GetUsers = gql`
      {
         users {
            id
            lastname
            firstname
            email
         }
      }
   `;
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const { loading, error, data } = useQuery(GetUsers);
   return { loading, data, error };
};
