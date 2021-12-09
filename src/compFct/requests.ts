import { gql } from '@apollo/client';
import { Operation } from '@apollo/client/core';

export const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
    }
  }
`;

export const COMMENTS_SUBSCRIPTION2 = gql`
  subscription Subscription($roomId: Int!) {
    newRoomMessage(roomId: $roomId) {
      message
    }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const LIST_STUDENTS = gql`
  {
    users {
      id
      lastname
      firstname
      email
    }
  }
`;
