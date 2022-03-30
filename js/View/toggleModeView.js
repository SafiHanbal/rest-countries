class modeCl {
  #curMode = 'darkMode';

  toggleMode(darkModeMap, lightModeMap) {
    let modeMap;
    this.#curMode === 'lightMode'
      ? (modeMap = darkModeMap)
      : (modeMap = lightModeMap);

    for (const [variable, color] of modeMap) {
      document.documentElement.style.setProperty(variable, color);
    }

    this.#curMode === 'lightMode'
      ? (this.#curMode = 'darkMode')
      : (this.#curMode = 'lightMode');
  }

  addHandlerToggleMode(handler) {
    document
      .querySelector('.toggle-mode')
      .addEventListener('click', function (e) {
        e.preventDefault();
        handler();
      });
  }
}

export default new modeCl();
