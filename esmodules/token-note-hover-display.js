const MODULE_NAME = "map-note-hover-display"
const ELEMENT_ID = "map-note-hover-display"

class MapNoteHoverDisplay extends BasePlaceableHUD {
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
      template: "modules/map-note-hover-display/template.html",
    })
  }

  getData() {
    const data = super.getData()
    const entry = this.object.entry
    const content = TextEditor.enrichHTML(entry.data.content, { secrets: entry.isOwner })

    data.title = entry.data.name
    data.body = content

    return data
  }

  setPosition() {
    const fontSize = game.settings.get(MODULE_NAME, "fontSize") || canvas.grid.size / 5 + "px"
    const darkMode = game.settings.get(MODULE_NAME, "darkMode")

    if (this.object) {
      const mapNoteXPosition = this.object.x
      const mapNoteYPosition = this.object.y
      const viewportWidth = visualViewport.width
      const mapNoteIconWidth = this.object.controlIcon.width
      const mapNoteIconHeight = this.object.controlIcon.height
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
        top: mapNoteYPosition - mapNoteIconHeight / 2,
        left:
          orientation === "right"
            ? mapNoteXPosition + mapNoteIconWidth
            : mapNoteXPosition - mapNoteIconWidth,
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
  game.settings.register(MODULE_NAME, "enabled", {
    name: "Show map note hover display",
    hint: "Display the journal entry for a map note when it's hovered",
    scope: "client",
    type: Boolean,
    default: false,
    config: true,
  })
  game.settings.register(MODULE_NAME, "darkMode", {
    name: "Dark Mode",
    hint: "Show with light text on a dark background",
    scope: "client",
    type: Boolean,
    default: true,
    config: true,
  })
  game.settings.register(MODULE_NAME, "fontSize", {
    name: "Text size override",
    hint: "Override the base text size for the journal entry display. Example: 1.5rem.",
    scope: "client",
    type: String,
    default: "",
    config: true,
  })
  game.settings.register(MODULE_NAME, "maxWidth", {
    name: "Maximum Width",
    hint: "The maximum width the entry display can grow to before it'll force wrapping.",
    scope: "client",
    type: Number,
    default: 800,
    config: true,
  })
}

Hooks.on("init", () => {
  registerSettings()
})

Hooks.on("renderHeadsUpDisplay", (_app, html) => {
  html.append(`<template id="${ELEMENT_ID}"></template>`)
  canvas.hud.mapNoteHoverDisplay = new MapNoteHoverDisplay()
})

Hooks.on("hoverNote", (note, hovered) => {
  if (game.settings.get(MODULE_NAME, "enabled")) {
    // If the note is hovered by the mouse cursor (not via alt/option)
    if (hovered && note.mouseInteractionManager.state === 1) {
      console.log("rendering note display")
      canvas.hud.mapNoteHoverDisplay.bind(note)
    } else {
      canvas.hud.mapNoteHoverDisplay.clear()
    }
  }
})
