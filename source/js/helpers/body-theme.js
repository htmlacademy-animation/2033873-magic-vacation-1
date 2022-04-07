const initTheme = "dark";

const initBodyTheme = (theme) => {
  let currentBodyTheme = theme;
  const themes = ["dark", "purple", "blue", "light-blue"];

  const applyTheme = function (newTheme = currentBodyTheme) {
    if (themes.includes(newTheme)) {
      document.body.classList.remove(...themes);
      document.body.classList.add(newTheme);
    }
  };

  const setAndApplyBodyTheme = function (newTheme) {
    if (themes.includes(newTheme)) {
      currentBodyTheme = newTheme;
      this.applyTheme();
    }
  };

  const clearBodyTheme = function () {
    this.applyTheme(initTheme);
  };

  return {
    currentBodyTheme,
    applyTheme,
    setAndApplyBodyTheme,
    clearBodyTheme,
  };
};

const bodyTheme = initBodyTheme(initTheme)

export default bodyTheme;

