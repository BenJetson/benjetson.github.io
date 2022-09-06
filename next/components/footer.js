import { GIT_HASH } from "../lib/env";
import { site } from "../lib/meta";

const Footer = () => (
  <footer>
    <h2>{site.title}</h2>
    <p>{site.tagline}</p>
    <pre>build {GIT_HASH}</pre>
  </footer>
);

export default Footer;
