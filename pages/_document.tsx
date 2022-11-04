import Document, { Html, Head, Main, NextScript } from "next/document";

const MainDocument = () => {
  return (
    <Html>
      <Head />
      <body>
        <div id="modal-root"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MainDocument;
