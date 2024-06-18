const containerStyle = `
<style>
aside.note-tooltip {
    padding: 15px;
    max-width: 330px;
    background-color: rgba(34, 28, 27, 0.95);
    border-image-slice: 16 16 16 16;
    border-image-width: 20px 20px 20px 20px;
    border-image-repeat: stretch stretch;
    border-image-source: url(/modules/terre-selvagge-dnd5e/assets/images/style/bordo-pulsanti.webp);
    border-radius: 0;
    color: white;
    box-shadow: 0 0 4px #000;
    transition: opacity 50ms;
}
aside.notetooltip2 {
    background-color: transparent;
   max-width: 330px;
    color: black;
    background-image: none;
    border-image-source: url(/modules/terre-selvagge-dnd5e/assets/images/style/rpg-styled-ui/ui/img/gui/ui-board-parchment.png);
    border-image-repeat: repeat;
    border-image-slice: 120 fill;
    border-image-width: 20px;
    border-color: transparent !important;
    border-width: 4px;
    margin: 0.1rem 0.2rem;
    padding: 0.5rem 1rem;
    filter: sepia(10%);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
}
.note-tooltip p:first-of-type::first-letter,
.notetooltip2 p:first-of-type::first-letter {
  font-family: 'Dropcap';
  font-size: 3em;
  float: left;
  margin-right: 0.1em;
  line-height: 0.8;
  vertical-align: -0.2em;
}
</style>
`;

