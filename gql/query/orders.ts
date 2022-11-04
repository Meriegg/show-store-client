import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query {
    getAllOrders {
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
      cartTotal
    }
  }
`;
