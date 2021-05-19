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

  const value = data.value;

  counter.innerText = value;
  window.counter.value = value;

  return value;
};

window.addEventListener("load", () => window.counter.update());
