import CONSTANTS from './scripts/constants';
import registerSettings from './scripts/settings';
import TokenNoteHoverHUD from './scripts/TokenNoteHoverHUD';

// eslint-disable-next-line no-unused-vars
/**
 * OnMouseOver
 *
 * @param {*} event
 */
function onMouseOver(event) {
  canvas.hud.tokenNoteHover.isHovered = true;
  // console.log(`isHovered module.js:  ${canvas.hud.tokenNoteHover.hover}`);
}

// eslint-disable-next-line no-unused-vars
/**
 * onMouseLeave
 *
 * @param {*} event
 */
function onMouseLeave(event) {
  canvas.hud.tokenNoteHover.isHovered = false;
  // console.log(`isHovered module.js:  ${canvas.hud.tokenNoteHover.hover}`);
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
Hooks.on('renderHeadsUpDisplay', (app, html, data) => {
  html.append('<template id="token-note-hover"></template>');
  canvas.hud.tokenNoteHover = new TokenNoteHoverHUD();
});

/**
 * Hook on Note hover
 */
Hooks.on('hoverToken', (note, hovered) => {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    const ownershipPermissionsRequired = game.settings.get(CONSTANTS.MODULE_ID, 'ownershipPermissionsRequired');
    const tooltipOpenDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipOpenDelay');
    const tooltipCloseDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipCloseDelay');

    if (!hovered) {
      if (!canvas.hud.tokenNoteHover.hover) {
        setTimeout(() => canvas.hud.tokenNoteHover.hide(), tooltipCloseDelay);
      }
    }

    if (hovered) {
      setTimeout(() => {
        if (note.interactionState === 1
          && (note.actor.permission >= ownershipPermissionsRequired
            || note.actor.ownership.default === -1)) {
          canvas.hud.tokenNoteHover.bind(note);
        }
      }, tooltipOpenDelay);
    }
  }

  const element = document.querySelector('#container.token-note-hover-hud-container');

  if (element) {
    // console.log(`element module.js: ${element}`);
    element.addEventListener('mouseover', onMouseOver);
    element.addEventListener('mouseleave', onMouseLeave);
  }

  return canvas.hud.tokenNoteHover.clear();
});
