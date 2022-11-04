import { gql } from "@apollo/client";

export const GET_TYPES = gql`
  query {
    getAllTypes {
      _id
      typeName
    }
  }
`;

export const GET_PRODUCTS = gql`
  query {
    getProducts {
      _id
      productName
      price
      typesID
      images
      imageAlignment
    }
  }
`;

export const GET_PRODUCT = gql`
  query ($productId: ID!) {
    getProduct(productId: $productId) {
      _id
      images
      price
      productName
      typesID
      imageAlignment
    }
  }
`;
