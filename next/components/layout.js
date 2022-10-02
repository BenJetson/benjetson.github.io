import { Box, Flex } from "@chakra-ui/react";
import ContentContainer from "./content-container";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children, pageProps: { containerWrap = true } }) => (
  <>
    <Flex direction="column" minW="100%" minH="100%">
      <Navbar />
      <Box flexGrow={1}>
        {(containerWrap && <ContentContainer>{children}</ContentContainer>) ||
          children}
      </Box>
      <Footer />
    </Flex>
  </>
);

export default Layout;
