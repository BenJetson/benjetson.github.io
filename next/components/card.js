import { Flex } from "@chakra-ui/react";

const cardSpacing = 4;
const cardBorderWidth = 1;
const cardBorderColor = "gray.100";
const cardBorderStyle = "solid";
const cardBorderRadius = 5;

export const CardHeader = ({ children }) => (
  <Flex
    borderBottomColor={cardBorderColor}
    borderBottomWidth={cardBorderWidth}
    borderBottomStyle={cardBorderStyle}
    shrink={0}
    p={cardSpacing}
  >
    {children}
  </Flex>
);

export const CardContent = ({ children }) => (
  <Flex p={cardSpacing}>{children}</Flex>
);

export const Card = ({ children }) => (
  <Flex
    direction="column"
    bg="white"
    // alignItems="center"
    borderColor={cardBorderColor}
    borderWidth={cardBorderWidth}
    borderStyle={cardBorderStyle}
    borderRadius={cardBorderRadius}
    boxShadow="sm"
    // mt={cardSpacing}
  >
    {children}
  </Flex>
);
