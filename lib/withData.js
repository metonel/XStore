import withApollo from "next-with-apollo"; //expune datele din apollo via a prop. react-appolo vine cu tool-urile necesare, da cum folosim si next, tre asta. in special pt server side rendering
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include" //cand se face un request, include si cookiurile
        },
        headers
      });
    }
  });
}

export default withApollo(createClient);
