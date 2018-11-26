import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    //getInitialProps ii life cycle method din next
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    //expune query-ul catre user. Adica verifica daca in pagina sunt query-uri sau mutatii si le face inainte de render. asta ii nevoie pt server side render, in client render nu ar fi fost nevoie. in documentatia de la apollo si next sunt multe exemple pt a face sa mearga server side render-urile
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={this.props.apollo}>
          {" "}
          {/*expune appolo client la aplicatie */}
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
{
  /*withData e higher order component, si asa ne da acces la apolo in this.props */
}
