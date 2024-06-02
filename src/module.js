/* ------------------------------------ */
/* Other Hooks                          */
/* ------------------------------------ */
import API from './scripts/api';
import CONSTANTS from './scripts/constants';
import registerSettings from './scripts/settings';
import { registerSocket } from './scripts/socket';
import TokenNoteHoverHUD from './scripts/apps/TokenNoteHoverHUD';
import TokenNoteHover from './scripts/apps/TokenNoteHover';
import Logger from './scripts/lib/Logger';

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------------ */
/* Initialize module                    */
/* ------------------------------------ */
Hooks.once('init', () => {
  Logger.log(` init ${CONSTANTS.MODULE_ID}`);
  // TODO TO REMOVE
  globalThis.TokenNoteHover = TokenNoteHover;
  registerSettings();

  Hooks.once('socketlib.ready', registerSocket);
});

/* ------------------------------------ */
/* Setup module                         */
/* ------------------------------------ */
Hooks.once('setup', () => {
  game.modules.get(CONSTANTS.MODULE_ID).api = API;
});

/* ------------------------------------ */
/* When ready                           */
/* ------------------------------------ */

Hooks.once('ready', () => {
  if (!game.modules.get('lib-wrapper')?.active && game.user?.isGM) {
    let word = 'install and activate';
    if (game.modules.get('lib-wrapper')) word = 'activate';
    throw Logger.error(`Requires the 'libWrapper' module. Please ${word} it.`);
  }
  if (!game.modules.get('socketlib')?.active && game.user?.isGM) {
    let word = 'install and activate';
    if (game.modules.get('socketlib')) word = 'activate';
    throw Logger.error(`Requires the 'socketlib' module. Please ${word} it.`);
  }
});

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
  if (game.settings.get(CONSTANTS.MODULE_ID, 'enabled')) {
    const previewDelay = game.settings.get(CONSTANTS.MODULE_ID, 'previewDelay');

    let tooltipForceRemoveS = String(
      foundry.utils.getProperty(note, `document.flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.TOOLTIP_FORCE_REMOVE}`),
    );
    if (tooltipForceRemoveS !== 'true' && tooltipForceRemoveS !== 'false') {
      tooltipForceRemoveS = 'false';
    }
    const tooltipForceRemove = String(tooltipForceRemoveS) === 'true';

    // VERSION 1 TOOLTIP

    if (!hovered) {
      clearTimeout(API.tokenNoteHover.hoverTimer);
      if (tooltipForceRemove) {
        $('#powerTip').remove();
      }
      return canvas.hud.tokenNoteHover.clear();
    }

    const actorPermissionsRequired = game.settings.get(CONSTANTS.MODULE_ID, 'actorPermissionsRequired');

    // If the note is hovered by the mouse cursor (not via alt/option)
    if (hovered) {
      API.tokenNoteHover.hoverTimer = setTimeout(() => {
        if (note.interactionState === 1
          && (note.actor.permission >= actorPermissionsRequired
            || note.actor.ownership.default === -1)) {
          canvas.hud.tokenNoteHover.bind(note);
        }
      }, previewDelay);
    } else if (!hovered) {
      // This code should be never reached
      clearTimeout(API.tokenNoteHover.hoverTimer);
      return canvas.hud.tokenNoteHover.clear();
    }
  } else {
    return canvas.hud.tokenNoteHover.clear();
  }
});

Hooks.once('canvasInit', () => {
  // This module is only required for GMs
  // (game.user accessible from 'ready' event but not 'init' event)
  libWrapper.register(CONSTANTS.MODULE_ID, 'Note.prototype._drawTooltip', TokenNoteHover._addDrawTooltip2, 'MIXED');

  libWrapper.register(
    CONSTANTS.MODULE_ID,
    'Note.prototype._applyRenderFlags',
    TokenNoteHover._applyRenderFlags,
    'MIXED',
  );

  libWrapper.register(CONSTANTS.MODULE_ID, 'Note.prototype.refresh', TokenNoteHover._noteRefresh, 'WRAPPER');

  libWrapper.register(CONSTANTS.MODULE_ID, 'Note.prototype._onUpdate', TokenNoteHover._noteUpdate, 'WRAPPER');

  libWrapper.register(CONSTANTS.MODULE_ID, 'Note.prototype.isVisible', TokenNoteHover._isVisible, 'MIXED');
});

// This runs only on canvas drop and after the renderNoteConfig hook above.
// It ensures that we have fill the html of the NoteConfig
// window with the correct data on first drop.
Hooks.on('dropCanvasData', (canvas, data) => {
  const enableJournalAnchorLink = game.settings.get(CONSTANTS.MODULE_ID, 'enableJournalAnchorLink');
  if (enableJournalAnchorLink && !game.modules.get('jal')?.active) {
    if (!(data.type === 'JournalEntryPage' && data.anchor)) {
      return;
    }
    const { anchor } = data;

    Hooks.once('renderNoteConfig', (_, html, { label }) => {
      html.find("input[name='text']").val(`${label}: ${anchor.name}`);
      html.find(`option[value=${anchor.slug}]`).attr('selected', true);
    });
  }
});
