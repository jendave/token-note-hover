# Notes and Tips

## put into console to show hooks

CONFIG.debug.hooks = true

## put into macro to show hooks

CONFIG.debug.hooks = !CONFIG.debug.hooks;
if (CONFIG.debug.hooks)
    console.log("NOW LISTENING TO ALL HOOK CALLS!");
else
    console.log("HOOK LISTENING DISABLED.");

## Get all hooks from source code

Run in /Applications/Foundry Virtual Tabletop.app/Contents/Resources/app

grep -rinoE 'Hooks.call(All)?\([^()]*\)'

## Install Lint

npm init @eslint/config

## Code Samples

```javascript
      this.element.css({
        background: darkMode ? 'url("./ui/denim075.png") repeat' : 'white',
        border: darkMode ? '1px solid var(--color-border-dark)' : '1px solid var(--color-border-light-primary)',
        'border-radius': '5px',
        'box-shadow': '0 0 20px var(--color-shadow-dark)',
        padding: '10px',
        width: 'auto',
        'max-width': `${game.settings.get(CONSTANTS.MODULE_NAME, 'maxWidth')}px`,
        height: 'auto',
        top: tokenNoteYPosition - (tokenNoteIconHeight / 2),
        left:
          orientation === 'right'
            ? tokenNoteXPosition + (1.25 * tokenNoteIconWidth)
            : tokenNoteXPosition - (0.5 * tokenNoteIconWidth),
        transform: orientation === 'right' ? '' : 'translateX(-100%)',
        'overflow-wrap': 'break-word',
        'text-align': 'left',
        'font-size': fontSize,
        color: darkMode ? 'var(--color-text-light-highlight)' : 'var(--color-text-dark-primary)',
        'pointer-events': 'none',
      });
```

## Scaling example

```javascript
  calculateScale(sceneDimensionSize, zoomStage) {
    // Taken from Easy Ruler Scale, a mod by Kandashi
    // https://github.com/kandashi/easy-ruler-scale
    const gs = sceneDimensionSize / 100;
    const zs = 1 / zoomStage;
    return Math.max(gs * zs, 0.8);
  }
```

```javascript
  setPosition() {
    const fontSize = game.settings.get(MODULE_NAME, "fontSize") || canvas.grid.size / 5 + "px";
    const darkMode = game.settings.get(MODULE_NAME, "darkMode");

    if (this.object) {
      const tokenNoteXPosition = this.object.x;
      const tokenNoteYPosition = this.object.y;
      const viewportWidth = visualViewport.width;
      const tokenNoteIconWidth = this.object.w;
      const tokenNoteIconHeight = this.object.h;
      const orientation = (this.object.getGlobalPosition()?.x ?? 0) < viewportWidth / 2 ? "right" : "left";
      let scaling = this.calculateScale(canvas.scene.dimensions.size, canvas.stage.scale.x) / 2.8;
      this.element.css({
        background: darkMode ? `url("./ui/denim075.png") repeat` : "white",
        border: darkMode ? "1px solid var(--color-border-dark)" : "1px solid var(--color-border-light-primary)",
        "border-radius": "5px",
        "box-shadow": "0 0 20px var(--color-shadow-dark)",
        padding: "10px",
        width: "auto",
        "max-width": `${game.settings.get(MODULE_NAME, "maxWidth")}px`,
        height: "auto",
        top: tokenNoteYPosition - (tokenNoteIconHeight / 2),
        left:
          orientation === "right"
            ? tokenNoteXPosition + (1.25 * tokenNoteIconWidth)
            : tokenNoteXPosition - (0.5 * tokenNoteIconWidth),
        transform: orientation === "right" ? "" : "translateX(-100%)",
        "overflow-wrap": "break-word",
        "text-align": "left",
        "font-size": fontSize,
        color: darkMode ? "var(--color-text-light-highlight)" : "var(--color-text-dark-primary)",
        "pointer-events": "none",
        scale: String(scaling) + " " + String(scaling)
      });
    }

  }
}
```

```json
    "recommends": [
      {
        "id": "zoom-pan-options",
        "type": "module",
        "reason": "Install for improved tooltip placement while zooming."
      },
      {
        "id": "LockView",
        "type": "module",
        "reason": "Install for improved tooltip placement."
      }
    ]
```

## Development

ln -s ~/mygit/starforged/token-note-hover/dist/token-note-hover ~/mygit/foundrydata/Data/modules/token-note-hover

npm install
npm audit fix
npm audit fix --force
npm run build
npm run dev
