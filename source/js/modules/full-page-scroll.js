import throttle from "lodash/throttle";
import bodyTheme from "../helpers/body-theme";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(
      `.screen:not(.screen--result)`
    );
    this.menuElements = document.querySelectorAll(
      `.page-header__menu .js-menu-link`
    );
    this.transitionBackground = document.querySelector(
      `.transition--background`
    );

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.journeyItem = document.querySelector(".prizes__item--journeys");
    this.casesItem = document.querySelector(".prizes__item--cases");
    this.codesItem = document.querySelector(".prizes__item--codes");
  }

  init() {
    document.addEventListener(
      `wheel`,
      throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, { trailing: true })
    );
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex(
      (screen) => location.hash.slice(1) === screen.id
    );
    this.activeScreen = newIndex < 0 ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const prevActiveScreen = document.querySelector(`.screen.active`);
    const nextActiveScreen = this.screenElements[this.activeScreen];

    if (
      prevActiveScreen &&
      prevActiveScreen.classList.contains(`screen--story`)
    ) {
      bodyTheme.clearBodyTheme();
    }

    if (nextActiveScreen.classList.contains(`screen--story`)) {
      bodyTheme.applyTheme();
    }

    // особый вид анимации переключения с вкладки история на вкладку призы
    if (
      prevActiveScreen &&
      prevActiveScreen.classList.contains(`screen--story`) &&
      nextActiveScreen.classList.contains(`screen--prizes`)
    ) {
      this.showTransitionScreen(prevActiveScreen, nextActiveScreen);
      setTimeout(() => {
        this.startPrizesAnimation();
      }, 500);

      return;
    }

    if (nextActiveScreen.classList.contains(`screen--prizes`)) {
      setTimeout(() => {
        this.startPrizesAnimation();
      }, 100);
    }

    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    nextActiveScreen.classList.remove(`screen--hidden`);
    setTimeout(() => {
      nextActiveScreen.classList.add(`active`);
    }, 100);
  }

  /**
   * Запускаем плавный переход между экранами
   *
   * @param {HTMLElement} prevActiveScreen
   * @param {HTMLElement} nextActiveScreen
   */
  showTransitionScreen(prevActiveScreen, nextActiveScreen) {
    document.documentElement.classList.add(`is-transitioning`);
    this.transitionBackground.classList.add(`transition--background__show`);

    setTimeout(() => {
      nextActiveScreen.classList.remove(`screen--hidden`);
      nextActiveScreen.classList.add(`active`);
      prevActiveScreen.classList.remove(`active`);
      prevActiveScreen.classList.add(`screen--hidden`);

      document.documentElement.classList.remove(`is-transitioning`);
      this.transitionBackground.classList.remove(
        `transition--background__show`
      );
    }, 400);
  }

  startPrizesAnimation() {
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

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find(
      (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        screenId: this.activeScreen,
        screenName: this.screenElements[this.activeScreen].id,
        screenElement: this.screenElements[this.activeScreen],
      },
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(
        this.screenElements.length - 1,
        ++this.activeScreen
      );
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
