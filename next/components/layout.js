import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }) => (
  <div className="container">
    <Navbar />
    <hr />
    {children}
    <hr />
    <Footer />
  </div>
);

export default Layout;
