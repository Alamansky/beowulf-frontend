import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";
import Spacer from "./styles/Spacer";

const PleaseSignIn = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <Spacer>
            <p>Please sign in before Continuing</p>
            <Signin />
          </Spacer>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignIn;
