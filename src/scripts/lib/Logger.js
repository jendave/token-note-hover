import CONSTANTS from '../constants';

// ================================
// Logger utility
// ================================
export default class Logger {
  static get DEBUG() {
    return (
      game.settings.get(CONSTANTS.MODULE_ID, 'debug')
      || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(CONSTANTS.MODULE_ID, 'boolean')
    );
  }

  static debug(msg, ...args) {
    try {
      if (
        game.settings.get(CONSTANTS.MODULE_ID, 'debug')
        || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(CONSTANTS.MODULE_ID, 'boolean')
      ) {
        console.log(`DEBUG | ${CONSTANTS.MODULE_ID} | ${msg}`, ...args);
      }
    } catch (e) {
      console.error(e.message);
    }
    return msg;
  }

  static logObject(...args) {
    return this.log('', args);
  }

  static log(message, ...args) {
    try {
      message = `${CONSTANTS.MODULE_ID} | ${message}`;
      console.log(message.replace('<br>', '\n'), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return message;
  }

  static notify(message, ...args) {
    try {
      message = `${CONSTANTS.MODULE_ID} | ${message}`;
      ui.notifications?.notify(message);
      console.log(message.replace('<br>', '\n'), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return message;
  }

  static info(info, notify = false, ...args) {
    try {
      info = `${CONSTANTS.MODULE_ID} | ${info}`;
      if (notify) {
        ui.notifications?.info(info);
      }
      console.log(info.replace('<br>', '\n'), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return info;
  }

  static warn(warning, notify = false, ...args) {
    try {
      warning = `${CONSTANTS.MODULE_ID} | ${warning}`;
      if (notify) {
        ui.notifications?.warn(warning);
      }
      console.warn(warning.replace('<br>', '\n'), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return warning;
  }

  static errorObject(...args) {
    return this.error('', false, args);
  }

  static error(error, notify = true, ...args) {
    try {
      error = `${CONSTANTS.MODULE_ID} | ${error}`;
      if (notify) {
        ui.notifications?.error(error);
      }
      console.error(error.replace('<br>', '\n'), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return new Error(error.replace('<br>', '\n'));
  }

  static timelog(message) {
    this.warn(Date.now(), message);
  }

  static i18n = (key) => game.i18n.localize(key)?.trim();

  static i18nFormat = (key, data = {}) => game.i18n.format(key, data)?.trim();

  static dialogWarning(message, icon = 'fas fa-exclamation-triangle') {
    return `<p class="${CONSTANTS.MODULE_ID}-dialog">
        <i style="font-size:3rem;" class="${icon}"></i><br><br>
        <strong style="font-size:1.2rem;">${CONSTANTS.MODULE_ID}</strong>
        <br><br>${message}
    </p>`;
  }
}
