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

class Digit {
  /**
   * @param {HTMLElement} node the node that wraps the digit.
   */
  constructor() {
    this.value = -1;
    this.target = 0;

    this.rootNode = document.createElement("span");
    this.rootNode.classList.add("digit");
    this.rootNode.setAttribute("aria-hidden", true);

    this.innerNode = document.createElement("span");
    this.innerNode.classList.add("current");
    this.innerNode.innerText = ".";

    this.rootNode.append(this.innerNode);
  }

  nextRolled() {
    this.innerNode.classList.replace("next", "current");

    if (this.value === this.target) {
      return;
    }

    this.rollCurrentToPrevious();
  }

  previousRolled() {
    this.value = (this.value + 1) % 10;

    let next = document.createElement("span");
    next.innerText = this.value;
    next.classList.add("next");
    next.addEventListener("animationend", () => this.nextRolled());

    console.log(this.innerNode, next);
    this.rootNode.replaceChild(next, this.innerNode);
    this.innerNode = next;
  }

  rollCurrentToPrevious() {
    this.innerNode.classList.replace("current", "previous");
    this.innerNode.addEventListener("animationend", () =>
      this.previousRolled()
    );
  }

  updateValue(target) {
    this.target = target;

    if (this.value === target) {
      return;
    }

    this.rollCurrentToPrevious();
  }
}

class Counter {
  constructor({ namespace, key }) {
    this.namespace = namespace;
    this.key = key;

    this.rootNode = document.createElement("div");
    this.rootNode.id = "counter";

    this.digitContainer = document.createElement("div");
    this.digitContainer.classList.add("digits");
    this.digitContainer.setAttribute("aria-hidden", true);

    this.a11yText = document.createElement("p");
    this.a11yText.classList.add("visually-hidden");
    this.a11yText.innerText = "The pageview count is still loading.";

    this.rootNode.append(this.digitContainer);
    this.rootNode.append(this.a11yText);

    this.value = -1;

    /** @type Digit[] */
    this.digits = [];

    const defaultDigitCount = 5;
    for (let i = 0; i < defaultDigitCount; i++) {
      this.addDigit();
    }

    document.getElementById("counter").replaceWith(this.rootNode);
  }

  addDigit() {
    const d = new Digit();

    this.digits.push(d);
    this.digitContainer.prepend(d.rootNode);
  }

  removeDigit() {
    const d = this.digits.pop();
    this.digitContainer.remove(d.rootNode);
  }

  async hitCounter() {
    const res = await fetch(
      `https://api.countapi.xyz/hit/${this.namespace}/${this.key}`
    );
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
  }

  async update() {
    this.value = await this.hitCounter();

    const digitCount = countDigits(this.value);
    while (this.digits.length !== digitCount) {
      if (this.digits.length < digitCount) {
        this.addDigit();
      } else {
        this.removeDigit();
      }
    }

    this.a11yText = `The current pageview count is ${this.value}.`;

    let remaining = this.value;
    let idx = 0;
    while (remaining > 0) {
      const digitValue = remaining % 10;
      remaining = Math.floor(remaining / 10);

      this.digits[idx].updateValue(digitValue);
      idx++;
    }
  }
}

window.addEventListener("load", () => {
  window.counter = new Counter(window.counterInfo);
  window.counter.update();
});
