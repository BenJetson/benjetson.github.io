import { Box, Collapse, Paper } from "@mui/material";
import { useLocation } from "@reach/router";
import { useEffect, useRef, useState } from "react";

const STATES = {
  CURRENT: "current",
  NEXT: "next",
  PREV: "prev",
};

const Digit = ({ target }) => {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [mutating, setMutating] = useState(false);
  const [state, setState] = useState(STATES.NEXT);
  const [transition, setTransition] = useState({
    direction: "down",
    in: true,
    appear: true,
    addEndListener: null,
  });

  useEffect(() => {
    if (current !== target) {
      setMutating(true);
      setState(STATES.NEXT);
    }
  }, [current, target]);

  useEffect(() => {
    if (!mutating) {
      return;
    }

    switch (state) {
      case STATES.CURRENT:
        setTransition({
          in: true,
          appear: true,
          onEntered: () => {
            setState(STATES.NEXT);
          },
        });
        break;
      case STATES.PREV:
        setCurrent((current + 1) % 10);
        setState(STATES.CURRENT);
        break;
      case STATES.NEXT:
        if (current === target) {
          // We're at the target value now; we can stop!
          setMutating(false);
        } else {
          setTransition({
            in: false,
            appear: true,
            onExited: () => {
              setState(STATES.PREV);
            },
          });
        }
        break;

      // no default
    }
  }, [current, target, mutating, state]);

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: (theme) => theme.palette.blueGrey.dark,
        color: (theme) => theme.palette.blueGrey.contrastText,
        display: "inline-block",
        // border: (theme) => `2px solid ${theme.palette.grey[800]}`,
        py: "5px",
        px: "10px",
        mr: 1,
        height: "1.5em",
        width: "calc(1ch + 20px + 4px)",
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
        position: "relative",
        // border: "2px solid #777",

        "&:after": {
          content: "''",
          position: "absolute",
          bottom: "50%",
          left: 0,

          zIndex: 0,

          opacity: 0.5,
          borderBottom: "1px dotted #fff",
          width: "100%",
        },
      }}
      ref={containerRef}
    >
      {/* up, true goes up from bottom ... down, false goes up from center */}
      <Collapse
        container={containerRef.current}
        timeout={200}
        direction="up"
        unmountOnExit
        {...transition}
      >
        <Box
          sx={{
            // color: (theme) => theme.palette.blueGrey.contrastText
            opacity: mutating ? 0.3 : 1,
          }}
        >
          {current}
        </Box>
      </Collapse>
    </Paper>
  );
};

const hitCounter = async (namespace, key) => {
  const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
  if (res.status !== 200) {
    throw new Error(
      `Failed to hit the counter API; received status ${res.status}.`
    );
  }

  const data = await res.json();
  if (data.value === undefined) {
    throw new Error("Missing counter value!");
  } else if (!Number.isInteger(data.value)) {
    throw new Error(
      `Counter value of ${JSON.stringify(data.value)} is not an integer!`
    );
  }

  return data.value;
};

const Counter = ({ namespace = "bogusCount", key = "counter" }) => {
  const location = useLocation();
  const [digits, setDigits] = useState([]);
  useEffect(() => {
    hitCounter(namespace, key).then((value) => {
      let remaining = value;
      if (!remaining) {
        setDigits([0]);
        return;
      }

      let newDigits = [];
      while (remaining > 0) {
        const digitValue = remaining % 10;
        remaining = Math.floor(remaining / 10);

        newDigits.unshift(digitValue);
      }

      while (newDigits.length < 5) newDigits.unshift(0);

      setDigits(newDigits);
    });
  }, [location, key, namespace]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        my: 2,
      }}
    >
      {digits.map((digit, idx) => (
        <Digit target={digit} key={`${idx}`} />
      ))}
    </Box>
  );
};

export default Counter;
