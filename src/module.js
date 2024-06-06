/* ------------------------------------ */
/* Other Hooks                          */
/* ------------------------------------ */
import CONSTANTS from './scripts/constants';
import registerSettings from './scripts/settings';
import TokenNoteHoverHUD from './scripts/TokenNoteHoverHUD';

// const API = {
//   tokenNoteHover: new TokenNoteHover(),
// };

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------------ */
/* Initialize module                    */
/* ------------------------------------ */
Hooks.once('init', () => {
  registerSettings();
});

/* ------------------------------------ */
/* When ready                           */
/* ------------------------------------ */

/**
 * Hook on render HUD
 */
Hooks.on('renderHeadsUpDisplay', (app, html, data) => {
  html.append('<template id="token-note-hover"></template>');
  canvas.hud.tokenNoteHover = new TokenNoteHoverHUD();
});

/**
 * Hook on Note hover
 */
Hooks.on('hoverToken', (note, hovered) => {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    let tooltipForceRemoveS = String(
      foundry.utils.getProperty(note, `document.flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.TOOLTIP_FORCE_REMOVE}`),
    );
    if (tooltipForceRemoveS !== 'true' && tooltipForceRemoveS !== 'false') {
      tooltipForceRemoveS = 'false';
    }
    const tooltipForceRemove = String(tooltipForceRemoveS) === 'true';

    if (!hovered) {
      clearTimeout(this.hoverTimer);
      if (tooltipForceRemove) {
        $('#powerTip').remove();
      }
      return canvas.hud.tokenNoteHover.clear();
    }

    const ownershipPermissionsRequired = game.settings.get(CONSTANTS.MODULE_ID, 'ownershipPermissionsRequired');
    const tooltipDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipDelay');

    // If the note is hovered by the mouse cursor (not via alt/option)
    if (hovered) {
      this.hoverTimer = setTimeout(() => {
        if (note.interactionState === 1
          && (note.actor.permission >= ownershipPermissionsRequired
            || note.actor.ownership.default === -1)) {
          canvas.hud.tokenNoteHover.bind(note);
        }
      }, tooltipDelay);
    } else if (!hovered) {
      // This code should be never reached
      clearTimeout(this.hoverTimer);
      return canvas.hud.tokenNoteHover.clear();
    }
  } else {
    return canvas.hud.tokenNoteHover.clear();
  }
});
