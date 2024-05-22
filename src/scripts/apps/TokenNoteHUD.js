import CONSTANTS from "../constants.js";
import {
  isPlacementVertical,
  isRealNumber,
  retrieveFirstImageFromJournalId,
  retrieveFirstTextFromJournalId,
} from "../lib/lib.js";
import { PinCushionPixiHelpers } from "../pixi/token-note-hover-pixi-helpers.js";
import { PinCushion } from "./TokenNote.js";

/**
 * @class PinCushionHUD
 *
 * A HUD extension that shows the Note preview
 */
export class PinCushionHUD extends BasePlaceableHUD {
  constructor(note, options) {
    super(note, options);
    this.data = note;
  }

  /**
   * Retrieve and override default options for this application
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "token-note-hover-hud",
      classes: [...super.defaultOptions.classes, "token-note-hover-hud"],
      minimizable: false,
      resizable: false,
      template: "modules/token-note-hover/templates/journal-preview.html",
    });
  }

  /**
   * Get data for template
   */
  async getData() {
    // Original
    // let data = super.getData();
    // const note = this.object;

    // const dataTmp = await PinCushionPixiHelpers._manageContentHtmlFromNote(note);
    // data = mergeObject(data, dataTmp);

    // this.contentTooltip = await TextEditor.enrichHTML(`
    //   <div id="container" class="token-note-hover-hud-container" style="font-size:${data.fontSize}px; max-width:${data.maxWidth}px">
    //       ${data.contentTooltip}
    //   </div>`);
    // this.fontSize = data.fontSize;
    // this.maxWidth = data.maxWidth;

    // return data;

    // Temp
    // let data = super.getData();
    // const actor = this.object;

    // const dataTmp = await PinCushionPixiHelpers._manageContentHtmlFromNote(actor);
    // data = mergeObject(data, dataTmp);

    // this.contentTooltip = await TextEditor.enrichHTML(`
    //           <div id="container" class="token-note-hover-hud-container" style="font-size:${data.fontSize}px; max-width:${data.maxWidth}px">
    //               ${data.contentTooltip}
    //           </div>`);
    // this.fontSize = data.fontSize;
    // this.maxWidth = data.maxWidth;

    // return data;

    // Token Note Hover
    let data = super.getData();
    const note = this.object;
    const actor = note.actor;

    const dataTmp = await PinCushionPixiHelpers._manageContentHtmlFromNote(note);
    // data = mergeObject(data, dataTmp);

    let tempContent = "";
    let actorIsOwner = true;
    if (actor) {
      actorIsOwner = actor.isOwner ?? true;

      switch (actor.type) {
        case "starship":
          tempContent = await TextEditor.enrichHTML(actor.system.notes, {
            secrets: actorIsOwner,
            documents: true,
            async: true,
          });
          break;
        case "character":
          if (actor.sheet?.constructor.name === "IronswornCharacterSheetV2") {
            tempContent = await TextEditor.enrichHTML(actor.system.biography, {
              secrets: actorIsOwner,
              documents: true,
              async: true,
            });
          } else if (actor.sheet?.constructor.name === "StarforgedCharacterSheet") {
            tempContent = await TextEditor.enrichHTML(actor.system.notes, {
              secrets: actorIsOwner,
              documents: true,
              async: true,
            });
          }
          break;
        case "foe":
          tempContent = await TextEditor.enrichHTML(
            Array.from(actor.items.values()).map((c) => c.system.description),
            {
              secrets: actorIsOwner,
              documents: true,
              async: true,
            }
          );
          break;
        case "shared":
          tempContent = await TextEditor.enrichHTML(actor.system.biography, {
            secrets: actorIsOwner,
            documents: true,
            async: true,
          });
          break;
        case "site":
          tempContent = await TextEditor.enrichHTML(actor.system.description, {
            secrets: actorIsOwner,
            documents: true,
            async: true,
          });
          break;
        case "location":
          tempContent = await TextEditor.enrichHTML(actor.system.description, {
            secrets: actorIsOwner,
            documents: true,
            async: true,
          });
          break;
        default:
          tempContent = null;
      }

      //data.contentTooltip = tempContent;
      const content = tempContent;

      data.title = actor.name;
      data.body = content;

      this.fontSize = data.fontSize;
      this.maxWidth = data.maxWidth;

      this.contentTooltip = await TextEditor.enrichHTML(`
            <div id="container" class="token-note-hover-hud-container" style="font-size:${data.fontSize}px; max-width:${data.maxWidth}px">
                ${data.body}
            </div>`);

      return data;
    }
  }

