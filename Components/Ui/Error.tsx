import styles from "@styles/Components/Ui/Error.module.scss";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REPORT_ERROR } from "@rootDir/gql/mutations/errorReport";
import { useState, useEffect } from "react";
import { ButtonFill } from "./Button";
import { ApolloError } from "@apollo/client";

interface Props {
  error: ApolloError;
}

const Error = ({ error }: Props) => {
  const [reportError, apiData] = useMutation(REPORT_ERROR);
  const [isShowingError, setShowingError] = useState(false);

  useEffect(() => {
    console.error(error);
    reportError({
      variables: {
        stringifiedError: JSON.stringify(error),
      },
      // onCompleted: () => {
      //   toast.success("Error reported successfully!");
      // },
      // onError: () => {
      //   toast.error("Failed to report error.");
      // },
    });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>Oh snap, {error?.message || ""}</h1>
        <p>
          There was a problem with our api, try refreshing this page or come
          back later!
        </p>
      </div>
      <div className={styles.data}>
        <ButtonFill onClick={() => setShowingError(!isShowingError)}>
          {isShowingError ? "hide" : "show"} error data
        </ButtonFill>
        {isShowingError ? (
          <div className={styles.data_errorContainer}>
            <p>error name: {error.name || "none"}</p>
            <p>error message: {error.message || "none"}</p>
            <p>COMPONENT ERROR</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Error;
