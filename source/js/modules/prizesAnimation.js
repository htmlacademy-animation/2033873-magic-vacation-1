class PrizesAnimation {
  constructor() {
    this.journeyItem = document.querySelector(".prizes__item--journeys");
    this.casesItem = document.querySelector(".prizes__item--cases");
    this.codesItem = document.querySelector(".prizes__item--codes");
  }

  start() {
    if (this.journeyItem.classList.contains("active")) {
      return;
    }

    // анимация первого приза
    const svgDoc = document.getElementById("primaryAward").contentDocument;

    if (!svgDoc) {
      return;
    }

    const animationTag = svgDoc.getElementById("journeysAnimation");

    if (animationTag) {
      this.journeyItem.classList.add("active");
      animationTag.beginElement();
    }

    // анимация второго приза
    setTimeout(() => {
      const svgDoc = document.getElementById("secondaryAward").contentDocument;
      const animationTag = svgDoc.getElementById("casesAnimation");

      if (animationTag) {
        this.casesItem.classList.add("active");
        animationTag.beginElement();
      }
    }, 3800);

    // анимация дополнительного приза
    setTimeout(() => {
      const svgDoc = document.getElementById("additionalAward").contentDocument;
      const animationTag = svgDoc.getElementById("suitcaseAnimation");

      if (animationTag) {
        this.codesItem.classList.add("active");
        animationTag.beginElement();
      }
    }, 6200);
  }
}

export const prizesAnimation = new PrizesAnimation()
