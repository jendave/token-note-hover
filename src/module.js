import CONSTANTS from './scripts/constants';
import registerSettings from './scripts/settings';
import TokenNoteHoverHUD from './scripts/TokenNoteHoverHUD';

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
   // setTimeout(() => canvas.hud.tokenNoteHover.hide(), tooltipCloseDelay);
    canvas.hud.tokenNoteHover.hide()
  }
});

// eslint-disable-next-line no-unused-vars
Hooks.on('controlToken', (obj, html) => {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    const tooltipCloseDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipCloseDelay');
  //  setTimeout(() => canvas.hud.tokenNoteHover.hide(), tooltipCloseDelay);
   canvas.hud.tokenNoteHover.hide();
  }
});

/**
 * Hook on Note hover
 */
Hooks.on('hoverToken', (note, hovered) => {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    if (note.hasActiveHUD === false && note.controlled === false) {
      const ownershipPermissionsRequired = game.settings.get(CONSTANTS.MODULE_ID, 'ownershipPermissionsRequired');
      const tooltipOpenDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipOpenDelay');
      const tooltipCloseDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipCloseDelay');

      if (!canvas.hud.tokenNoteHover) {
        canvas.hud.tokenNoteHover = new TokenNoteHoverHUD();
      }

      if (!hovered) {
        if (!canvas.hud.tokenNoteHover.hover) {
          // setTimeout(() => canvas.hud.tokenNoteHover.hide(), tooltipCloseDelay);
          canvas.hud.tokenNoteHover.hide();
        }
      }

      if (hovered) {
        setTimeout(() => {
        //  console.log('TokenNoteHover: Hovered', note);
          if (note.interactionState === 1
            && (note.actor.permission >= ownershipPermissionsRequired
              || note.actor.ownership.default === -1)) {
            canvas.hud.tokenNoteHover.bind(note);
          }
        }, tooltipOpenDelay);
      }
    }
  }

  const element = document.querySelector('#container.token-note-hover-hud-container');

  if (element) {
    element.addEventListener('mouseover', onMouseOver);
    element.addEventListener('mouseleave', onMouseLeave);
  }

  return canvas.hud.tokenNoteHover.close();
});
