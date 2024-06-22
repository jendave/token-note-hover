import CONSTANTS from './scripts/constants';
import registerSettings from './scripts/settings';
import TokenNoteHoverHUD from './scripts/TokenNoteHoverHUD';

// function onMouseOver(event) {
//   console.log('we are in!'); // event.target
// }

// function onMouseLeave(event) {
//   console.log('we are leaving!'); //
// }

function onMouseOver(event) {
  // console.log(event.target);
  canvas.hud.tokenNoteHover.hover = true;
  //this.hover = true;
  console.log(`isHovered module:  ${canvas.hud.tokenNoteHover.hover}`);
}

function onMouseLeave(event) {
  // console.log(event.target);
  canvas.hud.tokenNoteHover.hover = false;
  console.log(`isHovered module:  ${canvas.hud.tokenNoteHover.hover}`);
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
    const tooltipDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipDelay');

    if (!hovered) {
      if (!canvas.hud.tokenNoteHover.hover) {
        setTimeout(() => canvas.hud.tokenNoteHover.hide(), tooltipDelay);
      }
    }

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

  const element = document.querySelector('#container.token-note-hover-hud-container');

  // if (element.matches(':hover')) {
  //   console.log('Mouse is over the element now.');
  // }

  if (element) {
    console.log(element);
    element.addEventListener('mouseover', onMouseOver);
    element.addEventListener('mouseleave', onMouseLeave);
  }

  return canvas.hud.tokenNoteHover.clear();
});
