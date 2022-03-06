import React from "react";

import { Box, Slide, Paper, Typography, Collapse } from "@mui/material";

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
      sx={{
        display: "inline-block",
        // border: (theme) => `2px solid ${theme.palette.grey[800]}`,
        py: 2,
        px: 1,
        mr: 1,
        height: "3em",
        width: "2em",
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
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
          sx={
            {
              // color: (theme) => theme.palette.blueGrey.contrastText
            }
          }
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
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
      {digits.map((digit, idx) => (
        <Digit target={digit} key={`${idx}-${digit}`} />
      ))}
    </Box>
  );
};

export default Counter;
