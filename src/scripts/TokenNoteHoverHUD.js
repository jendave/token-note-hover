import CONSTANTS from './constants';

/**
 * A HUD extension that shows the Note preview
 *
 * @export
 * @class TokenNoteHoverHUD
 * @typedef {TokenNoteHoverHUD}
 * @extends {BasePlaceableHUD}
 */
export default class TokenNoteHoverHUD extends BasePlaceableHUD {
  constructor(note, options) {
    super(note, options);
    this.data = note;
    this.hover = false;
  }

  /**
   * Is element hovered over
   *
   * @type {boolean}
   */
  get isHovered() {
    return this.hover;
  }

  /**
   * Set if element hovered over
   */
  set isHovered(value) {
    this.hover = value;
  }

  /**
   * Retrieve and override default options for this application
   *
   * @static
   * @readonly
   * @type {*}
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: CONSTANTS.ELEMENT_ID,
      classes: [...super.defaultOptions.classes, CONSTANTS.ELEMENT_ID],
      minimizable: false,
      resizable: false,
      template: 'modules/token-note-hover/templates/token-note.html',
    });
  }

  /**
   * Get data for template
   *
   * @async
   * @returns {unknown}
   */
  async getData() {
    const data = super.getData();
    const note = this.object;
    const { actor } = note;

    let tempContent = '';
    let actorIsOwner = true;
    const displayImages = game.settings.get(CONSTANTS.MODULE_ID, 'displayImages');
    if (game.data.system.id === 'foundry-ironsworn') {
      if (actor) {
        actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
          case 'starship':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'character':
            if (actor.sheet?.constructor.name === 'IronswornCharacterSheetV2') {
              if (displayImages) {
                tempContent = await TextEditor.enrichHTML(actor.system?.biography, {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                });
              } else {
                tempContent = (await TextEditor.enrichHTML(actor.system?.biography, {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                })).replaceAll(/<img.*>/g, '');
              }
            } else if (actor.sheet?.constructor.name === 'StarforgedCharacterSheet') {
              if (displayImages) {
                tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                });
              } else {
                tempContent = (await TextEditor.enrichHTML(actor.system?.notes, {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                })).replaceAll(/<img.*>/g, '');
              }
            }
            break;
          case 'foe':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(
                Array.from(actor.items.values()).map((c) => c.system?.description),
                {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                },
              );
            } else {
              tempContent = (await TextEditor.enrichHTML(
                Array.from(actor.items.values()).map((c) => c.system?.description),
                {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                },
              )).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'shared':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.biography, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.biography, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'site':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'location':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML('<b>Location Type:<b> ' + game.i18n.localize(actor.system?.klass).charAt(0).toUpperCase() + actor.system?.klass.slice(1) + ' ' + (actor.system?.subtype !== 'star' ? actor.system?.subtype : '') + actor.system?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = await TextEditor.enrichHTML('<b>Location Type:<b> ' + game.i18n.localize(actor.system?.klass).charAt(0).toUpperCase() + actor.system?.klass.slice(1) + ' ' + (actor.system?.subtype !== 'star' ? actor.system?.subtype : '') + actor.system?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              }).replaceAll(/<img.*>/g, '');
            }
            break;
          default:
            tempContent = null;
        }
      }
    } else if (game.data.system.id === 'dnd5e') {
      if (actor) {
        actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
          case 'vehicle':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.biography?.value, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.biography?.value, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'character':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.biography?.value, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.biography?.value, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'npc':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.biography?.public, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.biography?.public, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'group':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.description?.full, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.description?.full, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          default:
            tempContent = null;
        }
      }
    } else if (game.data.system.id === 'pf2e') {
      if (actor) {
        actorIsOwner = actor.isOwner ?? true;
        let partyNoteArray = [''];
        switch (actor.type) {
          case 'vehicle':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'character':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.biography?.appearance, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              // eslint-disable-next-line max-len
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.biography?.appearance, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'npc':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.publicNotes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.publicNotes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'loot':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'hazard':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'army':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.description, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'familiar':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.details?.creature?.value, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.details?.creature?.value, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'party':
            for (let i = 0; i < actor.members.length; i += 1) {
              partyNoteArray = partyNoteArray.concat('<p>');
              partyNoteArray = partyNoteArray.concat(actor.members[i].name);
              partyNoteArray = partyNoteArray.concat('</p>');
            }
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(partyNoteArray.join(''), {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(partyNoteArray.join(''), {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          default:
            tempContent = null;
        }
      }
    } else if (game.data.system.id === 'twodsix') {
      if (actor) {
        actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
          case 'vehicle':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.cargoList, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.cargoList, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'traveller':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'animal':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'robot':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'ship':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'space-object':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.notes, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          default:
            tempContent = null;
        }
      }
    } else if (game.data.system.id === 'CoC7') {
      if (actor) {
        actorIsOwner = actor.isOwner ?? true;
        let characterNoteArray = [''];

        switch (actor.type) {
          case 'character':
            for (let i = 0; i < actor.system.biography.length; i += 1) {
              characterNoteArray = characterNoteArray.concat('<h3>');
              characterNoteArray = characterNoteArray.concat(actor.system?.biography[i]?.title);
              characterNoteArray = characterNoteArray.concat('</h3>');
              characterNoteArray = characterNoteArray.concat('<p>');
              characterNoteArray = characterNoteArray.concat(actor.system?.biography[i]?.value);
              characterNoteArray = characterNoteArray.concat('</p>');
            }
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(characterNoteArray.join(''), {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(characterNoteArray.join(''), {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'container':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.description?.value, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.description?.value, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'creature':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(
                actor.system?.biography?.personalDescription?.value,
                {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                },
              );
            } else {
              tempContent = (await TextEditor.enrichHTML(
                actor.system?.biography?.personalDescription?.value,
                {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                },
              )).replaceAll(/<img.*>/g, '');
            }
            break;
          case 'npc':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(
                actor.system?.biography?.personalDescription?.value,
                {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                },
              );
            } else {
              tempContent = (await TextEditor.enrichHTML(
                actor.system?.biography?.personalDescription?.value,
                {
                  secrets: actorIsOwner,
                  documents: true,
                  async: true,
                },
              )).replaceAll(/<img.*>/g, '');
            }
            break;
          default:
            tempContent = null;
        }
      }
    } else if (game.data.system.id === 'worldbuilding') {
      if (actor) {
        actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
          case 'character':
            if (displayImages) {
              tempContent = await TextEditor.enrichHTML(actor.system?.biography, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              });
            } else {
              tempContent = (await TextEditor.enrichHTML(actor.system?.biography, {
                secrets: actorIsOwner,
                documents: true,
                async: true,
              })).replaceAll(/<img.*>/g, '');
            }
            break;
          default:
            tempContent = null;
        }
      }
    }

    const content = tempContent;

    data.title = actor.name;
    data.body = content;

    data.fontSize = game.settings.get(CONSTANTS.MODULE_ID, 'fontSize');
    data.maxWidth = game.settings.get(CONSTANTS.MODULE_ID, 'maxWidth');

    const tooltipTitle = game.settings.get(CONSTANTS.MODULE_ID, 'showTitle') ? `<h2>${data.title}</h2>` : '';

    this.contentTooltip = await TextEditor.enrichHTML(`
                <div id="container" class="token-note-hover-hud-container" style="font-size:${data.fontSize}; max-width:${data.maxWidth}px">
                    ${tooltipTitle}
                    ${data.body}
                </div>`);
    return data;
  }

  /**
   * Set app position
   */
  setPosition() {
    if (!this.object) {
      return;
    }
    const fontSize = game.settings.get(CONSTANTS.MODULE_ID, 'fontSize');
    const maxWidth = game.settings.get(CONSTANTS.MODULE_ID, 'maxWidth');

    let x = 0;
    let y = 0;
    if (game.settings.get(CONSTANTS.MODULE_ID, 'useMousePositionForCoordinates')) {
      const positionMouse = canvas.mousePosition;
      x = positionMouse.x;
      y = positionMouse.y;
    } else {
      x = this.object.center ? this.object.center.x : this.object.x;
      y = this.object.center ? this.object.center.y : this.object.y;
    }

    const width = this.object.w;
    const height = this.object.h;

    const left = x - (width / 2);
    const top = y - (height / 2);

    const position = {
      height: `${height}px`,
      width: `${width}px`,
      left: `${left}px`,
      top: `${top}px`,
      'font-size': `${fontSize}`,
      'max-width': `${maxWidth}px`,
    };
    this.element.css(position);
  }

  activateListeners(html) {
    super.activateListeners(html);

    let elementToTooltip = this.element;
    if (!elementToTooltip.document) {
      // eslint-disable-next-line no-undef
      elementToTooltip = $(elementToTooltip);
    }

    const tooltipPlacement = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipPlacement') ?? 'e';
    const smartPlacement = game.settings.get(CONSTANTS.MODULE_ID, 'smartPlacement');

    let x = 0;
    let y = 0;
    if (game.settings.get(CONSTANTS.MODULE_ID, 'useMousePositionForCoordinates')) {
      const positionMouse = canvas.mousePosition;
      x = positionMouse.x;
      y = positionMouse.y;
    } else {
      x = this.object.center ? this.object.center.x : this.object.x;
      y = this.object.center ? this.object.center.y : this.object.y;
    }

    const width = this.object.w;
    const height = this.object.h;

    const left = x - (width / 2);
    const top = y - (height / 2);

    const position = {
      height: `${height}px`,
      width: `${width}px`,
      left: `${left}px`,
      top: `${top}px`,
    };
    elementToTooltip.css(position);

    let tooltipColor = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipColor');

    if (tooltipColor === 'system') {
      if (game.data.system.id === 'foundry-ironsworn') {
        tooltipColor = game.settings.get('foundry-ironsworn', 'color-scheme');
      } else {
        tooltipColor = 'default';
      }
    }

    const tooltipCloseDelay = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipCloseDelay');

    const tooltipPopupClass = tooltipColor
      ? `token-note-hover-hud-tooltip-${tooltipColor}`
      : 'token-note-hover-hud-tooltip-default';

    // eslint-disable-next-line no-undef
    const contentTooltip = $(this.contentTooltip);

    elementToTooltip.data('powertipjq', contentTooltip);
    elementToTooltip.powerTip({
      // (default: 'powerTip') HTML id attribute for the tooltip div.
      // popupId: popupId, // e.g. default 'powerTip'

      // (default: 'n') Placement location of the tooltip relative to the element it is open for.
      // Values can be n, e, s, w, nw, ne, sw, se, nw-alt, ne-alt, sw-alt,
      // or se-alt (as in north, east, south, and west).
      // This only matters if followMouse is set to false.
      placement: tooltipPlacement,

      // (default: false) When enabled the plugin will try to keep tips inside the browser viewport.
      // If a tooltip would extend outside of the viewport then its placement will be changed to an
      // orientation that would be entirely within the current viewport.
      // Only applies if followMouse is set to false.
      smartPlacement,

      // (default: false) Allow the mouse to hover on the tooltip.
      // This lets users interact with the content in the tooltip.
      // Only applies if followMouse is set to false and manual is set to false.
      mouseOnToPopup: true,

      // (default: false) If set to true the tooltip will follow the user’s mouse cursor.
      // Note that if a tooltip with followMouse enabled is opened by an event without
      // mouse data (like “focus” via keyboard navigation) then it will revert to static
      // placement with smart positioning enabled. So you may wish to set placement as well.
      followMouse: false,

      // (default: '') Space separated custom HTML classes for the tooltip div.
      // Since this plugs directly into jQuery’s addClass() method it will
      // also accept a function that returns a string.
      popupClass: tooltipPopupClass,

      // (default: 10) Pixel offset of the tooltip.
      // This will be the offset from the element the tooltip is open for, or
      // from the mouse cursor if followMouse is true.
      offset: 10,

      // (default: 100) Time in milliseconds to wait after mouse cursor leaves
      // the element before closing the tooltip. This serves two purposes: first,
      // it is the mechanism that lets the mouse cursor reach the tooltip
      // (cross the gap between the element and the tooltip div) for mouseOnToPopup tooltips.
      // And, second, it lets the cursor briefly leave the element and return without causing
      // the whole fade-out, intent test, and fade-in cycle to happen.
      closeDelay: tooltipCloseDelay,

      // (default: 100) Hover intent polling interval in milliseconds.
      intentPollInterval: 100,
    });

    // eslint-disable-next-line no-undef
    $.powerTip.show(elementToTooltip);
  }
}

// eslint-disable-next-line func-names
TokenNoteHoverHUD.prototype.hide = function () {
  const element = document.querySelector('#container.token-note-hover-hud-container');

  if (element && !this.isHovered) {
    // eslint-disable-next-line no-undef
    $.powerTip.hide();
  }
};
