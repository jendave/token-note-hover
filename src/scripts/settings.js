import CONSTANTS from './constants';

/**
 * Register Settings
 *
 * @export
 */
export default function registerSettings() {
  game.settings.register(CONSTANTS.MODULE_ID, 'hoverEnabled', {
    name: `${CONSTANTS.MODULE_ID}.Settings.HoverEnabled.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.HoverEnabled.Hint`,
    scope: 'client',
    type: Boolean,
    default: true,
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

  game.settings.register(CONSTANTS.MODULE_ID, 'displayPC', {
    name: `${CONSTANTS.MODULE_ID}.Settings.DisplayPC.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.DisplayPC.Hint`,
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'displayNPC', {
    name: `${CONSTANTS.MODULE_ID}.Settings.DisplayNPC.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.DisplayNPC.Hint`,
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

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipPlacement', {
    name: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Hint`,
    scope: 'client',
    config: true,
    type: String,
    default: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.east`,
    choices: {
      'nw-alt': `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.north-west-alt`,
      nw: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.north-west`,
      n: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.north`,
      ne: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.north-east`,
      'ne-alt': `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.north-east-alt`,
      w: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.west`,
      e: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.east`,
      'sw-alt': `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.south-west-alt`,
      sw: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.south-west`,
      s: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.south`,
      se: `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.south-east`,
      'se-alt': `${CONSTANTS.MODULE_ID}.Settings.TooltipPlacement.Choices.south-east-alt`,
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "tooltipScreenPosition", {
    name: `${CONSTANTS.MODULE_ID}.Settings.TooltipScreenPosition.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.TooltipScreenPosition.Hint`,
    scope: "client",
    config: true,
    type: String,
    default: `${CONSTANTS.MODULE_ID}.Settings.TooltipScreenPosition.Choices.adjacent-to-token`,
    choices: {
      'adjacent-to-token': `${CONSTANTS.MODULE_ID}.Settings.TooltipScreenPosition.Choices.adjacent-to-token`,
      'top-left': `${CONSTANTS.MODULE_ID}.Settings.TooltipScreenPosition.Choices.top-left`,
      'top-right': `${CONSTANTS.MODULE_ID}.Settings.TooltipScreenPosition.Choices.top-right`,
      "bottom-left": `${CONSTANTS.MODULE_ID}.Settings.TooltipScreenPosition.Choices.bottom-left`,
      "bottom-right": `${CONSTANTS.MODULE_ID}.Settings.TooltipScreenPosition.Choices.bottom-right`
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

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipOpenDelay', {
    name: `${CONSTANTS.MODULE_ID}.Settings.TooltipOpenDelay.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.TooltipOpenDelay.Hint`,
    scope: 'client',
    type: Number,
    default: 200,
    config: true,
    range: { min: 100, max: 3000, step: 100 },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipCloseDelay', {
    name: `${CONSTANTS.MODULE_ID}.Settings.TooltipCloseDelay.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.TooltipCloseDelay.Hint`,
    scope: 'client',
    type: Number,
    default: 100,
    config: true,
    range: { min: 100, max: 3000, step: 100 },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipColor', {
    name: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Hint`,
    scope: 'client',
    config: true,
    type: String,
    default: 'system',
    choices: {
      system: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.System`,
      default: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Default`,
      blue: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Blue`,
      dark: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Dark`,
      green: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Green`,
      light: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Light`,
      oceanic: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Oceanic`,
      orange: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Orange`,
      phosphor: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Phosphor`,
      purple: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Purple`,
      red: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Red`,
      yellow: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Yellow`,
      zinc: `${CONSTANTS.MODULE_ID}.Settings.TooltipColor.Zinc`,
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'fontSize', {
    name: `${CONSTANTS.MODULE_ID}.Settings.FontSize.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.FontSize.Hint`,
    scope: 'client',
    type: String,
    default: '1rem',
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'maxWidth', {
    name: `${CONSTANTS.MODULE_ID}.Settings.MaxWidth.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.MaxWidth.Hint`,
    scope: 'client',
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'useMousePositionForCoordinates', {
    name: `${CONSTANTS.MODULE_ID}.Settings.UseMousePositionForCoordinates.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.UseMousePositionForCoordinates.Hint`,
    scope: 'client',
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'showTitle', {
    name: `${CONSTANTS.MODULE_ID}.Settings.ShowTitle.Name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.ShowTitle.Hint`,
    scope: 'client',
    config: true,
    default: true,
    type: Boolean,
  });
}
