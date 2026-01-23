import CONSTANTS from './scripts/constants';
import registerSettings from './scripts/settings';
import TokenNoteHoverHUD from './scripts/TokenNoteHoverHUD';

function isKeyHeld(key) {
  // Access the internal Set of currently pressed keys.
  // It stores the "code" property of the KeyboardEvent.
  // console.log('game.keyboard.downKeys', game.keyboard.downKeys);
  return game.keyboard.downKeys.has(key);
}

/**
 * OnMouseOver
 *
 * @param {*} event
 */
// eslint-disable-next-line no-unused-vars
function onMouseOver(event) {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    canvas.hud.tokenNoteHover.isHovered = true;
  }
}

/**
 * onMouseLeave
 *
 * @param {*} event
 */
// eslint-disable-next-line no-unused-vars
function onMouseLeave(event) {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    canvas.hud.tokenNoteHover.isHovered = false;
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------------ */
/* Initialize module                    */
/* ------------------------------------ */
Hooks.once('init', () => {
  registerSettings();
});

/**
 * Hook on render HUD
 */
// eslint-disable-next-line no-unused-vars
Hooks.on('renderTokenNoteHoverHUD', (app, html, data) => {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    if (!canvas.hud.tokenNoteHover) {
      canvas.hud.tokenNoteHover = new TokenNoteHoverHUD();
    }
  }
});

// eslint-disable-next-line no-unused-vars
Hooks.on('renderTokenHUD', (obj, html) => {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    const tooltipCloseDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipCloseDelay');
    setTimeout(() => canvas.hud.tokenNoteHover.hide(), tooltipCloseDelay);
  }
});

// eslint-disable-next-line no-unused-vars
Hooks.on('controlToken', (obj, html) => {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    const tooltipCloseDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipCloseDelay');
    setTimeout(() => canvas.hud.tokenNoteHover.hide(), tooltipCloseDelay);
  }
});

/**
 * Hook on Note hover
 */
Hooks.on('hoverToken', (note, hovered) => {

  const element = document.querySelector('#container.token-note-hover-hud-container');

  if (element) {
    element.addEventListener('mouseover', onMouseOver);
    element.addEventListener('mouseleave', onMouseLeave);
  }

  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    if (note.hasActiveHUD === false && note.controlled === false) {
      const ownershipPermissionsRequired = game.settings.get(CONSTANTS.MODULE_ID, 'ownershipPermissionsRequired');
      const tooltipOpenDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipOpenDelay');
      const tooltipCloseDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipCloseDelay');
      const useHotkeyToOpenTooltip = game.settings.get(CONSTANTS.MODULE_ID, 'useHotkeyToOpenTooltip');
      const hotkeyToOpenTooltip = game.settings.get(CONSTANTS.MODULE_ID, 'hotkeyToOpenTooltip');

      let hotKeyPressed = false;
      if (isKeyHeld(hotkeyToOpenTooltip)) {
        hotKeyPressed = true;
      }

      if (!canvas.hud.tokenNoteHover) {
        canvas.hud.tokenNoteHover = new TokenNoteHoverHUD();
      }

      if (!hovered) {
        if (!canvas.hud.tokenNoteHover.hover) {
          setTimeout(() => canvas.hud.tokenNoteHover.hide(), tooltipCloseDelay);
        }
      }

      let displayTooltip = false;
      if (!useHotkeyToOpenTooltip || (useHotkeyToOpenTooltip && hotKeyPressed)) {
        displayTooltip = true;
      }

      if (hovered && displayTooltip) {
        setTimeout(() => {
          if (note.interactionState === 1
            && (note.actor.permission >= ownershipPermissionsRequired
              || note.actor.ownership.default === -1)) {
            canvas.hud.tokenNoteHover.bind(note);
          }
        }, tooltipOpenDelay);
      }
    }
  }

  return canvas.hud.tokenNoteHover.close();
});
