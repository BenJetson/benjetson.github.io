import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Hide,
  HStack,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Show,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { FaBars } from "react-icons/fa";
import { navItems, site } from "../lib/meta";
import ContentContainer from "./content-container";
import CopyrightStatement from "./copyright";

const NavLink = ({ href, name }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Button
      href={href}
      as={Link}
      colorScheme="whiteAlpha"
      color="white"
      variant="ghost"
      textDecoration={isActive ? "underline" : "none"}
      textDecorationStyle="dotted"
      textUnderlineOffset={5}
    >
      {name}
    </Button>
  );
};

const NavStack = () => (
  <HStack as="ul" listStyleType="none" spacing="0">
    {navItems.map((item) => (
      <li key={item.href}>
        <NavLink {...item} />
      </li>
    ))}
  </HStack>
);

const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef();

  return (
    <>
      <IconButton ref={buttonRef} onClick={onOpen} icon={<FaBars />}>
        Menu
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={buttonRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt={1.5} mr={1.5} />
          <DrawerHeader borderBottomWidth={1}>{site.title}</DrawerHeader>
          <DrawerBody>
            <List>
              {navItems.map((item) => (
                <Link href={item.href} key={item.href}>
                  <ListItem onClick={onClose} py={2} px={1}>
                    <ListIcon as={item.icon} />
                    {item.name}
                  </ListItem>
                </Link>
              ))}
            </List>
          </DrawerBody>
          <DrawerFooter borderTopWidth={1} justifyContent="flex-start">
            <CopyrightStatement />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const mobileNavBreakpoint = "md";

const Navbar = () => (
  <Box bgColor="primary.600" color="white" py={3}>
    <ContentContainer>
      <HStack>
        <Link href="/">
          <Text fontSize="2xl" my={0}>
            {site.title}
          </Text>
        </Link>
        <Box flexGrow={1}></Box>
        <Show below={mobileNavBreakpoint}>
          <NavDrawer />
        </Show>
        <Hide below={mobileNavBreakpoint}>
          <NavStack />
        </Hide>
      </HStack>
    </ContentContainer>
  </Box>
);

export default Navbar;
