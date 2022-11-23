import { Heading } from "./typography";

/**
 *
 *
 * @typedef {import('./typography').HeadingProps} HeadingProps
 *
 * @param {HeadingProps} param0 the props object.
 * @returns
 */
export const CardTitle = ({ children, ...props }) => {
  return (
    <Heading my={0} size="md" {...props}>
      {children}
    </Heading>
  );
};
