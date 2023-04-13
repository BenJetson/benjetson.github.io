"use client";

import { Box, Code, VisuallyHidden } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * countDigits will determine the number of digits in a number.
 *
 * @param {number} n the number to count the digits of.
 *
 * @returns the number of digits in n.
 */
const countDigits = (n) => {
  if (isNaN(n) || !Number.isInteger(n)) throw "Digit count requires integer.";
  else if (n < 0) throw "Cannot find digits for negative value.";
  else if (n === 0) return 1;

  let counter = 0;
  let v = n;

  while (v > 0) {
    v = Math.floor(v / 10);
    counter++;
  }

  return counter;
};

/**
 * getDigits will return an array containing the digits of a number.
 *
 * @param {number} n the number to get the digits of.
 * @param {number} minDigits the minimum number of digits.
 *
 * @returns {Array.<number>}</number> the number digits of n.
 */
const getDigits = (n, minDigits = 5) => {
  const count = Math.max(countDigits(n), minDigits);
  const digits = new Array(count).fill(0);

  let idx = 0;
  while (n > 0) {
    const v = n % 10;
    const pos = count - idx - 1;

    digits[pos] = v;
    n = Math.floor(n / 10);
    idx++;
  }

  return digits;
};

/**
 * hitCounter will hit the counter API, which will increase the value of the
 * counter by one and return the current value.
 *
 * @param {string} namespace the namespace of the count API to use.
 * @param {string} key the key within the namespace to use.
 *
 * @returns {Promise.<number>} the current value of the counter from the API.
 */
const hitCounter = async (namespace, key) => {
  const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
  if (res.status !== 200) {
    throw new Error(
      `Failed to hit the counter API; received status ${res.status}.`
    );
  }

  const data = await res.json();
  if (data.value === undefined) {
    throw "Missing counter value!";
  } else if (!Number.isInteger(data.value)) {
    throw `Counter value of ${JSON.stringify(data.value)} is not an integer!`;
  }

  return data.value;
};

const Digit = ({ value = 0 }) => {
  const distance = 10;

  const [currentValue, setCurrentValue] = useState(0);
  const [readyForFlip, setReadyForFlip] = useState(true);

  useEffect(() => {
    if (value == currentValue) return;
    if (!readyForFlip) return;

    let newValue = currentValue + 1;
    if (newValue > 9) newValue = 0;

    setCurrentValue(newValue);
    setReadyForFlip(false);
  }, [value, currentValue, readyForFlip]);

  return (
    <Code
      display="flex"
      flexDirection="column"
      backgroundColor="gray.500"
      color="white"
      fontSize="xl"
      borderRadius="lg"
      p={2}
    >
      <AnimatePresence
        initial={false}
        onExitComplete={() => setReadyForFlip(true)}
      >
        <motion.span
          key={currentValue}
          initial={{ y: -1 * distance, opacity: 0, position: "relative" }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: distance, opacity: 0, position: "absolute" }}
          transition={{
            ease: "easeOut",
            duration: 0.05,
          }}
        >
          {currentValue}
        </motion.span>
      </AnimatePresence>
    </Code>
  );
};

const Counter = () => {
  // FIXME set up real namespace and key values using environment variables.
  const namespace = "testing.benjetson.vercel.app";
  const key = "visitors-1";

  const router = useRouter();

  const [value, setValue] = useState(null);
  const [digits, setDigits] = useState(getDigits(0));

  useEffect(() => {
    (async () => {
      const result = await hitCounter(namespace, key);
      const resultDigits = getDigits(result);

      setValue(result);
      setDigits(resultDigits);
    })();
  }, [router.asPath]);

  return (
    <>
      <Box display="flex" gap={2} aria-hidden="true" my={4}>
        {digits.map((d, idx) => (
          <Digit value={d} key={idx} />
        ))}
      </Box>
      <VisuallyHidden>
        <Box>This website has had {value} page views.</Box>
      </VisuallyHidden>
    </>
  );
};

export default Counter;
