import Orders from "../components/Orders";
import PleaseSignIn from "../components/PleaseSignIn";

const ordersPage = (props) => (
  <PleaseSignIn style={{ marginTop: "8rem" }}>
    <Orders></Orders>
  </PleaseSignIn>
);

export default ordersPage;
