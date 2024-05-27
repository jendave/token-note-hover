import CONSTANTS from '../constants';
import {
  isAlt, isRealNumber, retrieveFirstImageFromJournalId, stripQueryStringAndHashFromPath,
} from '../lib/lib';
import Logger from '../lib/Logger';

/**
 * A class for managing additional Map Pin functionality
 * @author Evan Clarke (errational#2007)
 */
export class TokenNoteHover {
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

  // static autoScaleNotes(canvas) {
  //   const enableAutoScaleNamePlatesNote = game.settings.get(CONSTANTS.MODULE_ID, 'enableAutoScaleNamePlatesNote');
  //   if (enableAutoScaleNamePlatesNote) {
  //     if (canvas.notes) {
  //       for (const note of canvas.notes.placeables) {
  //         note.tooltip.scale.set(
  //           TokenNoteHover._calculateAutoScale(canvas.scene.dimensions.size, canvas.stage.scale.x),
  //         );
  //       }
  //     }
  //   }
  // }

  // static _calculateAutoScale(sceneDimensionSize, zoomStage) {
  //   // Taken from Easy Ruler Scale, a mod by Kandashi
  //   // https://github.com/kandashi/easy-ruler-scale
  //   const gs = sceneDimensionSize / 100;
  //   const zs = 1 / zoomStage;
  //   return Math.max(gs * zs, 0.8);
  // }

  /**
   * Render a file-picker button linked to an <input> field
   * @param {string} [type]       The type of FilePicker instance to display
   * @param {string} [target]     The field name in the target data
   * @param {string} [customClass] The field name in the custom class
   * @return {Handlebars.SafeString|string}
   */
  static filePicker(type, target, customClass = 'file-picker') {
    // const type = options.hash['type'];
    // const target = options.hash['target'];
    if (!target) {
      throw new Logger.error('You must define the name of the target field.');
    }
    // Do not display the button for users who do not have browse permission
    if (game.world && !game.user.can('FILES_BROWSE')) {
      return '';
    }
    // Construct the HTML
    const tooltip = game.i18n.localize('FILES.BrowseTooltip');
    return new Handlebars.SafeString(`
    <button type="button" name="${customClass}" class="${customClass}" data-type="${type}" data-target="${target}" title="${tooltip}" tabindex="-1">
        <i class="fas fa-file-import fa-fw"></i>
    </button>`);
  }

  /* --------------------------------- Methods -------------------------------- */

  // /**
  //  * Creates and renders a dialog for name entry
  //  * @param {*} data
  //  * break callbacks out into separate methods
  //  */
  // _createDialog(data) {
  //   new Dialog({
  //     title: TokenNoteHover.DIALOG.title,
  //     content: TokenNoteHover.DIALOG.content,
  //     buttons: {
  //       save: {
  //         label: "Save",
  //         icon: `<i class="fas fa-check"></i>`,
  //         callback: (html) => {
  //           return this.createNoteFromCanvas(html, data);
  //         },
  //       },
  //       cancel: {
  //         label: "Cancel",
  //         icon: `<i class="fas fa-times"></i>`,
  //         callback: (e) => {
  //           // Maybe do something in the future
  //         },
  //       },
  //     },
  //     default: "save",
  //   }).render(true);
  // }

  // /**
  //  * Checks for missing Journal Entry folders and creates them
  //  *
  //  * @static
  //  * @private
  //  * @returns {void}
  //  */
  // static async _createFolders() {
  //   // Collect missing folders
  //   const missingFolders = game.users
  //     .filter((u) => !u.isGM && TokenNoteHover.getFolder(u.name, setting) === undefined)
  //     .map((user) => ({
  //       name: user.name,
  //       type: "JournalEntry",
  //       parent: null,
  //       sorting: "a",
  //     }));
  //   if (missingFolders.length) {
  //     // Ask for folder creation confirmation in a dialog
  //     const createFolders = await new Promise((resolve, reject) => {
  //       new Dialog({
  //         title: Logger.i18n("token-note-hover.CreateMissingFoldersT"),
  //         content: Logger.i18n("token-note-hover.CreateMissingFoldersC"),
  //         buttons: {
  //           yes: {
  //             label: `<i class="fas fa-check"></i> ${Logger.i18n("Yes")}`,
  //             callback: () => resolve(true),
  //           },
  //           no: {
  //             label: `<i class="fas fa-times"></i> ${Logger.i18n("No")}`,
  //             callback: () => reject(),
  //           },
  //         },
  //         default: "yes",
  //         close: () => reject(),
  //       }).render(true);
  //     }).catch((_) => {});
  //     // Create folders
  //     if (createFolders) await Folder.create(missingFolders);
  //   }
  // }

