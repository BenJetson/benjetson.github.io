import React from "react";

import { Box, Slide, Paper, Typography, Collapse } from "@mui/material";
import { useLocation } from "@reach/router";

const STATES = {
  CURRENT: "current",
  NEXT: "next",
  PREV: "prev",
};

const Digit = ({ target }) => {
  const containerRef = React.useRef(null);
  const [current, setCurrent] = React.useState(0);
  const [mutating, setMutating] = React.useState(false);
  const [state, setState] = React.useState(STATES.NEXT);
  const [transition, setTransition] = React.useState({
    direction: "down",
    in: true,
    appear: true,
    addEndListener: null,
  });

  console.log("rendering");

  React.useEffect(() => {
    if (current !== target) {
      console.log("target changed, must mutate");
      setMutating(true);
      setState(STATES.NEXT);
    } else {
      console.log("target changed, already current");
    }
  }, [target]);

  React.useEffect(() => {
    if (!mutating) {
      console.log("not mutating");
      return;
    }

    switch (state) {
      case STATES.CURRENT:
        console.log("current running");
        setTransition({
          in: true,
          appear: true,
          onEntered: () => {
            console.log("current transition done");
            setState(STATES.NEXT);
          },
        });
        break;
      case STATES.PREV:
        console.log("prev running");
        setCurrent((current + 1) % 10);
        setState(STATES.CURRENT);
        break;
      case STATES.NEXT:
        console.log("next running");
        if (current === target) {
          // We're at the target value now; we can stop!
          console.log("at target now; stopping mutation");
          setMutating(false);
        } else {
          console.log("next will cause transition");
          setTransition({
            in: false,
            appear: true,
            onExited: () => {
              console.log("next transition done");
              setState(STATES.PREV);
            },
          });
        }
        break;
    }
  }, [mutating, state]);

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

const Counter = ({ namespace = "bogusCount", key = "counter" }) => {
  const hitCounter = async () => {
    const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
    if (res.status !== 200) {
      throw `Failed to hit the counter API; received status ${res.status}.`;
    }

    const data = await res.json();
    if (data.value === undefined) {
      throw "Missing counter value!";
    } else if (!Number.isInteger(data.value)) {
      throw `Counter value of ${JSON.stringify(data.value)} is not an integer!`;
    }

    return data.value;
  };

  const location = useLocation();
  const [digits, setDigits] = React.useState([]);
  React.useEffect(() => {
    hitCounter().then((value) => {
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
  }, [location]);

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
