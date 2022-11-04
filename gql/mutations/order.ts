import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation ($args: CreateOrderInput!) {
    createOrder(args: $args) {
      _id
      country
      createdAt
      email
      firstName
      homeAddress
      lastName
      phoneNum
      state
      stringifiedOrder
    }
  }
`;
