// import CONSTANTS from '../constants';
// import {
//   isAlt, isRealNumber, retrieveFirstImageFromJournalId, stripQueryStringAndHashFromPath,
// } from '../lib/lib';
import Logger from '../lib/Logger';

/**
 * A class for managing additional Map Pin functionality
 * @author Evan Clarke (errational#2007)
 */
export default class TokenNoteHover {
  constructor() {
    // Storage for requests sent over a socket, pending GM execution
    this._requests = {};
  }

  /* -------------------------------- Constants ------------------------------- */

  static get NOTESLAYER() {
    return 'NotesLayer';
  }

  static get FONT_SIZE() {
    return 16;
  }

  /**
   * Render a file-picker button linked to an <input> field
   * @param {string} [type]       The type of FilePicker instance to display
   * @param {string} [target]     The field name in the target data
   * @param {string} [customClass] The field name in the custom class
   * @return {Handlebars.SafeString|string}
   */
  // static filePicker(type, target, customClass = 'file-picker') {
  //   if (!target) {
  //     throw new Logger.error('You must define the name of the target field.');
  //   }
  //   // Do not display the button for users who do not have browse permission
  //   if (game.world && !game.user.can('FILES_BROWSE')) {
  //     return '';
  //   }
  //   // Construct the HTML
  //   const tooltip = game.i18n.localize('FILES.BrowseTooltip');
  //   return new Handlebars.SafeString(`
  //   <button type="button" name="${customClass}" class="${customClass}" data-type="${type}" data-target="${target}" title="${tooltip}" tabindex="-1">
  //       <i class="fas fa-file-import fa-fw"></i>
  //   </button>`);
  // }

  /* --------------------------------- Methods -------------------------------- */

  /**
   * Draw the map note Tooltip as a Text object
   * @returns {PIXI.Text}
   */
  // static _addDrawTooltip2(wrapped, ...args) {
  //   const hideLabel = (this.document
  //     ? this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HIDE_LABEL)
  //     : this.object.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HIDE_LABEL)) ?? false;

  //   const numberWsSuffixOnNameplate = (this.document
  //     ? this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.NUMBER_WS_SUFFIX_ON_NAMEPLATE)
  //     : this.object.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.NUMBER_WS_SUFFIX_ON_NAMEPLATE)) ?? 0;

  //   const ratio_width = isRealNumber(this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.RATIO_WIDTH))
  //     ? this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.RATIO_WIDTH)
  //     : 1;

  //   const result = wrapped(...args);
  //   if (hideLabel) {
  //     result.text = '';
  //   } else if (numberWsSuffixOnNameplate > 0) {
  //     result.text += ' '.repeat(numberWsSuffixOnNameplate);
  //   } else if (numberWsSuffixOnNameplate < 0) {
  //     result.text = ' '.repeat(numberWsSuffixOnNameplate * -1) + result.text;
  //   }
  //   if (ratio_width != 1) {
  //     const { x } = result;
  //     const left = x + ratio_width * (this.size / 2) - 16;
  //     result.x = left;
  //   }
  //   return result;
  // }

  /**
   * Wraps the default Note#isVisible to allow the visibility of scene Notes to be controlled by the reveal
   * state stored in the Note (overriding the default visibility which is based on link accessibility).
   * @param {function} [wrapped] The wrapper function provided by libWrapper
   * @param {Object}   [args]    The arguments for Note#refresh
   * @return [Note]    This Note
   */
  // static _isVisible(wrapped, ...args) {
  //   const result = wrapped(...args);
  //   const showOnlyToGM = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.SHOW_ONLY_TO_GM) ?? false;
  //   if (String(showOnlyToGM) === 'true') {
  //     if (!game.user.isGM) {
  //       return false;
  //     }
  //   }
  //   /*
  //       We only want to change the check of testUserPermission here
  //       Note#isVisible()
  //           const accessTest = this.page ? this.page : this.entry;
  //           const access = accessTest?.testUserPermission(game.user, "LIMITED") ?? true;
  //           if ( (access === false) || !canvas.effects.visibility.tokenVision || this.document.global ) return access;
  //           const point = {x: this.document.x, y: this.document.y};
  //           const tolerance = this.document.iconSize / 4;
  //           return canvas.effects.visibility.testVisibility(point, {tolerance, object: this});
  //       */
  //   // See if reveal state is enabled for this note.
  //   if (!this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.USE_PIN_REVEALED)) {
  //     return wrapped(...args);
  //   }

