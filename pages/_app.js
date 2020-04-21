//import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData.js";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes query to user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Page page={this.props.router.pathname}>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
