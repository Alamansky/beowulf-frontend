import Items from "../components/Items";
import CreateItem from "../components/CreateItem";

const shopPage = props => {
  return (
    <React.Fragment>
      <CreateItem />
      <Items page={parseFloat(props.query.page) || 1} />
    </React.Fragment>
  );
};

export default shopPage;
