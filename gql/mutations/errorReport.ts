import { gql } from "@apollo/client";

export const REPORT_ERROR = gql`
  mutation ($stringifiedError: String!) {
    reportError(stringifiedError: $stringifiedError) {
      _id
      reportedOn
      stringifiedError
    }
  }
`;
