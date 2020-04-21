import { Query, Mutation } from "react-apollo";
import Error from "./ErrorMessage";
import gql from "graphql-tag";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";
import propTypes from "prop-types";

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS = gql`
  mutation UPDATE_PERMISSIONS($id: ID!, $permissions: [Permission!]!) {
    updatePermissions(id: $id, permissions: $permissions) {
      id
      name
      email
    }
  }
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <Error error={error} />
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map(permission => (
                  <th key={permission}>{permission}</th>
                ))}
                <th>V</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(
                user =>
                  user.name && <UserPermissions user={user} key={user.name} />
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: propTypes.shape({
      name: propTypes.string,
      email: propTypes.string,
      id: propTypes.string,
      permissions: propTypes.array
    }).isRequired
  };

  state = {
    permissions: this.props.user.permissions
  };

  handleChange = e => {
    const checkbox = e.target;
    const newPermission = checkbox.value;
    const permissionsCopy = [...this.state.permissions];
    const updatedPermissions = checkbox.checked
      ? permissionsCopy.concat([newPermission])
      : permissionsCopy.filter(permission => permission !== newPermission);
    this.setState({ permissions: updatedPermissions });
  };

  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS}
        variables={{
          permissions: this.state.permissions,
          id: this.props.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <React.Fragment>
              {error && <Error error={error} />}
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {possiblePermissions.map(permission => (
                  <td key={permission}>
                    <label htmlFor={`${user.id}-permission-${permission}`}>
                      <input
                        type="checkbox"
                        checked={this.state.permissions.includes(permission)}
                        value={permission}
                        onChange={this.handleChange}
                      />
                    </label>
                  </td>
                ))}
                <td>
                  <SickButton
                    type="button"
                    disabled={loading}
                    onClick={updatePermissions}
                  >
                    Updat{loading ? "ing" : "e"}
                  </SickButton>
                </td>
              </tr>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default Permissions;
