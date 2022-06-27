export class Easing {
  static easeLinear(x) {
    return x;
  }

  static easeInCubic(x) {
    return x * x * x;
  }

  static easeInQuad(x) {
    return x * x * x * x;
  }

  static easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  static easeInExpo(x) {
    if (x === 0) {
      return 0;
    } else {
      return Math.pow(2, 10 * x - 10);
    }
  }

  static easeOutExpo(x) {
    if (x === 1) {
      return 1;
    } else {
      return 1 - Math.pow(2, -10 * x);
    }
  }

  static easeInElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    } else {
      return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
    }
  }

  static easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    } else {
      return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }
  }
}
