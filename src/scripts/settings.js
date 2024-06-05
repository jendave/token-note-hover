import CONSTANTS from './constants';

export default function registerSettings() {
  game.settings.register(CONSTANTS.MODULE_ID, 'enabled', {
    name: `${CONSTANTS.MODULE_ID}.Settings.Enabled.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.Enabled.Hint`,
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'ownershipPermissionsRequired', {
    name: `${CONSTANTS.MODULE_ID}.Settings.OwnershipPermissionsRequired.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.OwnershipPermissionsRequired.Hint`,
    scope: 'world',
    type: Number,
    default: '0',
    config: true,
    restricted: true,
    choices: {
      0: 'None',
      1: 'Limited',
      2: 'Observer',
      3: 'Owner',
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'smartPlacement', {
    name: `${CONSTANTS.MODULE_ID}.Settings.SmartPlacement.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.SmartPlacement.Hint`,
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'displayDelay', {
    name: `${CONSTANTS.MODULE_ID}.Settings.DisplayDelay.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.DisplayDelay.Hint`,
    scope: 'client',
    type: Number,
    default: 1000,
    config: true,
    range: { min: 100, max: 3000, step: 100 },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipColor', {
    name: `${CONSTANTS.MODULE_ID}.Settings.Tooltip.Color.title`,
    hint: '',
    scope: 'world',
    config: true,
    type: String,
    default: 'System',
    choices: {
      system: 'System',
      default: 'Default',
      phosphor: 'Phosphor',
      zinc: 'Zinc',
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

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipPlacement', {
    name: `${CONSTANTS.MODULE_ID}.Settings.Tooltip.Placement.title`,
    hint: '',
    scope: 'world',
    config: true,
    type: String,
    default: 'East',
    choices: {
      'nw-alt': 'North West Alt',
      nw: 'North West',
      n: 'North',
      ne: 'North East',
      'ne-alt': 'North East Alt',
      w: 'West',
      e: 'East',
      'sw-alt': 'South West Alt',
      sw: 'South West',
      s: 'South',
      se: 'South East',
      'se-alt': 'South East Alt',
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'fontSize', {
    name: `${CONSTANTS.MODULE_ID}.Settings.fontSizeN`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.fontSizeH`,
    scope: 'client',
    type: String,
    default: '1.5rem',
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'maxWidth', {
    name: `${CONSTANTS.MODULE_ID}.Settings.maxWidthN`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.maxWidthH`,
    scope: 'client',
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'displayImages', {
    name: `${CONSTANTS.MODULE_ID}.Settings.DisplayImages.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.DisplayImages.Hint`,
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'maxLength', {
    name: `${CONSTANTS.MODULE_ID}.Settings.MaxLengthN`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.MaxLengthH`,
    scope: 'client',
    type: Number,
    default: 500,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipUseMousePositionForCoordinates', {
    name: `${CONSTANTS.MODULE_ID}.Settings.tooltipUseMousePositionForCoordinatesN`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.tooltipUseMousePositionForCoordinatesH`,
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });

  // ============================================
  // Pin Players Default
  // =============================================

  game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsGlobal', {
    name: `${CONSTANTS.MODULE_ID}.Settings.playerPinDefaults.globalN`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.playerPinDefaults.globalH`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsAnchorPoint', {
    name: `${CONSTANTS.MODULE_ID}.Settings.playerPinDefaults.anchorPointN`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.playerPinDefaults.anchorPointH`,
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
    name: `${CONSTANTS.MODULE_ID}.Settings.debugN`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.debugH`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
}
