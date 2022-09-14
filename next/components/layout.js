import { Flex } from "@chakra-ui/react";
import ContentContainer from "./content-container";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }) => (
  <>
    <Flex direction="column" minW="100%" minH="100%">
      <Navbar />
      <Flex grow={1}>
        <ContentContainer>{children}</ContentContainer>
      </Flex>
      <Footer />
    </Flex>
  </>
);

export default Layout;
