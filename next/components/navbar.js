import { navItems, site } from "../lib/meta";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import ContentContainer from "./content-container";

const NavLink = ({ href, name }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <Button
        as="a"
        colorScheme="whiteAlpha"
        color="white"
        // _hover={{
        //   bg: "blue.100",
        //   color: "blue.500",
        // }}
        // variant={isActive ? "outline" : "ghost"}
        variant="ghost"
        textDecoration={isActive ? "underline" : "none"}
        textDecorationStyle="dotted"
        textUnderlineOffset={5}
      >
        {name}
      </Button>
    </Link>
  );
};

const Navbar = () => (
  <Box bgColor="blue.500" color="white" py={3} px={6}>
    <ContentContainer>
      <HStack>
        <Link href="/">
          <a>
            <Heading as="h1">{site.title}</Heading>
          </a>
        </Link>
        <Box flexGrow={1}></Box>

        <HStack as="ul" listStyleType="none">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink {...item} />
            </li>
          ))}
        </HStack>
      </HStack>
    </ContentContainer>
  </Box>
);

export default Navbar;
