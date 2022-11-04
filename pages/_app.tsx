import Layout from "@components/Layout";
import { store } from "@rootDir/redux/store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { client } from "@gql/client";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";
import "@styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ToastContainer
          position={"bottom-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss={false}
          theme={"light"}
          closeOnClick
          draggable
          pauseOnHover
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
