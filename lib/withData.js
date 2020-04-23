import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import {
  env,
  containerized,
  devEndpoint,
  prodEndpoint,
  containerEndpoint,
} from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart";

let isBrowser = typeof window == "object";
let remoteEndpoint = env == "dev" ? devEndpoint : prodEndpoint;

function createClient({ headers }) {
  return new ApolloClient({
    credentials: "include",
    uri: isBrowser
      ? remoteEndpoint
      : containerized
      ? containerEndpoint
      : remoteEndpoint,
    /* request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers: { cookie: headers && headers.cookie },
      });
    }, */
    request: (operation) => {
      operation.setContext({
        headers,
      });
    },
    /* request: operation => {
      operation.setContext({ headers });
    }, */
    //local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });
            //write cart state to opposite
            const data = {
              data: {
                cartOpen: !cartOpen,
              },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
