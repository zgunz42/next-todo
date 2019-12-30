import React from 'react'
import App from 'next/app'
import {Provider} from "react-redux";
import store from "../redux/store";
import Head from "next/head";
import globalStyle from "../styles/global";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport"
                content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
          />
          <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
                integrity="sha256-WAgYcAck1C1/zEl5sBl5cfyhxtLgKGdpI3oKyJffVRI="
                crossOrigin="anonymous"
          />
          <link href="https://fonts.googleapis.com/css?family=Kulim+Park&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
        <style jsx global>
        {globalStyle}
        </style>
      </Provider>
    )
  }
}

export default MyApp
