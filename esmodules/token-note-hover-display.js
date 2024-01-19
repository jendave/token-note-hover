const MODULE_NAME = "token-note-hover-display"
const ELEMENT_ID = "token-note-hover-display"

class TokenNoteHoverDisplay extends BasePlaceableHUD {
  constructor(note, options) {
    super(note, options)
    this.data = note
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: ELEMENT_ID,
      classes: super.defaultOptions.classes,
      minimizable: false,
      resizable: false,
      template: "modules/token-note-hover-display/templates/template.html",
    })
  }

  async getData() {
    const data = super.getData()
    const entry = this.object.actor

    let tempContent = "";
    let entryIsOwner = true;
    if (entry) {
      entryIsOwner = entry.isOwner ?? true;

      switch (entry.data.type) {
        case 'starship':
          tempContent = await TextEditor.enrichHTML(entry.data.data.notes, {
            secrets: entryIsOwner,
            documents: true,
            async: true,
          });
          break;
        case 'character':
          if (entry.sheet?.constructor.name === 'IronswornCharacterSheetV2') {
            tempContent = await TextEditor.enrichHTML(entry.data.system.biography, {
              secrets: entryIsOwner,
              documents: true,
              async: true,
            });
          } else if (entry.sheet?.constructor.name === 'StarforgedCharacterSheet') {
            tempContent = await TextEditor.enrichHTML(entry.data.data.notes, {
              secrets: entryIsOwner,
              documents: true,
              async: true,
            });
          }
          break;
        case 'foe':
          tempContent = await TextEditor.enrichHTML(Array.from(entry.data.items.values()).map(c => c.system.description), {
            secrets: entryIsOwner,
            documents: true,
            async: true,
          });
          break;
        case 'shared':
          tempContent = await TextEditor.enrichHTML(entry.data.system.biography, {
            secrets: entryIsOwner,
            documents: true,
            async: true,
          });
          break;
        case 'site':
          tempContent = await TextEditor.enrichHTML(entry.data.system.description, {
            secrets: entryIsOwner,
            documents: true,
            async: true,
          });
          break;
        case 'location':
          tempContent = await TextEditor.enrichHTML(entry.data.data.description, {
            secrets: entryIsOwner,
            documents: true,
            async: true,
          });
          break;
      }
      const content = tempContent;
      data.title = entry.data.name
      data.body = content

      return data
    }
  }

  setPosition() {
    const fontSize = game.settings.get(MODULE_NAME, "fontSize") || canvas.grid.size / 5 + "px"
    const darkMode = game.settings.get(MODULE_NAME, "darkMode")

    if (this.object) {
      const tokenNoteXPosition = this.object.x
      const tokenNoteYPosition = this.object.y
      const viewportWidth = visualViewport.width
      const tokenNoteIconWidth = this.object.width
      const tokenNoteIconHeight = this.object.height
      const orientation =
        (this.object.getGlobalPosition()?.x ?? 0) < viewportWidth / 2 ? "right" : "left"

      this.element.css({
        background: darkMode ? `url("./ui/denim075.png") repeat` : "white",
        border: darkMode
          ? "1px solid var(--color-border-dark)"
          : "1px solid var(--color-border-light-primary)",
        "border-radius": "5px",
        "box-shadow": "0 0 20px var(--color-shadow-dark)",
        padding: "10px",
        width: "auto",
        "max-width": `${game.settings.get(MODULE_NAME, "maxWidth")}px`,
        height: "auto",
        top: tokenNoteYPosition, // - tokenNoteIconHeight, // / 2,
        left:
          orientation === "right"
            ? tokenNoteXPosition + (2.5 * tokenNoteIconWidth)
            : tokenNoteXPosition - tokenNoteIconWidth,
        transform: orientation === "right" ? "" : "translateX(-100%)",
        "overflow-wrap": "break-word",
        "text-align": "left",
        "font-size": fontSize,
        color: darkMode ? "var(--color-text-light-highlight)" : "var(--color-text-dark-primary)",
        "pointer-events": "none",
      })
    }
  }
}

function registerSettings() {
  console.log(MODULE_NAME + ' | Initializing token-note-hover-display');
  game.settings.register(MODULE_NAME, "enabled", {
    name: "Show token note hover display",
    hint: "Display the note for a token when it's hovered",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(MODULE_NAME, "darkMode", {
    name: "Dark Mode",
    hint: "Show with light text on a dark background",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(MODULE_NAME, "fontSize", {
    name: "Text size override",
    hint: "Override the base text size for the token entry display. Example: 1.5rem.",
    scope: "client",
    type: String,
    default: "",
    config: true,
  });

  game.settings.register(MODULE_NAME, "maxWidth", {
    name: "Maximum Width",
    hint: "The maximum width the entry display can grow to before it'll force wrapping.",
    scope: "client",
    type: Number,
    default: 800,
    config: true,
  });
}

Hooks.on("init", () => {
  registerSettings()
});

Hooks.on("renderHeadsUpDisplay", (_app, html) => {
  html.append(`<template id="${ELEMENT_ID}"></template>`)
  canvas.hud.tokenNoteHoverDisplay = new TokenNoteHoverDisplay()
});

Hooks.on("hoverToken", (token, hovered) => {
  if (game.settings.get(MODULE_NAME, "enabled")) {
    if (!hovered) {
      return canvas.hud.tokenNoteHoverDisplay.clear();
    }

    // If the note is hovered by the mouse cursor (not via alt/option)
    if (hovered) {
      canvas.hud.tokenNoteHoverDisplay.bind(token);
    } else {
      canvas.hud.tokenNoteHoverDisplay.clear();
    }
  }
});