  //   // Replace the testUserPermission test of Note#isVisible
  //   const access = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.PIN_IS_REVEALED);
  //   // Standard version of Note#isVisible
  //   if (access === false || this.document.global) {
  //     // || !canvas.effects.visibility.tokenVision
  //     return access;
  //   }
  //   const point = { x: this.document.x, y: this.document.y };
  //   const tolerance = 10; // this.document.iconSize / 4;
  //   return canvas.effects.visibility.testVisibility(point, { tolerance, object: this });
  // }

  /**
   * Ensure player notes are updated immediately
   * @param {*} wrapped
   * @param  {...any} args
   * @returns
   */
  // static _noteUpdate(wrapped, ...args) {
  //   const revealedNotes = false; game.settings.get(CONSTANTS.MODULE_ID, 'revealedNotes');
  //   const [data, options, userId] = args;
  //   if (revealedNotes) {
  //     // Foundry V11: Note#_onUpdate needs to set refreshText render flag
  //     const result = wrapped(data, options, userId);
  //     if (this.renderFlags && data?.flags?.[CONSTANTS.MODULE_ID]) {
  //       // Ensure everything is redrawn - since icon colour might change, not just visibility
  //       this.renderFlags.set({ redraw: true });
  //     }
  //     return result;
  //   }
  //   if (this.renderFlags && data?.flags?.[CONSTANTS.MODULE_ID]) {
  //     // Ensure everything is redrawn - since icon colour might change, not just visibility
  //     this.renderFlags.set({ redraw: true });
  //   }
  //   return wrapped(...args);
  // }

  // static _applyRenderFlags(wrapped, ...args) {
  //   const result = wrapped(...args);
  //   const hideLabel = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HIDE_LABEL) ?? false;
  //   const numberWsSuffixOnNameplate = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.NUMBER_WS_SUFFIX_ON_NAMEPLATE) ?? 0;

  //   if (hideLabel) {
  //     this.tooltip.visible = false;
  //   } else {
  //     const textAlwaysVisible = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TEXT_ALWAYS_VISIBLE) ?? false;
  //     if (textAlwaysVisible === true) {
  //       this.tooltip.visible = true;
  //     }
  //   }

  //   return result;
  // }

  /**
   * Wraps the default Note#refresh to allow the visibility of scene Notes to be controlled by the reveal
   * state stored in the Note (overriding the default visibility which is based on link accessibility).
   * @param {Function} [wrapped] The wrapper function provided by libWrapper
   * @param {Object}   [args]    The arguments for Note#refresh
   * @returns {Note}    This Note
   */
  // static _noteRefresh(wrapped, ...args) {
  //   const result = wrapped(...args);

  //   const textAlwaysVisible = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TEXT_ALWAYS_VISIBLE) ?? false;

  //   if (textAlwaysVisible === true) {
  //     // Keep tooltip always visible
  //     // Though could make an option out of that too. Would be nicer
  //     // TODO it's seem we don't need this

  //     this.tooltip.visible = true;
  //   }

  //   const text = this.children[1]; // 0 is the ControlIcon, 1 is the PreciseText
  //   // Text is created bevor this point. So we can modify it here.
  //   const ratio = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.RATIO_WIDTH);
  //   if (ratio && text?.x) {
  //     text.x = (this.size * (ratio - 1)) / 2; // correct shifting for the new scale.
  //   }
  //   // Bug fixing :Always (when hover) show name of pin up (above) to others pin
  //   // https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position
  //   if (!isAlt() && this.hover) {
  //     const fromIndex = canvas.notes.placeables.findIndex((note) => note.id === this.id) || 0;
  //     canvas.notes.placeables.push(canvas.notes.placeables.splice(fromIndex, 1)[0]);
  //   }

  //   return result;
  // }

  /* -------------------------------- Listeners ------------------------------- */
  /*
  getData wrapper.
  Here we override with the custom defaults what is presented to the player in  the NoteConfig.
  Won't be used if GM or if the defaults have already been applied
   */
  // static pinPlayerDefaultsGetData(noteData) {
  //   if (game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsEnabled')) {
  //     return noteData;
  //   }

