export class Timer {
  constructor(timeLimit, timerElement, onTimeEndCallback) {
    this.timeLimit = timeLimit;
    this.onTimeEndCallback = onTimeEndCallback;
    this.timerElement = timerElement;
    this.timeStarted = null;
    this.animationFrameId = null;

    this.prevTickText = Timer.timeFormatter.format(this.timeLimit);
    this.timerElement.updateTextContent(this.prevTickText);

    this.tick = this.tick.bind(this);
  }

  tick() {
    const now = Date.now();
    const delta = this.timeStarted + this.timeLimit - now;

    if (delta <= 0) {
      return this.onTimeEnd();
    }

    const newTickText = Timer.timeFormatter.format(delta);

    if (newTickText !== this.prevTickText) {
      this.prevTickText = newTickText;
      this.timerElement.updateTextContent(newTickText);
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  startTimer() {
    this.timeStarted = Date.now();

    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  onTimeEnd() {
    cancelAnimationFrame(this.animationFrameId);

    this.onTimeEndCallback();
  }
}

Timer.timeFormatter = new Intl.DateTimeFormat("ru", {
  minute: "numeric",
  second: "numeric",
});

export class UIElementController {
  constructor(elem) {
    this.elem = elem;
  }

  getTextContent() {
    if (!this.elem) {
      return null;
    }

    return this.elem.textContent;
  }

  updateTextContent(text) {
    if (!this.elem) {
      return;
    }

    this.elem.textContent = text;
  }
}
