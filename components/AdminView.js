import User from "./User";

const AdminView = (props) => {
  return (
    <User>
      {({ data: { me } = {} } = {}) => {
        return me && me.permissions.includes("ADMIN") ? props.children : null;
      }}
    </User>
  );
};

export default AdminView;