  //   // Show only the original text, without the name
  //   const originalText = foundry.utils.getProperty(
  //     this.document,
  //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_ORIGINAL_TEXT}`,
  //   );
  //   if (originalText) {
  //     noteData.data.text = originalText;
  //   }
  //   const isDefaulted = foundry.utils.getProperty(
  //     this.document,
  //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_IS_DEFAULTED}`,
  //   );
  //   if (game.user.isGM || isDefaulted) {
  //     return noteData;
  //   }
  //   Logger.log(noteData);
  //   // Apply the defaults
  //   const defaults = TokenNoteHover._getPinDefaults();
  //   noteData = foundry.utils.mergeObject(noteData, defaults);

  //   return noteData;
  // }

  /*
   * getSubmitData wrapper.
   * Here we perform operations after the note has been submitted. Operations include:
   * - Adding the character name
   * - Store the text before adding the name
   * - Setting a flag to indicate that the new defaults have been applied
   */
  // static pinPlayerDefaultsGetSubmitData(data) {
  //   if (game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsEnabled')) {
  //     return data;
  //   }

  //   // Set flags
  //   const isDefaulted = foundry.utils.getProperty(
  //     this.document,
  //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_IS_DEFAULTED}`,
  //   );
  //   if (game.user.isGM || isDefaulted) {
  //     return data;
  //   }
  //   foundry.utils.setProperty(
  //     data,
  //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_IS_DEFAULTED}`,
  //     true,
  //   );
  //   return data;
  // }

  /**
   * Returns the object containing the defaults used for overriding the getData in NoteConfig
   */
  // static _getPinDefaults() {
  //   // Grab data from user
  //   const playerColor = game.user.color;
  //   const tokenImg = game.user.character.prototypeToken?.texture.src;

  //   let defaults = {
  //     data: {
  //       texture: {
  //         tint: tintIcon,
  //       },
  //     },
  //     icon: {
  //       selected: customIcon ? '' : null,
  //       custom: customIcon,
  //     },
  //   };

  //   // Remove nulls & return
  //   defaults = foundry.utils.flattenObject(defaults);
  //   // eslint-disable-next-line no-unused-vars
  //   defaults = Object.fromEntries(Object.entries(defaults).filter(([_, v]) => v != null));
  //   defaults = foundry.utils.expandObject(defaults);
  //   return defaults;
  // }

  /**
   * Handles draw control icon
   * @param {*} event
   */
  // static _drawControlIcon(...args) {
  //   const res = TokenNoteHover._drawControlIconInternal(this);
  //   if (res === undefined) {
  //     // return wrapped(...args);
  //   } else {
  //     return res;
  //   }
  // }

  /**
   * Defines the icon to be drawn for players if enabled.
   */
  // static _onPrepareNoteData(wrapped) {
  //   wrapped();

  //   // IF not GM and IF  = enabled then take flag path as note.document.texture.src
  //   if (!game.user.isGM) {
  //     if (this?.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.PLAYER_ICON_STATE)) {
  //       this.texture.src = stripQueryStringAndHashFromPath(
  //         this.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.PLAYER_ICON_PATH),
  //       );
  //     }
  //   }
  // }

  /**
   * Sets whether this Note is revealed (visible) to players; overriding the default FoundryVTT rules.
   * The iconTint/texture.tint will also be set on the Note based on whether there is a link that the player can access.
   * If this function is never called then the default FoundryVTT visibility rules will apply
   * @param [NoteData] [notedata] The NoteData whose visibility is to be set (can be used before the Note has been created)
   * @param {Boolean}  [visible]  pass in true if the Note should be revealed to players
   */
  // static setNoteRevealed(notedata, visible) {
  //   const revealedNotes = false; // game.settings.get(CONSTANTS.MODULE_ID, 'revealedNotes');
  //   if (revealedNotes) {
  //     visible = getProperty(notedata, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PIN_IS_REVEALED}`);
  //     if (visible) {
  //       const FLAG_IS_REVEALED = `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PIN_IS_REVEALED}`;
  //       const FLAG_USE_REVEALED = `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.USE_PIN_REVEALED}`;
  //       // notedata might not exist as a Note, so setFlag is not available
  //       setProperty(notedata, FLAG_USE_REVEALED, true);
  //       setProperty(notedata, FLAG_IS_REVEALED, visible);
  //     }
  //   }
  // }
}