  /**
   * Replaces icon selector in Notes Config form with filepicker
   * @param {*} app
   * @param {*} html
   * @param {*} noteData
   */
  static _replaceIconSelector(app, html, noteData, explicitImageValue) {
    // const currentIconSelector = stripQueryStringAndHashFromPath(
    // 	explicitImageValue ? explicitImageValue : noteData.document.texture.src
    // );
    const currentIconSelector = stripQueryStringAndHashFromPath(explicitImageValue);

    // you can see this only if you have the file browser permissions
    const hasPermissionsToUploadFile = game.user.can('FILES_BROWSE');
    if (hasPermissionsToUploadFile) {
      const iconCustomSelector = html.find("input[name='icon.custom']");
      if (iconCustomSelector?.length > 0) {
        iconCustomSelector.val(currentIconSelector);
        iconCustomSelector.on('change', function () {
          const p = iconCustomSelector.parent().find('.token-note-hover-journal-icon');
          const valueIconSelector = html.find("select[name='icon.selected']")?.val();
          if (valueIconSelector) {
            p[0].src = valueIconSelector;
          } else {
            p[0].src = this.value;
          }
        });
        const iconSelector = html.find("select[name='icon.selected']");
        // Need this...
        if (iconSelector?.val() === 'icons/svg/book.svg' && currentIconSelector) {
          iconSelector?.val('').change();
        }
        if (iconSelector?.length > 0) {
          iconSelector.on('change', () => {
            const p = iconCustomSelector.parent().find('.token-note-hover-journal-icon');
            const valueIconSelector = html.find("select[name='icon.selected']")?.val();
            if (valueIconSelector) {
              p[0].src = valueIconSelector;
            } else {
              p[0].src = currentIconSelector;
            }
          });
          const valueIconSelector = html.find("select[name='icon.selected']")?.val();
          if (valueIconSelector) {
            iconCustomSelector
              .parent()
              .prepend(`<img class="token-note-hover-journal-icon" src="${valueIconSelector}" />`);
          } else {
            // https://gitlab.com/tiwato/journal_icon_numbers/-/issues/33
            iconCustomSelector.prop('disabled', false);
            iconCustomSelector
              .parent()
              .prepend(`<img class="token-note-hover-journal-icon" src="${currentIconSelector}" />`);
          }
        } else {
          iconCustomSelector
            .parent()
            .prepend(`<img class="token-note-hover-journal-icon" src="${currentIconSelector}" />`);
        }
      }
      // TODO BETTER MANAGEMENT
      const currentpageSelector = '';
      const pageCustomSelector = html.find("select[name='pageId']");
      // Journal Id
      const valuejournalSelector = html.find("select[name='entryId']")?.val();
      if (pageCustomSelector && valuejournalSelector) {
        const pageSelector = html.find("select[name='pageId']");

        if (pageSelector?.length > 0) {
          pageSelector.on('change', () => {
            const p = pageCustomSelector.parent().find('.token-note-hover-page-icon');

            // Pageid
            const valuepageSelector = html.find("select[name='pageId']")?.val();
            if (valuepageSelector) {
              const pageiimage = retrieveFirstImageFromJournalId(valuejournalSelector, valuepageSelector, true);
              if (pageiimage) {
                p[0].src = pageiimage;
              } else {
                p[0].src = currentpageSelector;
              }
            } else {
              p[0].src = currentpageSelector;
            }
          });
          const valuepageSelector = html.find("select[name='pageId']")?.val();
          const pageiimage = retrieveFirstImageFromJournalId(valuejournalSelector, valuepageSelector, true);
          if (pageiimage) {
            pageCustomSelector.parent().prepend(`<img class="token-note-hover-page-icon" src="${pageiimage}" />`);
          } else {
            // https://gitlab.com/tiwato/journal_icon_numbers/-/issues/33
            // pageCustomSelector.prop("disabled", false);
            pageCustomSelector
              .parent()
              .prepend(`<img class="token-note-hover-page-icon" src="${currentpageSelector}" />`);
          }
        } else {
          pageCustomSelector
            .parent()
            .prepend(`<img class="token-note-hover-page-icon" src="${currentpageSelector}" />`);
        }
      }
    }
  }

