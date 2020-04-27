import Hero from "../components/Hero";
import About from "../components/About";
import FeaturedItems from "../components/FeaturedItems";
import LatestBlogPost from "../components/LatestBlogPost";
import Features from "../components/Features";
import Contact from "../components/Contact";
import ContactForm from "../components/ContactForm";

const Index = (props) => (
  <React.Fragment>
    <Hero />
    <FeaturedItems />
    <About />
    <LatestBlogPost />
    <Features />
    <ContactForm />
  </React.Fragment>
);

export default Index;
