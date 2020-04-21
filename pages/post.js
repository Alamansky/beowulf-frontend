import SingleBlogPost from "../components/SingleBlogPost";

const blogPostPage = props => (
  <SingleBlogPost id={props.query.id}></SingleBlogPost>
);

export default blogPostPage;