  /**
   * Draw the map note Tooltip as a Text object
   * @returns {PIXI.Text}
   */
  static _addDrawTooltip2(wrapped, ...args) {
    const hideLabel = (this.document
      ? this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HIDE_LABEL)
      : this.object.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HIDE_LABEL)) ?? false;

    const numberWsSuffixOnNameplate = (this.document
      ? this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.NUMBER_WS_SUFFIX_ON_NAMEPLATE)
      : this.object.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.NUMBER_WS_SUFFIX_ON_NAMEPLATE)) ?? 0;

    const ratio_width = isRealNumber(this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.RATIO_WIDTH))
      ? this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.RATIO_WIDTH)
      : 1;

    const result = wrapped(...args);
    if (hideLabel) {
      result.text = '';
    } else if (numberWsSuffixOnNameplate > 0) {
      result.text += ' '.repeat(numberWsSuffixOnNameplate);
    } else if (numberWsSuffixOnNameplate < 0) {
      result.text = ' '.repeat(numberWsSuffixOnNameplate * -1) + result.text;
    }
    if (ratio_width != 1) {
      const { x } = result;
      const left = x + ratio_width * (this.size / 2) - 16;
      result.x = left;
    }
    return result;
  }

  /**
   * Wraps the default Note#isVisible to allow the visibility of scene Notes to be controlled by the reveal
   * state stored in the Note (overriding the default visibility which is based on link accessibility).
   * @param {function} [wrapped] The wrapper function provided by libWrapper
   * @param {Object}   [args]    The arguments for Note#refresh
   * @return [Note]    This Note
   */
  static _isVisible(wrapped, ...args) {
    const result = wrapped(...args);
    const showOnlyToGM = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.SHOW_ONLY_TO_GM) ?? false;
    if (String(showOnlyToGM) === 'true') {
      if (!game.user.isGM) {
        return false;
      }
    }
    /*
        We only want to change the check of testUserPermission here
        Note#isVisible()
            const accessTest = this.page ? this.page : this.entry;
            const access = accessTest?.testUserPermission(game.user, "LIMITED") ?? true;
            if ( (access === false) || !canvas.effects.visibility.tokenVision || this.document.global ) return access;
            const point = {x: this.document.x, y: this.document.y};
            const tolerance = this.document.iconSize / 4;
            return canvas.effects.visibility.testVisibility(point, {tolerance, object: this});
        */
    // See if reveal state is enabled for this note.
    if (!this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.USE_PIN_REVEALED)) {
      return wrapped(...args);
    }

    // Replace the testUserPermission test of Note#isVisible
    const access = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.PIN_IS_REVEALED);
    // Standard version of Note#isVisible
    if (access === false || this.document.global) {
      // || !canvas.effects.visibility.tokenVision
      return access;
    }
    const point = { x: this.document.x, y: this.document.y };
    const tolerance = 10; // this.document.iconSize / 4;
    return canvas.effects.visibility.testVisibility(point, { tolerance, object: this });
  }

  /**
   * Ensure player notes are updated immediately
   * @param {*} wrapped
   * @param  {...any} args
   * @returns
   */
  static _noteUpdate(wrapped, ...args) {
    const revealedNotes = false; game.settings.get(CONSTANTS.MODULE_ID, 'revealedNotes');
    const [data, options, userId] = args;
    if (revealedNotes) {
      // Foundry V11: Note#_onUpdate needs to set refreshText render flag
      const result = wrapped(data, options, userId);
      if (this.renderFlags && data?.flags?.[CONSTANTS.MODULE_ID]) {
        // Ensure everything is redrawn - since icon colour might change, not just visibility
        this.renderFlags.set({ redraw: true });
      }
      return result;
    }
    if (this.renderFlags && data?.flags?.[CONSTANTS.MODULE_ID]) {
      // Ensure everything is redrawn - since icon colour might change, not just visibility
      this.renderFlags.set({ redraw: true });
    }
    return wrapped(...args);
  }

  static _applyRenderFlags(wrapped, ...args) {
    const result = wrapped(...args);
    const hideLabel = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HIDE_LABEL) ?? false;
    const numberWsSuffixOnNameplate = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.NUMBER_WS_SUFFIX_ON_NAMEPLATE) ?? 0;

    if (hideLabel) {
      this.tooltip.visible = false;
    } else {
      const textAlwaysVisible = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TEXT_ALWAYS_VISIBLE) ?? false;
      if (textAlwaysVisible === true) {
        this.tooltip.visible = true;
      }
    }

    return result;
  }

  /**
   * Wraps the default Note#refresh to allow the visibility of scene Notes to be controlled by the reveal
   * state stored in the Note (overriding the default visibility which is based on link accessibility).
   * @param {Function} [wrapped] The wrapper function provided by libWrapper
   * @param {Object}   [args]    The arguments for Note#refresh
   * @returns {Note}    This Note
   */
  static _noteRefresh(wrapped, ...args) {
    const result = wrapped(...args);

    const textAlwaysVisible = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TEXT_ALWAYS_VISIBLE) ?? false;

    if (textAlwaysVisible === true) {
      // Keep tooltip always visible
      // Though could make an option out of that too. Would be nicer
      // TODO it's seem we don't need this

      this.tooltip.visible = true;
    }

    const text = this.children[1]; // 0 is the ControlIcon, 1 is the PreciseText
    // Text is created bevor this point. So we can modify it here.
    const ratio = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.RATIO_WIDTH);
    if (ratio && text?.x) {
      text.x = (this.size * (ratio - 1)) / 2; // correct shifting for the new scale.
    }
    // Bug fixing :Always (when hover) show name of pin up (above) to others pin
    // https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position
    if (!isAlt() && this.hover) {
      const fromIndex = canvas.notes.placeables.findIndex((note) => note.id === this.id) || 0;
      canvas.notes.placeables.push(canvas.notes.placeables.splice(fromIndex, 1)[0]);
    }

    return result;
  }

  /* -------------------------------- Listeners ------------------------------- */

  // /**
  //  * Handles doubleclicks
  //  * @param {*} event
  //  */
  // static _onDoubleClick(event) {
  //   if (canvas.activeLayer._hover) {
  //     return;
  //   }

  //   // Silently return when note creation permissions are missing
  //   if (!game.user.can("NOTE_CREATE")) return;

  //   // Warn user when notes can be created, but journal entries cannot
  //   if (!game.user.can("JOURNAL_CREATE")) {
  //     Logger.warn(
  //       game.i18n.format("TokenNoteHover.AllowPlayerNotes", {
  //         permission: Logger.i18n("PERMISSION.JournalCreate"),
  //       }),
  //       true
  //     );
  //     return;
  //   }

  //   const data = {
  //     clientX: event.data.global.x,
  //     clientY: event.data.global.y,
  //   };

  //   API.tokenNoteHover._createDialog(data);
  // }

  // static _drawControlIconInternal(noteInternal) {
  //   // Wraps the default Note#_drawControlIcon so that we can override the stored icon tint based
  //   // on whether the link is accessible for the current player (or not). This is only done for links which
  //   // are using the "revealed" flag.
  //   const revealedNotes = game.settings.get(CONSTANTS.MODULE_ID, "revealedNotes");
  //   if (revealedNotes) {
  //     if (game.user.isGM) {
  //       // Replacement for Note#_drawControlIcon for GMs, to show which pins are revealed.
  //       const is_revealed = noteInternal.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.PIN_IS_REVEALED);
  //       if (is_revealed != undefined) {
  //         const colour = game.settings.get(
  //           CONSTANTS.MODULE_ID,
  //           is_revealed ? "revealedNotesTintColorRevealed" : "revealedNotesTintColorNotRevealed"
  //         );
  //         if (colour?.length > 0) {
  //           // Temporarily set the icon tint
  //           const saved = noteInternal.document.texture.tint;
  //           noteInternal.document.texture.tint = colour;
  //           // const result = wrapped(...args);
  //           noteInternal.document.texture.tint = saved;
  //           // return result;
  //         }
  //       }
  //     } else {
  //       // if (!noteInternal.document.getFlag(MODULE_ID, USE_PIN_REVEALED)) return wrapped(...args);
  //       const use_reveal = noteInternal.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.USE_PIN_REVEALED);
  //       if (use_reveal === undefined || !use_reveal) {
  //         // return wrapped(...args);
  //       } else {
  //         const value = noteInternal.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.USE_PIN_REVEALED);
  //         if (value !== undefined) {
  //           const is_linked = noteInternal.entry?.testUserPermission(
  //             game.user,
  //             CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED
  //           );
  //           const colour = game.settings.get(
  //             CONSTANTS.MODULE_ID,
  //             is_linked ? "revealedNotesTintColorLink" : "revealedNotesTintColorNotLink"
  //           );
  //           if (colour?.length > 0) {
  //             // Temporarily set the icon tint
  //             const saved = noteInternal.document.texture.tint;
  //             noteInternal.document.texture.tint = colour;
  //             // const result = wrapped(...args);
  //             noteInternal.document.texture.tint = saved;
  //             // return result;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   let tint = noteInternal.document.texture.tint ? Color.from(noteInternal.document.texture.tint) : null;
  //   let currentIcon = noteInternal.document.texture.src;
  //   const pinIsTransparent = noteInternal.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.PIN_IS_TRANSPARENT);
  //   if (String(pinIsTransparent) === "true") {
  //     currentIcon = CONSTANTS.PATH_TRANSPARENT;
  //   }

  //   let iconData = {
  //     texture: stripQueryStringAndHashFromPath(currentIcon),
  //     size: noteInternal.size,
  //     tint: tint,
  //   };
  //   let icon;
  //   // this is note
  //   if (noteInternal.document && noteInternal.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HAS_BACKGROUND)) {
  //     icon = new ControlIcon(iconData);
  //     icon.x -= noteInternal.size / 2;
  //     icon.y -= noteInternal.size / 2;
  //   } else {
  //     icon = new ControlIcon(iconData);
  //     icon.x -= noteInternal.size / 2;
  //     icon.y -= noteInternal.size / 2;
  //   }
  //   const ratio_width = isRealNumber(noteInternal.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.RATIO_WIDTH))
  //     ? noteInternal.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.RATIO_WIDTH)
  //     : 1;
  //   if (ratio_width != 1) {
  //     if (noteInternal.document) {
  //       icon.width = icon.width * ratio_width; // TODO not sure about this
  //     }

  //     // TODO need to centre text of the nameplate ??
  //     // https://github.com/p4535992/foundryvtt-token-note-hover/issues/66
  //     // https://github.com/p4535992/foundryvtt-token-note-hover/issues/52
  //   }
  //   // PATCH MODULE autoIconFlags
  //   if (noteInternal.document?.flags?.autoIconFlags) {
  //     const flagsAutomaticJournalIconNumbers = {
  //       autoIcon: noteInternal.document?.flags.autoIconFlags.autoIcon,
  //       iconType: noteInternal.document?.flags.autoIconFlags.iconType,
  //       iconText: noteInternal.document?.flags.autoIconFlags.iconText,
  //       foreColor: noteInternal.document?.flags.autoIconFlags.foreColor,
  //       backColor: noteInternal.document?.flags.autoIconFlags.backColor,
  //       fontFamily: noteInternal.document?.flags.autoIconFlags.fontFamily,
  //     };
  //     if (flagsAutomaticJournalIconNumbers.fontFamily) {
  //       noteInternal.document.fontFamily = flagsAutomaticJournalIconNumbers.fontFamily;
  //     }
  //   }
  //   return icon;
  // }

  static _noteConfigGetData(wrapped, ...args) {
    let noteData = wrapped(...args);
    if (game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsEnabled')) {
      noteData = TokenNoteHover.pinPlayerDefaultsGetData(noteData);
    }
    return noteData;
  }

  static _noteConfigGetSubmitData(wrapped, ...args) {
    let data = wrapped(...args);
    if (game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsEnabled')) {
      data = TokenNoteHover.pinPlayerDefaultsGetSubmitData(data);
    }
    return data;
  }

  /*
  getData wrapper.
  Here we override with the custom defaults what is presented to the player in  the NoteConfig.
  Won't be used if GM or if the defaults have already been applied
   */
  static pinPlayerDefaultsGetData(noteData) {
    if (game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsEnabled')) {
      return noteData;
    }

    // Show only the original text, without the name
    const originalText = foundry.utils.getProperty(
      this.document,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_ORIGINAL_TEXT}`,
    );
    if (originalText) {
      noteData.data.text = originalText;
    }
    const isDefaulted = foundry.utils.getProperty(
      this.document,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_IS_DEFAULTED}`,
    );
    if (game.user.isGM || isDefaulted) {
      return noteData;
    }
    Logger.log(noteData);
    // Apply the defaults
    const defaults = TokenNoteHover._getPinDefaults();
    noteData = foundry.utils.mergeObject(noteData, defaults);

    return noteData;
  }

  /*
   * getSubmitData wrapper.
   * Here we perform operations after the note has been submitted. Operations include:
   * - Adding the character name
   * - Store the text before adding the name
   * - Setting a flag to indicate that the new defaults have been applied
   */
  static pinPlayerDefaultsGetSubmitData(data) {
    if (game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsEnabled')) {
      return data;
    }
    // Append name
    // if (game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsAddPlayerName')) {
    //   const characterName = foundry.utils.getProperty(
    //     this.document,
    //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_CHARACTER_NAME}`,
    //   )
    //     || game.user.character?.name
    //     || game.user.name;
    //   foundry.utils.setProperty(
    //     data,
    //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_ORIGINAL_TEXT}`,
    //     data.text,
    //   );
    //   foundry.utils.setProperty(
    //     data,
    //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_CHARACTER_NAME}`,
    //     characterName,
    //   );
    //   data.text += `\n${characterName}`;
    // }

    // Set flags
    const isDefaulted = foundry.utils.getProperty(
      this.document,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_IS_DEFAULTED}`,
    );
    if (game.user.isGM || isDefaulted) {
      return data;
    }
    foundry.utils.setProperty(
      data,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PLAYER_PIN_DEFAULTS_IS_DEFAULTED}`,
      true,
    );
    return data;
  }

  /**
   * Returns the object containing the defaults used for overriding the getData in NoteConfig
   */
  static _getPinDefaults() {
    // Grab data from user
    const playerColor = game.user.color;
    const tokenImg = game.user.character.prototypeToken?.texture.src;

    // Icon (token or default)
   // const usePlayerToken = game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsPlayerToken') && tokenImg?.length > 0;
   // const defaultImage = game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsPinImage');
    // let customIcon = null;
    // if (usePlayerToken) {
    //   customIcon = tokenImg;
    // } //else if (defaultImage?.length > 0) {
    //   //customIcon = defaultImage;
    // }
    // Tint
   // const usePlayerColorTint = game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsPlayerColorImage');
   // let tintIcon = null;
    // if (usePlayerColorTint && !usePlayerToken) {
    //   tintIcon = playerColor;
   //  }
    // Returned object
    let defaults = {
      data: {
        global: game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsGlobal'),
      //  iconSize: game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsImageSize'),
        textAnchor: game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsAnchorPoint'),
       // textColor: game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsPlayerColorText') ? playerColor : null,
       // fontSize: game.settings.get(CONSTANTS.MODULE_ID, 'playerPinDefaultsFontSize'),
        texture: {
          tint: tintIcon,
        },
      },
      icon: {
        selected: customIcon ? '' : null,
        custom: customIcon,
      },
    };

    // Remove nulls & return
    defaults = foundry.utils.flattenObject(defaults);
    // eslint-disable-next-line no-unused-vars
    defaults = Object.fromEntries(Object.entries(defaults).filter(([_, v]) => v != null));
    defaults = foundry.utils.expandObject(defaults);
    return defaults;
  }

  /**
   * Handles draw control icon
   * @param {*} event
   */
  static _drawControlIcon(...args) {
    const res = TokenNoteHover._drawControlIconInternal(this);
    if (res === undefined) {
      // return wrapped(...args);
    } else {
      return res;
    }
  }

  /**
   * Defines the icon to be drawn for players if enabled.
   */
  static _onPrepareNoteData(wrapped) {
    wrapped();

    // IF not GM and IF  = enabled then take flag path as note.document.texture.src
    if (!game.user.isGM) {
      if (this?.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.PLAYER_ICON_STATE)) {
        this.texture.src = stripQueryStringAndHashFromPath(
          this.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.PLAYER_ICON_PATH),
        );
      }
    }
  }

  // static _renderJournalThumbnail(app, html) {
  //   game.journal.render();
  // }

  // static _addJournalThumbnail(app, html, data) {
  //   if (
  //   1==0 //  (game.user.isGM && game.settings.get(CONSTANTS.MODULE_ID, 'enableJournalThumbnailForGMs'))
  //     //|| (!game.user.isGM && game.settings.get(CONSTANTS.MODULE_ID, 'enableJournalThumbnailForPlayers'))
  //   ) {
  //     app.documents.forEach((j) => {
  //       const htmlEntry = html.find(`.directory-item.document[data-document-id="${j.id}"]`);
  //       if (htmlEntry.length !== 1) {
  //         return;
  //       }
  //       const journalEntryImage = retrieveFirstImageFromJournalId(j.id, undefined, false);
  //       if (!journalEntryImage) {
  //         return;
  //       }
  //       let thumbnail = null;
  //       if (journalEntryImage.endsWith('.pdf')) {
  //         // thumbnail = $(
  //         // 	`
  //         // 	<object data="${journalEntryImage}" type="application/pdf" class="token-note-hover-thumbnail sidebar-image journal-entry-image">
  //         // 		<embed class="token-note-hover-thumbnail sidebar-image journal-entry-image" src="${journalEntryImage}" type="application/pdf">
  //         // 			<p>This browser does not support PDFs. Please download the PDF to view it: <a href="${journalEntryImage}">Download PDF</a>.</p>
  //         // 		</embed>
  //         // 	</object>
  //         // 	`
  //         // );
  //         thumbnail = $(
  //           `<img class="token-note-hover-thumbnail sidebar-image journal-entry-image" src="${CONSTANTS.PATH_PDF_THUMBNAIL}" title="${j.name}" alt='Journal Entry Thumbnail'>`,
  //         );
  //       } else {
  //         thumbnail = $(
  //           `<img class="token-note-hover-thumbnail sidebar-image journal-entry-image" src="${journalEntryImage}" title="${j.name}" alt='Journal Entry Thumbnail'>`,
  //         );
  //       }
  //       switch (game.settings.get(CONSTANTS.MODULE_ID, 'journalThumbnailPosition')) {
  //         case 'right': {
  //           htmlEntry.append(thumbnail);
  //           break;
  //         }
  //         case 'left': {
  //           htmlEntry.prepend(thumbnail);
  //           break;
  //         }
  //         default: {
  //           Logger.warn("Must set 'right' or 'left' for sidebar thumbnail image");
  //         }
  //       }
  //     });
  //   }
  // }

  // static _deleteJournalDirectoryPagesEntry() {
  //   // if (game.settings.get(CONSTANTS.MODULE_ID, 'enableJournalDirectoryPages')) {
  //   //   ui.sidebar.tabs.journal.render(true);
  //   //   for (const window of [...Object.values(ui.windows)].filter((w) => w.title == 'Journal Directory')) {
  //   //     window.render(true);
  //   //   }
  //   // }
  // }

  // static _createJournalDirectoryPagesEntry() {
  //   // if (game.settings.get(CONSTANTS.MODULE_ID, 'enableJournalDirectoryPages')) {
  //   //   ui.sidebar.tabs.journal.render(true);
  //   //   for (const window of [...Object.values(ui.windows)].filter((w) => w.title == 'Journal Directory')) {
  //   //     window.render(true);
  //   //   }
  //   // }
  // }

  // static _addJournalDirectoryPages(app, html, options) {
  //   // if (game.settings.get(CONSTANTS.MODULE_ID, 'enableJournalDirectoryPages')) {
  //   //   for (const j of app.documents) {
  //   //     if (!j.pages.size) continue;
  //   //     const $li = html.find(`li[data-document-id="${j.id}"]`);
  //   //     $li.css({ flex: 'unset', display: 'block' });
  //   //     const $button = $(
  //   //       '<a class="toggle" style="width:50px; float: right; text-align: right; padding-right: .5em;"><i class="fa-solid fa-caret-down"></i></a>',
  //   //     ).click(function (e) {
  //   //       e.stopPropagation();
  //   //       $(this).parent().parent().find('ol')
  //   //         .toggle();
  //   //       $(this).parent().parent().find('ol')
  //   //         .is(':hidden')
  //   //         ? $(this).html('<i class="fa-solid fa-caret-down"></i>')
  //   //         : $(this).html('<i class="fa-solid fa-caret-up"></i>');
  //   //     });
  //   //     $li.find('h4').append($button).css({ 'flex-basis': '100%', overflow: 'ellipsis' });
  //   //     const $ol = $('<ol class="journal-pages" style="width:100%; margin-left: 1em;" start="0"></ol>');
  //   //     $ol.hide();
  //   //     for (const p of j.pages.contents.sort((a, b) => a.sort - b.sort)) $ol.append($(`<li class="journal-page" data-page-uuid="${p.uuid}"><a>${p.name}</a></li>`));
  //   //     $li.append($ol);
  //   //   }
  //   //   $(html)
  //   //     .find('li.journal-page > a')
  //   //     .click(function (e) {
  //   //       e.stopPropagation();
  //   //       const page = fromUuidSync($(this).parent().data().pageUuid);
  //   //       if (!page) return;
  //   //       page.parent.sheet.render(true, { pageId: page.id, focus: true });
  //   //     })
  //   //     .contextmenu(function (e) {
  //   //       e.stopPropagation();
  //   //       e.preventDefault();
  //   //       const page = fromUuidSync($(this).parent().data().pageUuid);
  //   //       if (!page) return;
  //   //       page.sheet.render(true);
  //   //     });
  //   // }
  // }

  /**
   * Sets whether this Note is revealed (visible) to players; overriding the default FoundryVTT rules.
   * The iconTint/texture.tint will also be set on the Note based on whether there is a link that the player can access.
   * If this function is never called then the default FoundryVTT visibility rules will apply
   * @param [NoteData] [notedata] The NoteData whose visibility is to be set (can be used before the Note has been created)
   * @param {Boolean}  [visible]  pass in true if the Note should be revealed to players
   */
  static setNoteRevealed(notedata, visible) {
    const revealedNotes = false; // game.settings.get(CONSTANTS.MODULE_ID, 'revealedNotes');
    if (revealedNotes) {
      visible = getProperty(notedata, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PIN_IS_REVEALED}`);
      if (visible) {
        const FLAG_IS_REVEALED = `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.PIN_IS_REVEALED}`;
        const FLAG_USE_REVEALED = `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.USE_PIN_REVEALED}`;
        // notedata might not exist as a Note, so setFlag is not available
        setProperty(notedata, FLAG_USE_REVEALED, true);
        setProperty(notedata, FLAG_IS_REVEALED, visible);
      }
    }
  }

  //   /**
  //    * Note.prototype._onClickLeft and Note.prototype._onClickRight seem to work only on the NoteLayer
  //    * @href https://github.com/foundryvtt/foundryvtt/issues/8770
  //    * @param {*} wrapped
  //    * @param  {...any} args
  //    * @returns
  //    */
  //   static _canControl(wrapped, ...args) {
  //     if (canvas.activeLayer instanceof TokenLayer) {
  //       Logger.info(`Applied can control override`);
  //       const [user, event] = args;
  //       if (this.isPreview) {
  //         return false;
  //       }
  //       const enableDragNoteOnTokenLayerIfGM = game.settings.get(CONSTANTS.MODULE_ID, "enableDragNoteOnTokenLayerIfGM");
  //       if (enableDragNoteOnTokenLayerIfGM && game.user.isGM) {
  //         return true;
  //       }
  //     }
  //     let result = wrapped(...args);
  //     return result;
  //   }
}
