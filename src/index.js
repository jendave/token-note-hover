const MODULE_NAME = 'token-note-hover';
const ELEMENT_ID = 'token-note-hover';

class TokenNoteHover extends BasePlaceableHUD {
  constructor(note, options) {
    super(note, options);
    this.data = note;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: ELEMENT_ID,
      classes: [...super.defaultOptions.classes, ELEMENT_ID],
      minimizable: false,
      resizable: false,
      template: 'modules/token-note-hover/templates/template.html',
    });
  }

  // eslint-disable-next-line consistent-return
  async getData() {
    const data = super.getData();
    const { actor } = this.object;

    let tempContent = '';
    let actorIsOwner = true;
    if (actor) {
      actorIsOwner = actor.isOwner ?? true;

      switch (actor.type) {
        case 'starship':
          tempContent = await TextEditor.enrichHTML(actor.system.notes, {
            secrets: actorIsOwner,
            documents: true,
            async: true,
          });
          break;
        case 'character':
          if (actor.sheet?.constructor.name === 'IronswornCharacterSheetV2') {
            tempContent = await TextEditor.enrichHTML(actor.system.biography, {
              secrets: actorIsOwner,
              documents: true,
              async: true,
            });
          } else if (actor.sheet?.constructor.name === 'StarforgedCharacterSheet') {
            tempContent = await TextEditor.enrichHTML(actor.system.notes, {
              secrets: actorIsOwner,
              documents: true,
              async: true,
            });
          }
          break;
        case 'foe':
          tempContent = await TextEditor.enrichHTML(
            Array.from(actor.items.values()).map((c) => c.system.description),
            {
              secrets: actorIsOwner,
              documents: true,
              async: true,
            }
          );
          break;
        case 'shared':
          tempContent = await TextEditor.enrichHTML(actor.system.biography, {
            secrets: actorIsOwner,
            documents: true,
            async: true,
          });
          break;
        case 'site':
          tempContent = await TextEditor.enrichHTML(actor.system.description, {
            secrets: actorIsOwner,
            documents: true,
            async: true,
          });
          break;
        case 'location':
          tempContent = await TextEditor.enrichHTML(actor.system.description, {
            secrets: actorIsOwner,
            documents: true,
            async: true,
          });
          break;
        default:
          tempContent = null;
      }
      const content = tempContent;
      data.title = actor.name;
      data.body = content;

      return data;
    }
  }

  setPosition() {
    const fontSize = game.settings.get(MODULE_NAME, 'fontSize') || `${canvas.grid.size / 5}px`;
    const darkMode = game.settings.get(MODULE_NAME, 'darkMode');

    if (this.object) {
      const tokenNoteXPosition = this.object.x;
      const tokenNoteYPosition = this.object.y;
      const viewportWidth = visualViewport.width;
      const tokenNoteIconWidth = this.object.w;
      const tokenNoteIconHeight = this.object.h;
      const orientation = (this.object.getGlobalPosition()?.x ?? 0) < viewportWidth / 2 ? 'right' : 'left';

      this.element.css({
        background: darkMode ? 'url("./ui/denim075.png") repeat' : 'white',
        border: darkMode ? '1px solid var(--color-border-dark)' : '1px solid var(--color-border-light-primary)',
        'border-radius': '5px',
        'box-shadow': '0 0 20px var(--color-shadow-dark)',
        padding: '10px',
        width: 'auto',
        'max-width': `${game.settings.get(MODULE_NAME, 'maxWidth')}px`,
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
    }
  }
}

function registerSettings() {
  // eslint-disable-next-line no-console
  console.log(`${MODULE_NAME} | Initializing token-note-hover`);
  game.settings.register(MODULE_NAME, 'enabled', {
    name: game.i18n.localize('token-note-hover.Settings.Enabled.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.Enabled.Hint'),
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(MODULE_NAME, 'darkMode', {
    name: game.i18n.localize('token-note-hover.Settings.DarkMode.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.DarkMode.Hint'),
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(MODULE_NAME, 'fontSize', {
    name: game.i18n.localize('token-note-hover.Settings.FontSize.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.FontSize.Hint'),
    scope: 'client',
    type: String,
    default: '',
    config: true,
  });

  game.settings.register(MODULE_NAME, 'maxWidth', {
    name: game.i18n.localize('token-note-hover.Settings.MaxWidth.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.MaxWidth.Hint'),
    scope: 'client',
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(MODULE_NAME, 'displayDelay', {
    name: game.i18n.localize('token-note-hover.Settings.DisplayDelay.Name'),
    hint: game.i18n.localize('token-note-hover.Settings.DisplayDelay.Hint'),
    scope: 'client',
    type: Number,
    default: 100,
    config: true,
    onChange: (s) => { },
    range: { min: 0, max: 3000, step: 100 },
  });
}

Hooks.on('init', () => {
  registerSettings();
});

Hooks.on('renderHeadsUpDisplay', (_app, html) => {
  html.append(`<template id="${ELEMENT_ID}"></template>`);
  canvas.hud.tokenNoteHover = new TokenNoteHover();
});

// eslint-disable-next-line consistent-return
Hooks.on('hoverToken', (token, hovered) => {
  const displayDelay = game.settings.get(MODULE_NAME, 'displayDelay');

  if (game.settings.get(MODULE_NAME, 'enabled')) {
    if (!hovered) {
      return canvas.hud.tokenNoteHover.clear();
    }

    // If the note is hovered by the mouse cursor (not via alt/option)
    if (hovered) {
      canvas.hud.tokenNoteHover.hoverTimer = setTimeout(() => {
        canvas.hud.tokenNoteHover.bind(token);
      }, displayDelay);
    } else {
      canvas.hud.tokenNoteHover.clear();
    }
  }
});
