import CONSTANTS from './constants';

function reload() {
  window.location.reload();
}

export default function registerSettings() {
  game.settings.register(CONSTANTS.MODULE_ID, 'enabled', {
    name: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.Enabled.Name`),
    hint: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.Enabled.Hint`),
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  // game.settings.register(CONSTANTS.MODULE_ID, 'forceToShowNotes', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.forceToShowNotesN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.forceToShowNotesH`,
  //   scope: 'world',
  //   config: true,
  //   default: true,
  //   type: Boolean,
  // });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipSmartPlacement', {
    name: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.tooltipSmartPlacement.Name`),
    hint: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.tooltipSmartPlacement.Hint`),
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'previewDelay', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.PreviewDelayN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.PreviewDelayH`,
    scope: 'world',
    type: Number,
    default: 500,
    config: true,
    onChange: (s) => { },
    // @ts-ignore
    range: { min: 100, max: 3000, step: 100 },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipColor', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.Tooltip.Color.title`,
    hint: '',
    scope: 'world',
    config: true,
    type: String,
    default: 'Default',
    choices: {
      default: 'Default',
      blue: 'Blue',
      dark: 'Dark',
      green: 'Green',
      light: 'Light',
      orange: 'Orange',
      purple: 'Purple',
      red: 'Red',
      yellow: 'Yellow',
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'fontSize', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.fontSizeN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.fontSizeH`,
    scope: 'client',
    type: String,
    default: '',
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'maxWidth', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.maxWidthN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.maxWidthH`,
    scope: 'client',
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipUseMousePositionForCoordinates', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.tooltipUseMousePositionForCoordinatesN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.tooltipUseMousePositionForCoordinatesH`,
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });

  // ============================================
  // Pin Players Default
  // =============================================

  game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsGlobal', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.globalN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.globalH`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsAnchorPoint', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.anchorPointN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.anchorPointH`,
    scope: 'world',
    config: true,
    type: Number,
    default: 1,
    choices: {
      0: 'Center',
      1: 'Bottom',
      2: 'Top',
      3: 'Left',
      4: 'Right',
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'debug', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.debugN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.debugH`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
}
