import Document, { Head, Main, NextScript } from "next/document";
import resetCSS from "../components/reset-css";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <style jsx-gobal>{resetCSS}</style>
          <link
            href="https://fonts.googleapis.com/css?family=ABeeZee"
            rel="stylesheet"
          />
          <style>{`* { font-family: 'ABeeZee', sans-serif; }`}</style>
          <script src="https://sdk.scdn.co/spotify-player.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
