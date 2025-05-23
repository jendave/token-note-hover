import CONSTANTS from './constants';
import { ironsworn } from "./systems/ironsworn.js";
import { dnd5e } from "./systems/dnd5e.js";
import { pf2e } from "./systems/pf2e.js";
import { twodsix } from "./systems/twodsix.js";
import { coc7 } from "./systems/coc7.js";
import { worldbuilding } from "./systems/worldbuilding.js";
import { rqg } from "./systems/rqg.js";
import { a5e } from "./systems/a5e.js";
import { dsa5 } from "./systems/dsa5.js";
import { sfrpg } from "./systems/sfrpg.js";

/**
 * A HUD extension that shows the Note preview
 *
 * @export
 * @class TokenNoteHoverHUD
 * @typedef {TokenNoteHoverHUD}
 * @extends {BasePlaceableHUD}
 */
export default class TokenNoteHoverHUD extends foundry.applications.hud.BasePlaceableHUD {
  constructor(note, options) {
    super(note, options);
    this.note = note;
    this.hover = false;
    this.contentAvailable = false;
  }

  async _renderHTML(...args) {
    const div = document.createElement('note');
    return [div];
  }

  _replaceHTML(result, content, options) {
    content.replaceChildren(...result);
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
  static DEFAULT_OPTIONS = {
    id: CONSTANTS.ELEMENT_ID,
    minimizable: false,
    resizable: false
  };

  /**
   * Get data for template
   *
   * @async
   * @returns {unknown}
   */
  async _prepareContext() {
    let data = super._prepareContext();
    const note = this.object;
    const { actor } = note;

    let tempContent = '';
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
    } else if (game.data.system.id === 'dsa5') {
      tempContent = await dsa5(actor, displayImages);
    } else if (game.data.system.id === 'sfrpg') {
      tempContent = await sfrpg(actor, displayImages);
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
    this.element.position = position;
  }

  _onRender(context, options) {
    if (!this.contentAvailable) {
      return;
    }

    super._onRender(context, options)

    const html = $(this.element)

    let elementToTooltip = this.element;
    if (!elementToTooltip.document) {
      // eslint-disable-next-line no-undef
      elementToTooltip = $(elementToTooltip);
    }

    let tooltipPlacement = game.settings.get(CONSTANTS.MODULE_ID, 'tooltipPlacement') ?? 'e';
    const smartPlacement = game.settings.get(CONSTANTS.MODULE_ID, 'smartPlacement');

    let x = 0;
    let y = 0;
    let position;

    if (game.settings.get(CONSTANTS.MODULE_ID, 'useMousePositionForCoordinates')) {
      const positionMouse = canvas.mousePosition;
      x = positionMouse.x;
      y = positionMouse.y;
    } else if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'adjacent-to-token') {
      x = this.object.center ? this.object.center.x : this.object.x;
      y = this.object.center ? this.object.center.y : this.object.y;
      const width = this.object.w;
      const height = this.object.h;

      const left = x - (width / 2);
      const top = y - (height / 2);

      position = {
        height: `${height}px`,
        width: `${width}px`,
        left: `${left}px`,
        top: `${top}px`,
      };
    } else {
      const centre = canvas.scene._viewPosition;
      const windowWidthScaled = window.innerWidth / centre.scale;
      const windowHeightScaled = window.innerHeight / centre.scale;
      let xAxis = 0;
      let yAxis = 0;
      const sidebar = document.getElementById("sidebar");
      const sidebarCollapsed = sidebar.classList.contains("collapsed");
      if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'top-left') {
        xAxis = centre.x + windowWidthScaled / 2;
        yAxis = centre.y - windowHeightScaled / 2;
        tooltipPlacement = 'se-alt';
      } else if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'top-right') {
        xAxis = centre.x - windowWidthScaled / 2;
        yAxis = centre.y - windowHeightScaled / 2;
        tooltipPlacement = 'sw-alt';
      } else if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'bottom-left') {
        xAxis = centre.x + windowWidthScaled / 2;
        yAxis = centre.y + windowHeightScaled / 2;
        tooltipPlacement = 'ne-alt';
      } else if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'bottom-right') {
        xAxis = centre.x - windowWidthScaled / 2;
        yAxis = centre.y + windowHeightScaled / 2;
        tooltipPlacement = 'nw-alt';
      }
      position = {
        position: 'fixed',
        top: `${yAxis}px`,
        right: `${xAxis}px`,
        left: 'auto',
        bottom: 'auto',
        display: 'block',
      };
    }

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
