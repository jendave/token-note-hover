import CONSTANTS from './constants.js';
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
import { pf1 } from "./systems/pf1.js";
import { wfrp4e } from "./systems/wfrp4e.js";
import { cyphersystem } from "./systems/cyphersystem.js";
import { swade } from "./systems/swade.js";
import { vtm5e } from "./systems/vtm5e.js";
import { alienrpg } from "./systems/alienrpg.js";
import { shadowdark } from "./systems/shadowdark.js";
import { drawsteel } from "./systems/drawsteel.js";
import { daggerheart } from "./systems/daggerheart.js";
import { gurps } from "./systems/gurps.js";
import { wrathAndGlory } from "./systems/wrathAndGlory.js";
import { dragonbane } from "./systems/dragonbane.js";
import { worldofdarkness } from './systems/worldofdarkness.js';
import { forbiddenlands } from './systems/forbiddenlands.js';
import { deltagreen } from './systems/deltagreen.js';
import { bladesInTheDark } from './systems/bladesInTheDark.js';
import { pbta } from './systems/pbta.js';
import { ose } from './systems/ose.js';
import { customSystemBuilder } from './systems/customSystemBuilder.js';
import { cairn } from './systems/cairn.js';
import { tormenta20 } from './systems/tormenta20.js';
import { dcc } from './systems/dcc.js';
import { mutantyearzero } from './systems/mutant-year-zero.js';
import { wod5e } from './systems/wod5e.js';
import { universalTabletopSystem } from './systems/universal-tabletop-system.js';
import { cyberpunkRedCore } from './systems/cyberpunk-red-core.js';
import { starwarsffg } from './systems/starwarsffg.js';
import { sandbox } from './systems/sandbox.js';
import { lancer } from './systems/lancer.js';
import { d35e } from './systems/d35e.js';
import { impmal } from './systems/impmal.js';
import { fallout } from './systems/fallout.js';
import { cosmereRPG } from './systems/cosmere-rpg.js';
import { shadowrun5e } from './systems/shadowrun5e.js';
import { tor2e } from './systems/tor2e.js';
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
    switch (game.data.system.id) {
      case 'foundry-ironsworn':
        tempContent = await ironsworn(actor, displayImages, tempContent);
        break;
      case 'dnd5e':
        tempContent = await dnd5e(actor, displayImages);
        break;
      case 'pf2e':
        tempContent = await pf2e(actor, displayImages, tempContent);
        break;
      case 'twodsix':
        tempContent = await twodsix(actor, displayImages, tempContent);
        break;
      case 'CoC7':
        tempContent = await coc7(actor, displayImages, tempContent);
        break;
      case 'worldbuilding':
        tempContent = await worldbuilding(actor, displayImages, tempContent);
        break;
      case 'rqg':
        tempContent = await rqg(actor, displayImages, tempContent);
        break;
      case 'a5e':
        tempContent = await a5e(actor, displayImages);
        break;
      case 'dsa5':
        tempContent = await dsa5(actor, displayImages);
        break;
      case 'sfrpg':
        tempContent = await sfrpg(actor, displayImages);
        break;
      case 'pf1':
        tempContent = await pf1(actor, displayImages);
        break;
      case 'wfrp4e':
        tempContent = await wfrp4e(actor, displayImages);
        break;
      case 'cyphersystem':
        tempContent = await cyphersystem(actor, displayImages);
        break;
      case 'swade':
        tempContent = await swade(actor, displayImages);
        break;
      case 'vtm5e':
        tempContent = await vtm5e(actor, displayImages);
        break;
      case 'alienrpg':
        tempContent = await alienrpg(actor, displayImages);
        break;
      case 'shadowdark':
        tempContent = await shadowdark(actor, displayImages);
        break;
      case 'draw-steel':
        tempContent = await drawsteel(actor, displayImages);
        break;
      case 'daggerheart':
        tempContent = await daggerheart(actor, displayImages);
        break;
      case 'gurps':
        tempContent = await gurps(actor, displayImages);
        break;
      case 'wrath-and-glory':
        tempContent = await wrathAndGlory(actor, displayImages);
        break;
      case 'dragonbane':
        tempContent = await dragonbane(actor, displayImages);
        break;
      case 'worldofdarkness':
        tempContent = await worldofdarkness(actor, displayImages);
        break;
      case 'forbidden-lands':
        tempContent = await forbiddenlands(actor, displayImages);
        break;
      case 'deltagreen':
        tempContent = await deltagreen(actor, displayImages);
        break;
      case 'blades-in-the-dark':
        tempContent = await bladesInTheDark(actor, displayImages);
        break;
      case 'pbta':
        tempContent = await pbta(actor, displayImages);
        break;
      case 'ose':
        tempContent = await ose(actor, displayImages);
        break;
      case 'custom-system-builder':
        tempContent = await customSystemBuilder(actor, displayImages);
        break;
      case 'cairn':
        tempContent = await cairn(actor, displayImages);
        break;
      case 'tormenta20':
        tempContent = await tormenta20(actor, displayImages);
        break;
      case 'dcc':
        tempContent = await dcc(actor, displayImages);
        break;
      case 'mutant-year-zero':
        tempContent = await mutantyearzero(actor, displayImages);
        break;
      case 'wod5e':
        tempContent = await wod5e(actor, displayImages);
        break;
      case 'universal-tabletop-system':
        tempContent = await universalTabletopSystem(actor, displayImages);
        break;
      case 'starwarsffg':
        tempContent = await starwarsffg(actor, displayImages);
        break;
      case 'sandbox':
        tempContent = await sandbox(actor, displayImages);
        break;
      case 'lancer':
        tempContent = await lancer(actor, displayImages);
        break;
      case 'D35E':
        tempContent = await d35e(actor, displayImages);
        break;
      case 'impmal':
        tempContent = await impmal(actor, displayImages);
        break;
      case 'fallout':
        tempContent = await fallout(actor, displayImages);
        break;
      case 'cosmere-rpg':
        tempContent = await cosmereRPG(actor, displayImages);
        break;
      case 'shadowrun5e':
        tempContent = await shadowrun5e(actor, displayImages);
        break;
      case 'tor2e':
        tempContent = await tor2e(actor, displayImages);
        break;
      case 'cyberpunk-red-core':
        tempContent = await cyberpunkRedCore(actor, displayImages);
        break;
    }

    const callData = { content: tempContent }; // so it can be changed
    foundry.helpers.Hooks.callAll("tokenNoteHover.createContent", actor, displayImages, callData);

    const content = callData.content;

    this.contentAvailable = content !== null && content !== '';

    data.title = actor.name;
    data.body = content;

    data.fontSize = game.settings.get(CONSTANTS.MODULE_ID, 'fontSize');
    data.maxWidth = game.settings.get(CONSTANTS.MODULE_ID, 'maxWidth');

    const tooltipTitle = game.settings.get(CONSTANTS.MODULE_ID, 'showTitle') ? `<div class="token-note-hover-hud-h2">${data.title}</div>` : '';

    this.contentTooltip = await foundry.applications.ux.TextEditor.enrichHTML(`
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
      const centre = canvas.scene._viewPosition;
      const widthScaled = this.object.w * centre.scale;
      const heightScaled = this.object.h * centre.scale;
      const leftScaled = x - (this.object.w / 2);
      const topScaled = y - (this.object.h / 2);

      position = {
        height: `${heightScaled}px`,
        width: `${widthScaled}px`,
        left: `${leftScaled}px`,
        top: `${topScaled}px`,
      };
    } else if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'adjacent-to-token') {
      x = this.object.center ? this.object.center.x : this.object.x;
      y = this.object.center ? this.object.center.y : this.object.y;
      const centre = canvas.scene._viewPosition;
      const widthScaled = this.object.w * centre.scale;
      const heightScaled = this.object.h * centre.scale;
      const leftScaled = x - (this.object.w / 2);
      const topScaled = y - (this.object.h / 2);

      position = {
        height: `${heightScaled}px`,
        width: `${widthScaled}px`,
        left: `${leftScaled}px`,
        top: `${topScaled}px`,
      };
    } else {
      const centre = canvas.scene._viewPosition;
      const windowWidthScaled = window.innerWidth / centre.scale;
      const windowHeightScaled = window.innerHeight / centre.scale;
      let xAxis = 0;
      let yAxis = 0;
      if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'top-left') {
        xAxis = centre.x + (windowWidthScaled / 2);
        yAxis = centre.y - (windowHeightScaled / 2);
        tooltipPlacement = 'se-alt';
      } else if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'top-right') {
        const sidebar = document.getElementById("sidebar");
        const sidebarWidthScaled = sidebar.offsetWidth / centre.scale;
        xAxis = centre.x - (windowWidthScaled / 2) + sidebarWidthScaled;
        yAxis = centre.y - (windowHeightScaled / 2);
        tooltipPlacement = 'sw';
      } else if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'bottom-left') {
        xAxis = centre.x + (windowWidthScaled / 2);
        yAxis = centre.y + (windowHeightScaled / 2);
        tooltipPlacement = 'ne-alt';
      } else if (game.settings.get(CONSTANTS.MODULE_ID, 'tooltipScreenPosition') === 'bottom-right') {
        const sidebar = document.getElementById("sidebar");
        const sidebarWidthScaled = sidebar.offsetWidth / centre.scale;
        xAxis = centre.x - (windowWidthScaled / 2) + sidebarWidthScaled;
        yAxis = centre.y + (windowHeightScaled / 2);
        tooltipPlacement = 'nw';
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
