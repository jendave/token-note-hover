import CONSTANTS from './constants';

export default function registerSettings() {
  // eslint-disable-next-line no-console
  console.log(`${CONSTANTS.MODULE_NAME} | Initializing token-note-hover`);
  game.settings.register(CONSTANTS.MODULE_NAME, 'enabled', {
    name: game.i18n.localize('token-note-hover.Settings.Enabled.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.Enabled.Hint'),
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'darkMode', {
    name: game.i18n.localize('token-note-hover.Settings.DarkMode.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.DarkMode.Hint'),
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'fontSize', {
    name: game.i18n.localize('token-note-hover.Settings.FontSize.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.FontSize.Hint'),
    scope: 'client',
    type: String,
    default: '',
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'maxWidth', {
    name: game.i18n.localize('token-note-hover.Settings.MaxWidth.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.MaxWidth.Hint'),
    scope: 'client',
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayDelay', {
    name: game.i18n.localize('token-note-hover.Settings.DisplayDelay.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.DisplayDelay.Hint'),
    scope: 'client',
    type: Number,
    default: 100,
    config: true,
    onChange: (s) => { },
    range: { min: 0, max: 3000, step: 100 },
  });
}
