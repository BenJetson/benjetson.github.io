import { site } from "../lib/meta";

const Footer = () => (
  <footer>
    <h2>{site.title}</h2>
    <p>{site.tagline}</p>
  </footer>
);

export default Footer;
