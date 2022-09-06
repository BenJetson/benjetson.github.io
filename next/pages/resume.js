import { resumeData } from "../lib/resume";

const Resume = () => (
  <>
    <h1>{"Resumé"}</h1>
    <p>Well, the human-readable format isn't ready yet.</p>
    <p>Here's the version for robots:</p>
    <pre>{JSON.stringify(resumeData, null, 2)}</pre>
    <p>You made it to the end. I guess it was easy to read then!</p>
  </>
);

export default Resume;