const monksEnhancedParsing = {
  quest: (note) => {
    const page = note.entry.pages.contents[0];
    const questStatus = page.getFlag("monks-enhanced-journal", "status") || "Status not available";
    const items = page?.getFlag("monks-enhanced-journal", "rewards")?.[0]?.items || [];
    let itemsList = "";
    if (items.length > 0) {
      itemsList += "<ul>";
      for (const item of items) {
        itemsList += `<li>${item.name}</li>`;
      }
      itemsList += "</ul>";
    } else {
      itemsList = "";
    }
    const currency = page?.getFlag("monks-enhanced-journal", "rewards")?.[0]?.currency || {};
    let rewards = "";
    for (const [key, value] of Object.entries(currency)) {
      if (value > 0) {
        const currencyName = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize and pluralize
        rewards += `${value} ${currencyName} - `;
      }
    }
    rewards = rewards || "Non ce ricompensa";
    return $(`
        <div>   
  <div style="text-align: center;">
    <img src="${page.src}" style="width: 220px; object-fit: contain; border: none;">
</div>
 <h2 style="text-align: center; font-family: 'Dalelands';">${page.name}</h2>
${page.text.content}
<p>Rewards: ${rewards}</p>
<p>${itemsList}</p>
<h3>Stato: ${questStatus}</h3>
        </div>`)[0];
  },
  place: (note) => {
    const page = note.entry.pages.contents[0];
    return $(`
<div>
  <div style="text-align: center;">
    <img src="${page.src}" style="width: 220px; object-fit: contain; border: none;">
  </div>
  <h2 style="text-align: center; font-family: 'Dalelands';">${page.name}</h2>
${page.text.content}
</div>
`)[0];
  },
  organization: (note) => {
    const page = note.entry.pages.contents[0];
    const contentHTML = page.text.content;
    const regex = /(\d+)x @Compendium\[world\.ingredienticrafting\.(\w+)\]\{(.+?)\}/g;
    let match;
    let itemList = "";

    while ((match = regex.exec(contentHTML)) !== null) {
      const quantity = match[1];
      const itemName = match[3];
      itemList += `\n- ${quantity} ${itemName}`;
    }

    // Initialize an object to hold the counts of each unique itemName
    const itemCounts = {};

    // Iterate through each offering in the offerings array
    const offerings = page.flags["monks-enhanced-journal"].offerings || [];
    for (const offering of offerings) {
      // Iterate through each item in the items array
      const items = offering.items || [];
      for (const item of items) {
        const itemName = item.itemName;
        const qty = item.qty;

        // Update the count for this itemName
        itemCounts[itemName] = (itemCounts[itemName] || 0) + qty;
      }
    }

    // Initialize an object to hold the counts of each unique itemName for itemList
    const itemCountsFromList = {};

    // Parse itemList and populate itemCountsFromList
    const itemLines = itemList.split("\n").filter((line) => line.trim() !== "");
    for (const line of itemLines) {
      const [, qty, itemName] = line.match(/- (\d+) (.+)/);
      itemCountsFromList[itemName] = parseInt(qty, 10);
    }

    // Subtract aggregated item counts from itemCountsFromList
    for (const [itemName, qty] of Object.entries(itemCounts)) {
      if (itemCountsFromList[itemName] !== undefined) {
        itemCountsFromList[itemName] -= qty;
      }
    }
    let updatedItemList = "";
    for (const [itemName, qty] of Object.entries(itemCountsFromList)) {
      if (qty > 0) {
        // Only include items with positive quantities
        updatedItemList += `\n- ${qty} ${itemName}`;
      }
    }

    let missingItemsList = "";
    let missingItemsHeader = "";

    for (const [itemName, qty] of Object.entries(itemCountsFromList)) {
      if (qty > 0) {
        // Only include items that are still needed (positive quantities)
        if (missingItemsList === "") {
          missingItemsList = "<ul>"; // Initialize UL if you're about to add the first item
          missingItemsHeader = "Costi Mancanti: <br>";
        }
        missingItemsList += `<li>${qty} ${itemName}</li>`;
      }
    }

    if (missingItemsList !== "") {
      missingItemsList += "</ul>"; // Close UL if there are any items
    }

    return $(`
<div>
  <div style="text-align: center;">
    <!-- Display the thumbnail -->
    <img src="${page.src}" style="width: 100px; height: 100px; object-fit: contain; border: none;">
  </div>
  <h2 style="text-align: center; font-family: 'Dalelands';">${page.name}</h2>
  <h3>${missingItemsHeader}${missingItemsList}</h3>
  <h3>Stato: ${page.getFlag("monks-enhanced-journal", "alignment")}</h3>
<button id="showquest" onclick="handleShowQuest()">Attiva</button>
</div>
`)[0];
  },
  encounter: (note) => {
    return $(`
        <div style="font-size:32px;">
            <h2>Encounter</h2>
            <p>description</p>
        </div>
        `)[0];
  },
};

// ------------------------------------ //

function drawTooltip() {
  const journal = this.entry;
  const journalType = journal?.getFlag("monks-enhanced-journal", "pagetype");
  const pageType = journal?.pages.contents[0].getFlag("monks-enhanced-journal", "type");
  const parser = monksEnhancedParsing[pageType] ?? monksEnhancedParsing[journalType];
  if (!parser) return OLD_TOOLTIP.call(this);

  // Destroy any prior text
  if (this.tooltip) {
    this.removeChild(this.tooltip);
    this.tooltip = undefined;
  }

  // Create Element
  const wrappedEl = wrapElement(parser, this);

  // Add child and return
  return (this.tooltip = this.addChild(wrappedEl));
}

// ------------------------------------ //

document.head.insertAdjacentHTML("beforeend", containerStyle);
const OLD_TOOLTIP = CONFIG.Note.objectClass.prototype._drawTooltip;
CONFIG.Note.objectClass.prototype._drawTooltip = drawTooltip;

// ------------------------------------ //

/**
 *
 * ElementWrapper - ALTERED
 *
 * @version : 2.0.2
 * @author  : http://www.enea.sk
 *
 * @export
 * @class ElementWrapper
 * @extends {PIXI.DisplayObject}
 */
