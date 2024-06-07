/* ------------------------------------ */
/* Other Hooks                          */
/* ------------------------------------ */
import CONSTANTS from './scripts/constants';
import registerSettings from './scripts/settings';
import TokenNoteHoverHUD from './scripts/TokenNoteHoverHUD';

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

// Hooks.on('canvasPan', () => {
//   //canvas.hud.tokenNoteHover.clear();
//   $.powerTip.reposition(canvas.hud.tokenNoteHover.element);
// });

/**
 * Hook on Note hover
 */
Hooks.on('hoverToken', (note, hovered) => {
  if (game.settings.get(CONSTANTS.MODULE_ID, 'hoverEnabled')) {
    const ownershipPermissionsRequired = game.settings.get(CONSTANTS.MODULE_ID, 'ownershipPermissionsRequired');
    const tooltipDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipDelay');

    if (hovered) {
      setTimeout(() => {
        if (note.interactionState === 1
          && (note.actor.permission >= ownershipPermissionsRequired
            || note.actor.ownership.default === -1)) {
          canvas.hud.tokenNoteHover.bind(note);
        }
      }, tooltipDelay);
    }
  }
  return canvas.hud.tokenNoteHover.clear();
});
