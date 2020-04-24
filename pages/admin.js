import Signup from "../components/Signup";
import Signin from "../components/Signin";
import RequestReset from "../components/RequestReset";
import AdminView from "../components/AdminView";
import User from "../components/User";
import SignOut from "../components/SignOut";
import { theme } from "../components/Page";
import styled from "styled-components";
import Blurb from "../components/styles/Blurb";
import Breadcrumbs from "../components/Breadcrumbs";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const adminPage = (props) => (
  <User>
    {({ data: { me } = {} } = {}) => {
      return (
        <React.Fragment>
          <Breadcrumbs
            chain={[
              ["Beowulf", "/"],
              ["Admin", "/admin"],
            ]}
          ></Breadcrumbs>
          {me && me.permissions && me.permissions.includes("ADMIN") && (
            <Blurb>
              <p>
                You are currently logged in as a site admin. If you wish to view
                the site as a customer, click the button below.
              </p>
              <SignOut backgroundColor={theme.red} />
            </Blurb>
          )}
          <Columns>
            <Signin />
            <RequestReset />
            <AdminView>
              <Signup />
            </AdminView>
          </Columns>
        </React.Fragment>
      );
    }}
  </User>
);

export default adminPage;
