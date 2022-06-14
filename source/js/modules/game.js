export class Timer {
  constructor(timeLimit, timerElement, onTimeEndCallback) {
    this.timeLimit = timeLimit;
    this.timeStarted = null;
    this.onTimeEndCallback = onTimeEndCallback;
    this.prevTickText = "";
    this.animationFrameId = null;
    this.timerElement = timerElement;

    this.timeFormatter = new Intl.DateTimeFormat("ru", {
      minute: "numeric",
      second: "numeric",
    });

    this.tick = this.tick.bind(this);
  }

  tick() {
    const now = Date.now();
    const delta = now - this.timeStarted;

    if (delta >= this.timeLimit) {
      return this.onTimeEnd();
    }

    const newTickText = this.timeFormatter.format(delta);

    if (newTickText !== this.prevTickText) {
      this.prevTickText = newTickText;
      this.timerElement.updateTextContent(newTickText);
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  startTimer() {
    this.timeStarted = Date.now();

    this.prevTickText = this.timeFormatter.format(0);
    this.timerElement.updateTextContent(this.prevTickText);

    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  onTimeEnd() {
    cancelAnimationFrame(this.animationFrameId);

    this.onTimeEndCallback();
  }
}

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
