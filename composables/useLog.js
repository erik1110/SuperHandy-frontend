export const useLog = function () {
  const _options = {
    alwaysOpen: false,
    env: process.dev,
    whiteArrs: [
      "localhost",
      "127.0.0.1",
      //"superhandy-frontend-fork.herokuapp.com",
    ],
  };

  function _consoleLog(options, args) {
    const _orig = window.console.log;
    const _current = window.location.hostname;
    if (
      options.alwaysOpen ||
      options.env ||
      options.whiteArrs.indexOf(_current) != -1
    ) {
      _orig.apply(window.console, args);
    }
  }

  function logInfo() {
    if (!process.client) return;
    _consoleLog(_options, arguments);
  }

  function logError() {
    if (!process.client) return;
    if (arguments) {
      arguments[0] = `${arguments[0]}發生意外錯誤:`;
    }
    _consoleLog(
      {
        alwaysOpen: true,
        env: _options.env,
        whiteArrs: _options.whiteArrs,
      },
      arguments
    );
  }

  return {
    logInfo,
    logError,
  };
};
