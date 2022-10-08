import { Text } from "@chakra-ui/react";

const Segment = ({ children }) => (
  <Text as="span" display="inline-block" mb={0}>
    {children}
  </Text>
);

const CopyrightStatement = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <Text>
      <Segment>{`© ${year} Ben Godfrey.`}</Segment>{" "}
      <Segment>{`All rights reserved.`}</Segment>
    </Text>
  );
};

export default CopyrightStatement;
