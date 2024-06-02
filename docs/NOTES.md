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