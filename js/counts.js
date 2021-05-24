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

const findDigitNodes = (count) => {
  // Will give a NodeList
  const counter = document.getElementById("counter");
  const found = counter.querySelectorAll("span.digit");

  // Move nodes into an array for greater mutability.
  let nodes = [];
  for (const n of found) nodes.push(n);

  const diff = nodes.length - count;
  if (diff > 0) {
    // We have more nodes than we need. Delete some in the amount of diff.
    for (null; diff > 0; diff--) {
      counter.remove(nodes.pop());
    }
  } else if (diff < 0) {
    // We don't have enough nodes; make some more in the amount of diff.
    for (null; diff < 0; diff++) {
      const digitNode = document.createElement("span");
      digitNode.classList.add("digit");
      digitNode.innerText = "."; // placeholder text

      // Hide digits from screen readers since their readout would be confusing.
      digitNode.setAttribute("aria-hidden", true);

      counter.prepend(digitNode);
      nodes.unshift(digitNode);
    }
  }

  return nodes;
};

window.counter.update = async () => {
  const counter = document.getElementById("counter"),
    key = window.counter.key,
    namespace = window.counter.namespace;

  const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
  if (res.status !== 200) {
    throw `Failed to hit the counter API; received status ${res.status}.`;
  }

  const data = await res.json();
  if (data.value === undefined) {
    throw `Missing counter value!`;
  }

  let value = data.value;
  window.counter.value = value;

  // Clear existing nodes in the counter.
  while (counter.firstChild) counter.removeChild(counter.lastChild);

  // Add an accessible version of the counter, hidden from normal view.
  const a11yCounter = document.createElement("p");
  a11yCounter.classList.add("visually-hidden");
  a11yCounter.innerText = `The current pageview count is ${value}.`;
  counter.append(a11yCounter);

  while (value > 0) {
    const digit = value % 10;
    value = Math.floor(value / 10);

    const digitNode = document.createElement("span");
    digitNode.classList.add("digit");
    digitNode.innerText = digit;

    // Hide digits from screen readers since their readout would be confusing.
    digitNode.setAttribute("aria-hidden", true);

    counter.prepend(digitNode);
  }

  return value;
};

window.addEventListener("load", () => window.counter.update());
