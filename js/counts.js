window.counter.update = async () => {
  const counter = document.getElementById("counter"),
    key = window.counter.key,
    namespace = window.counter.namespace;

  // Clear existing nodes in the counter.
  while (counter.firstChild) counter.removeChild(counter.lastChild);

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

  while (value > 0) {
    const digit = value % 10;
    value = Math.floor(value / 10);

    const digitNode = document.createElement("span");
    digitNode.classList.add("digit");
    digitNode.innerText = digit;

    counter.prepend(digitNode);
  }

  return value;
};

window.addEventListener("load", () => window.counter.update());