class ElementWrapper extends PIXI.DisplayObject {
  /**
   * Creates an instance of ElementWrapper.
   *
   * @param {Element} [target=null]
   */
  constructor(target, parser, note) {
    super();

    // prevents AccessibilityManager crash
    this.children = [];
    this.style = {};
    this.note = note;
    this._parser = parser;

    this.target = target;
    target.style.position = "absolute";
    target.style.left = "0px";
    target.style.top = "0px";
    document.body.append(target);
    this._repositionHook = Hooks.on("canvasPan", () => this.updateTarget());

    this.prevID = -1;
    this._anchorX = 0;
    this._anchorY = 0;

    this.target.addEventListener("mouseover", () => {
      this.visible = true;
      this.target.addEventListener("mouseleave", () => (this.visible = false));
    });
  }

  /**
   *
   * updateTarget
   *
   */
  updateTarget() {
    if (this.visible === false) return;
    const matrix = this.worldTransform;
    const bounds = this.bounds;
    this.toGlobal(new PIXI.Point(0, 0));
    const rightSide = matrix.tx < canvas.screenDimensions[0] / 2;
    const paddingX = (rightSide ? 1 : -1) * (bounds.width / 2 + 30);
    this.target.style.transform = `translate(${matrix.tx - bounds.width / 2 + paddingX}px, ${
      matrix.ty - bounds.height / 2
    }px)`;
  }

  /**
   *
   * render
   *
   */
  render() {
    if (this.prevID === this.transform._worldID || this.target === null) {
      return;
    }

    this.updateTarget();

    this.prevID = this.transform._worldID;
  }

  /**
   *
   * destroy
   *
   */
  destroy() {
    this.target.remove();
    Hooks.off("canvasPan", this._repositionHook);
    this.target = null;
    this.prevID = null;

    super.destroy();
  }

  /**
   *
   * bounds
   *
   * @readonly
   */
  get bounds() {
    return this.target.getBoundingClientRect();
  }

  /**
   *
   * anchorX
   *
   */
  get anchorX() {
    return this._anchorX;
  }

  /**
   *
   * anchorX
   *
   * @param {number} value
   */
  set anchorX(value) {
    this._anchorX = value;

    this.pivot.x = value * this.bounds.width;
  }

  /**
   *
   * anchorY
   *
   */
  get anchorY() {
    return this._anchorY;
  }

  /**
   *
   * anchorY
   *
   * @param {number} value
   */
  set anchorY(value) {
    this._anchorY = value;

    this.pivot.y = value * this.bounds.height;
  }

  /**
   *
   * anchorXY
   *
   * @param {number} value
   */
  set anchorXY(value) {
    this.anchorX = value;
    this.anchorY = value;
  }

  /**
   * visible
   *
   * @param {boolean} value
   */
  set visible(value) {
    if (!this.target) return;
    this.target.style.opacity = value ? "1" : "0";
    if (value === false) {
      this._fadeoutTimeout = setTimeout(() => {
        this.target.style.display = "none";
      }, 50);
    } else {
      this.target.innerHTML = "";
      this.target.append(this._parser(this.note));

      this.target.style.display = "";
      clearTimeout(this._fadeoutTimeout);
    }
  }
  get visible() {
    if (!this.target) return false;
    return this.target.style.opacity !== "0";
  }
}

ElementWrapper.prototype.renderWebGL = ElementWrapper.prototype.render;
ElementWrapper.prototype.renderCanvas = ElementWrapper.prototype.render;

// ------------------------------------ //

function wrapElement(parser, note) {
  const journalType = note?.entry?.getFlag("monks-enhanced-journal", "pagetype");
  const tooltipClass = journalType === "quest" ? "note-tooltip" : "notetooltip2";
  const container = $(`<aside class="${tooltipClass}" style="opacity: 0; display: none;"></aside>`)[0];

  // create wrapped element
  const wrappedElement = new ElementWrapper(container, parser, note);
  wrappedElement.anchorXY = 0;
  wrappedElement.visible = false;

  return wrappedElement;
}
