import CONSTANTS from './constants';
import { ironsworn } from "./systems/ironsworn.js";
import { dnd5e } from "./systems/dnd5e.js";
import { pf2e } from "./systems/pf2e.js";
import { twodsix } from "./systems/twodsix.js";
import { coc7 } from "./systems/coc7.js";
import { worldbuilding } from "./systems/worldbuilding.js";
import { rqg } from "./systems/rqg.js";
import { a5e } from "./systems/a5e.js";

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
    this.contentAvailable = false;
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
    // let actorIsOwner = true;
    const displayImages = game.settings.get(CONSTANTS.MODULE_ID, 'displayImages');
    if (game.data.system.id === 'foundry-ironsworn') {
      tempContent = await ironsworn(actor, displayImages, tempContent);
    } else if (game.data.system.id === 'dnd5e') {
      tempContent = await dnd5e(actor, displayImages);
    } else if (game.data.system.id === 'pf2e') {
      tempContent = await pf2e(actor, displayImages, tempContent);
    } else if (game.data.system.id === 'twodsix') {
      tempContent = await twodsix(actor, displayImages, tempContent);
    } else if (game.data.system.id === 'CoC7') {
      tempContent = await coc7(actor, displayImages, tempContent);
    } else if (game.data.system.id === 'worldbuilding') {
      tempContent = await worldbuilding(actor, displayImages, tempContent);
    } else if (game.data.system.id === 'rqg') {
      tempContent = await rqg(actor, displayImages, tempContent);
    } else if (game.data.system.id === 'a5e') {
      tempContent = await a5e(actor, displayImages);
    }

    this.contentAvailable = tempContent !== null && tempContent !== '';

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
    if (!this.contentAvailable) {
      return;
    }

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
