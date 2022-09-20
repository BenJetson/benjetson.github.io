import Head from "next/head";
import Image from "next/image";
import { Heading } from "../components/typography";
import { personal } from "../lib/meta";

// FIXME remove this later.
const styles = {};

export default function Home() {
  return (
    <>
      <img src={personal.avatar} alt="Ben's Avatar" />
      <Heading level={2}>{`Hi! I'm Ben.`}</Heading>
    </>
  );
}
