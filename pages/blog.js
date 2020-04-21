import Link from "next/link";
import CreateBlogPost from "../components/CreateBlogPost";
import BlogPosts from "../components/BlogPosts";

const Blog = props => (
  <React.Fragment>
    <CreateBlogPost />
    <BlogPosts />
  </React.Fragment>
);

export default Blog;
