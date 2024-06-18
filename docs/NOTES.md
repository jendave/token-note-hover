# Notes and Tips

## put into console

CONFIG.debug.hooks = true

## put into macro

CONFIG.debug.hooks = !CONFIG.debug.hooks;
if (CONFIG.debug.hooks)
    console.log("NOW LISTENING TO ALL HOOK CALLS!");
else
    console.log("HOOK LISTENING DISABLED.");

## Get all hooks from source code

Run in /Applications/Foundry Virtual Tabletop.app/Contents/Resources/app

grep -rinoE 'Hooks.call(All)?\([^()]*\)'

npm init @eslint/config


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