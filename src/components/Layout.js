import { Box } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <Navbar />
    <Box component="main" sx={{ flexGrow: 1 }}>
      {children}
    </Box>
    <Footer />
  </Box>
);

export default Layout;
