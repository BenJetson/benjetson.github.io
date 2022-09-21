import { Heading, Paragraph } from "../components/typography";
import { resumeData } from "../lib/resume";

const Resume = () => (
  <>
    {/* These are in expressions since they contain HTML entities. */}
    <Heading level={2}>{`Resumé`}</Heading>
    <Paragraph>{`Well, the human-readable format isn't ready yet.`}</Paragraph>
    <Paragraph>{`Here's the version for robots:`}</Paragraph>
    <pre>{JSON.stringify(resumeData, null, 2)}</pre>
    <Paragraph>
      You made it to the end. I guess it was easy to read then!
    </Paragraph>
  </>
);

export default Resume;
