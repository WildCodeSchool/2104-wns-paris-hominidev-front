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

export const MESSAGE_SUBSCRIPTION = gql`
  subscription Subscription($message: inputMessage) {
    message(message: $message) {
      type
      tab
      url
      group
      data
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation Mutation($type: String, $tab: String, $url: String, $group: ID, $data: String) {
    postMessage(type: $type, tab: $tab, url: $url, group: $group, data: $data) {
      type
      tab
      url
      group
      data
    }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      role
      groupId
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
