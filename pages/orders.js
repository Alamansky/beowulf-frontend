import Orders from "../components/Orders";
import PleaseSignIn from "../components/PleaseSignIn";

const ordersPage = props => (
  <PleaseSignIn>
    <Orders></Orders>
  </PleaseSignIn>
);

export default ordersPage;