  /**
   * Set app position
   */
  setPosition() {
    if (!this.object) {
      return;
    }
    const fontSize = this.fontSize;
    const maxWidth = this.maxWidth;

    const tooltipPlacement =
      getProperty(this.object.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.TOOLTIP_PLACEMENT) ?? "e";

    const tooltipSmartPlacement =
      getProperty(this.object.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.TOOLTIP_SMART_PLACEMENT) ?? false;

    const tooltipFollowMouse =
      getProperty(this.object.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.TOOLTIP_FOLLOW_MOUSE) ?? false;

    const isVertical = isPlacementVertical(tooltipPlacement);

    let orientation = "";
    if (tooltipPlacement.includes("e")) {
      orientation = "right";
    } else {
      orientation = "left";
    }

    // WITH TOOLTIP
    let x = 0;
    let y = 0;
    if (game.settings.get(CONSTANTS.MODULE_ID, "tooltipUseMousePositionForCoordinates")) {
      const positionMouse = canvas.mousePosition;
      x = positionMouse.x;
      y = positionMouse.y;
    } else {
      x = this.object.center ? this.object.center.x : this.object.x;
      y = this.object.center ? this.object.center.y : this.object.y;
    }

    const width = this.object.w;
    const height = this.object.h;
    let left = x - width / 2;

    const top = y - height / 2;

    const position = {
      height: height + "px",
      width: width + "px",
      left: left + "px",
      top: top + "px",
      "font-size": fontSize + "px",
      "max-width": maxWidth + "px",
    };
    this.element.css(position);
  }

  activateListeners(html) {
    super.activateListeners(html);

    let elementToTooltip = this.element;
    if (!elementToTooltip.document) {
      elementToTooltip = $(elementToTooltip);
    }

    const fontSize = game.settings.get(CONSTANTS.MODULE_ID, "fontSize") || canvas.grid.size / 5;
    const maxWidth = game.settings.get(CONSTANTS.MODULE_ID, "maxWidth");

    const tooltipPlacement =
      getProperty(this.object.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.TOOLTIP_PLACEMENT) ?? "e";

    const tooltipSmartPlacement =
      getProperty(this.object.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.TOOLTIP_SMART_PLACEMENT) ?? false;

    const tooltipFollowMouse =
      getProperty(this.object.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.TOOLTIP_FOLLOW_MOUSE) ?? false;

    const tooltipColor =
      getProperty(this.object.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.TOOLTIP_COLOR) ?? "";

    let orientation = "";
    if (tooltipPlacement.includes("e")) {
      orientation = "right";
    } else {
      orientation = "left";
    }

    const isVertical = isPlacementVertical(tooltipPlacement);

    // WITH TOOLTIP
    let x = 0;
    let y = 0;
    if (game.settings.get(CONSTANTS.MODULE_ID, "tooltipUseMousePositionForCoordinates")) {
      const positionMouse = canvas.mousePosition;
      x = positionMouse.x;
      y = positionMouse.y;
    } else {
      x = this.object.center ? this.object.center.x : this.object.x;
      y = this.object.center ? this.object.center.y : this.object.y;
    }

    const width = this.object.w;
    const height = this.object.h;
    let left = x - width / 2;

    const top = y - height / 2;

    const position = {
      height: height + "px",
      width: width + "px",
      left: left + "px",
      top: top + "px",
    };
    elementToTooltip.css(position);

    const tooltipPopupClass = tooltipColor
      ? "token-note-hover-hud-tooltip-" + tooltipColor
      : "token-note-hover-hud-tooltip-default";

    const tooltipTipContent = $(this.contentTooltip);

    elementToTooltip.data("powertipjq", tooltipTipContent);
    elementToTooltip.powerTip({
      // 	(default: 'powerTip') HTML id attribute for the tooltip div.
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
      smartPlacement: tooltipSmartPlacement,

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
      closeDelay: 0,

      // (default: 100) Hover intent polling interval in milliseconds.
      intentPollInterval: 0,
    });
    // }
    $.powerTip.show(elementToTooltip);
  }
}
