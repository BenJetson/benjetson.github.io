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

class Digit {
  /**
   * Creates a new blank Digit.
   *
   * @param {HTMLElement} node the node that wraps the digit.
   */
  constructor() {
    this.value = -1;
    this.target = 0;

    this.rootNode = document.createElement("div");
    this.rootNode.classList.add("digit");
    this.rootNode.setAttribute("aria-hidden", true);

    this.innerNode = document.createElement("span");
    this.innerNode.classList.add("current");
    this.innerNode.innerText = ".";

    this.rootNode.append(this.innerNode);
  }

  /**
   * nextRolled should be called when the next digit is finished animating
   * upwards. If shall mark the next digit as the current digit.
   *
   * Then, if we have not yet reached the target value, cause a loop by calliing
   * rollCurrentToPrevious.
   *
   * Otherwise, it shall stop this cascade and remove the mutating class.
   */
  nextRolled() {
    this.innerNode.classList.replace("next", "current");

    if (this.value === this.target) {
      this.rootNode.classList.remove("mutating");
      return;
    }

    this.rollCurrentToPrevious();
  }

  /**
   * previousRolled should be called when the previous digit is finished
   * animating upwards. It shall then create the next digit and replace the
   * previous digit, causing the next digit to animate upward into place.
   *
   * Will registar a callback when the animation finishes to nextRolled.
   */
  previousRolled() {
    this.value = (this.value + 1) % 10;

    let next = document.createElement("span");
    next.innerText = this.value;
    next.classList.add("next");
    next.addEventListener("animationend", () => this.nextRolled());

    this.rootNode.replaceChild(next, this.innerNode);
    this.innerNode = next;
  }

  /**
   * rollCurrentToPrevious will take the current digit and make it the previous
   * digit, causing it to animate upwards.
   *
   * Will register a callback when the animation fishies to previousRolled.
   */
  rollCurrentToPrevious() {
    this.innerNode.classList.replace("current", "previous");
    this.innerNode.addEventListener("animationend", () =>
      this.previousRolled()
    );
  }

  /**
   * updateValue will start the process of updating this digit's value to
   * reflect the requested target.
   *
   * @param {number} target the new target value.
   */
  updateValue(target) {
    this.target = target;

    if (this.value === target) {
      // We're already at the target value; no work to do!
      return;
    }

    // Start mutating the digit to become the target value.
    this.rootNode.classList.add("mutating");
    this.rollCurrentToPrevious();
  }
}

class Counter {
  /**
   * Creates a new counter and binds it to #counter in the DOM.
   *
   * @param {Object} param0 the counter information object, see properties.
   * @param {string} param0.namespace the namespace of the count API to use.
   * @param {string} param0.key the key within the namespace to use.
   */
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

  /**
   * addDigit adds one single digit node to the end of the digits.
   */
  addDigit() {
    const d = new Digit();

    this.digits.push(d);
    this.digitContainer.prepend(d.rootNode);
  }

  /**
   * removeDigit removes one single digit node from the end of the digits.
   */
  removeDigit() {
    const d = this.digits.pop();
    this.digitContainer.removeChild(d.rootNode);
  }

  /**
   * hitCounter will hit the counter API, which will increase the value of the
   * counter by one and return the current value.
   *
   * @returns {number} the current value of the counter from the API.
   */
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

  /**
   * setCount will set the value of the counter to the provided value.
   *
   * @param {number} newCount the new count to display.
   */
  setCount(newCount) {
    this.value = newCount;

    const digitCount = countDigits(this.value);
    while (this.digits.length !== digitCount) {
      if (this.digits.length < digitCount) {
        this.addDigit();
      } else {
        this.removeDigit();
      }
    }

    this.a11yText.innerText = `The current pageview count is ${this.value}.`;

    let remaining = this.value;
    let idx = 0;
    while (remaining > 0) {
      const digitValue = remaining % 10;
      remaining = Math.floor(remaining / 10);

      this.digits[idx].updateValue(digitValue);
      idx++;
    }
  }

  /**
   * update will set the count to the current value of the counter from the API.
   *
   * @returns {number} the current value of the counter.
   */
  async update() {
    const newCount = await this.hitCounter();
    this.setCount(newCount);

    return newCount;
  }
}

// Replace placeholder counter and update from the API on page load.
window.addEventListener("load", () => {
  window.counter = new Counter(window.counterInfo);
  window.counter.update();
});
