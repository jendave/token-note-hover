# Token Note Hover

![GitHub all releases](https://img.shields.io/github/downloads/jendave/token-note-hover/total)
[![Latest Version](https://img.shields.io/github/v/release/jendave/token-note-hover?display_name=tag&sort=semver&label=Latest%20Version)](https://github.com/jendave/token-note-hover/releases/latest)
![Foundry Version](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjendave%2Ftoken-note-hover%2Fmain%2Fsrc%2Fmodule.json)
[![License](https://img.shields.io/github/license/jendave/token-note-hover)](LICENSE)

## Features and Notes

The `Token Note Hover` module displays the note of a hovered-over token in a tooltip. Links, images and scrolling in the tooltip are supported.

The tooltip will not display if the note is empty or while the token is being dragged.

## FoundryVTT Compatibility

* [Token Note Hover](https://foundryvtt.com/packages/token-note-hover) 3.0.0 and above only run on [FoundryVTT v13](https://foundryvtt.com/releases/13.341) and above.
* [Token Note Hover](https://foundryvtt.com/packages/token-note-hover) 2.1.17 and below only run on [FoundryVTT v12](https://foundryvtt.com/releases/12.331).

## System Support

[Token Note Hover](https://foundryvtt.com/packages/token-note-hover) 4.0.0 and above supports both [API Hooks](#token-note-hover-api) and [Direct System Support](#directly-supported-systems) to enable the hovered-over tooltip display.

### Token Note Hover API

The Token Note Hover API provides a hook to display custom content. This allows systems and modules to inject content into the tooltip.

#### Hook tokenNoteHover.createContent

```javascript
tokenNoteHover.createContent(
        actor,
        displayImages,
        contentMap)
```

#### Hook Parameters

* actor: the actor whose token is being hovered over
* displayImages: if images should be displayed
* contentMap: a map containing the HTML content to be displayed in the hovered note.

#### Example of Using the API to Display a Hovered Note

* Create a world using the [Symbaroum](https://foundryvtt.com/packages/symbaroum) system.
* Install and enable the [Token Note Hover](https://foundryvtt.com/packages/token-note-hover) and [World Scripter](https://foundryvtt.com/packages/world-scripter) modules.
* In the [World Scripter](https://foundryvtt.com/packages/world-scripter) configuration dialog, paste the following code.

```javascript
Hooks.on('tokenNoteHover.createContent', (actor, imageDisplay, contentMap) => { contentMap.content = `<p>${actor.system.notes}</p>` });
```

* Create some tokens, place them on a scene and add some text to the `Notes` field on their character sheet.
* A tooltip will display when the token is hovered over.

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_symbaroum.jpg?raw=true)

* Similar code can be added to any system to enable this functionality.
* Enriched HTML and other modules can be used for tooltip content. This example uses the [GM Notes](https://foundryvtt.com/packages/gm-notes/) module with a link to an Foundry item.

```javascript
Hooks.on('tokenNoteHover.createContent', (actor, imageDisplay, contentMap) => { 
    if( game.user.isGM && actor.flags['gm-notes']?.notes ) contentMap.content = contentMap.content+`<p>${actor.flags['gm-notes']?.notes}</p>` 
});
```

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_gmnotes.jpg?raw=true)

#### Modules and Systems Using the API

* [GM Notes](https://foundryvtt.com/packages/gm-notes)

### Directly Supported Systems

Many systems are directly supported by [Token Note Hover](https://foundryvtt.com/packages/token-note-hover) module. FoundryVTT v13 only is supported.

* [Alien RPG](#alien-rpg)
* [Blades in the Dark](#blades-in-the-dark)
* [Cairn](#cairn)
* [Call of Cthulhu 7th edition](#call-of-cthulhu-7th-edition)
* [Custom System Builder](#custom-system-builder)
* [Cypher System](#cypher-system)
* [D\&D 5E](#dd-5e)
* [Daggerheart](#daggerheart)
* [Das Schwarze Auge / The Dark Eye (5th Edition)](#das-schwarze-auge--the-dark-eye-5th-edition)
* [Delta Green](#delta-green)
* [Dragonbane - Drakar och Demoner](#dragonbane---drakar-och-demoner)
* [Draw Steel](#draw-steel)
* [Dungeon Crawl Classics](#dungeon-crawl-classics)
* [Forbidden Lands](#forbidden-lands)
* [GURPS 4th Edition Game Aid (Unofficial)](#gurps-4th-edition-game-aid-unofficial)
* [Ironsworn/Starforged](#ironswornstarforged)
* [Level Up: Advanced 5th Edition](#level-up-advanced-5th-edition)
* [Mutant Year Zero](#mutant-year-zero)
* [Old-School Essentials](#old-school-essentials)
* [Pathfinder 1st Edition](#pathfinder-1st-edition)
* [Pathfinder 2e](#pathfinder-2e)
* [Powered by the Apocalypse](#powered-by-the-apocalypse)
* [RuneQuest Glorantha](#runequest-glorantha)
* [Savage Worlds Adventure Edition](#savage-worlds-adventure-edition)
* [Shadowdark](#shadowdark)
* [Simple Worldbuilding System](#simple-worldbuilding-system)
* [Starfinder 1st Edition](#starfinder-1st-edition)
* [Tormenta20](#tormenta20)
* [Twodsix - Cepheus \& Traveller](#twodsix---cepheus--traveller)
* [Warhammer 40,000 Roleplay: Wrath \& Glory](#warhammer-40000-roleplay-wrath--glory)
* [Warhammer Fantasy Roleplay 4th Edition](#warhammer-fantasy-roleplay-4th-edition)
* [World of Darkness 20th edition](#world-of-darkness-20th-edition)
* [World of Darkness 5e](#world-of-darkness-5e)

## Customization options

* Tooltip themes.
* Placement, display delay, display window size and font size customization.
* Note can appear adjacent to the token or in a corner of the screen.
* Enable/Disable notes for PCs and NPCs.
* Show/hide note images for tooltip display.
* Can require minimum token ownership level on notes for display.
* Display token title in tooltip.
* Hide/Display private notes.

All settings, except for `token ownership required` are client-side only so each player can enable the features they need.

## Contact

* [Ironsworn/Starforged Discord Server - FoundryVTT Channel](https://discord.com/channels/437120373436186625/867434336201605160) (jendave)
* [FoundryVTT Discord Server - Module Discussion Channel](https://discord.com/channels/170995199584108546/513918036919713802) (jendave)
* [VOID Affiliate Network Discord Server - Game Hacks Channel](https://discord.com/channels/1222986351272787990/1222986351792619687) (jendave)
* [GitHub Repository](https://github.com/jendave/augmented-reality-foundry)
* [Itch.io](https://jendave.itch.io/)

## Module Installation

To install the latest version of this module, search for `Token Note Hover` in the `Add-On Modules` tab of of the Foundry VTT game setup screen. Then click on `Install`.

Or use this URL and click on `Install`:

```bash
https://github.com/jendave/token-note-hover/releases/latest/download/module.json
```

To install the v12 version of this module, use this URL and click on `Install`:

```bash
https://github.com/jendave/token-note-hover/releases/download/2.1.17/module.json
```

### Other Recommended Modules

* [Zoom/Pan Options](https://foundryvtt.com/packages/zoom-pan-options) for `Zoom Around Cursor` setting.
  * Note that this and [Lock View](https://foundryvtt.com/packages/LockView) conflict with each other.
* [Lock View](https://foundryvtt.com/packages/LockView) to prevent zooming from affecting the tooltip placement.
  * Note that this and [Zoom/Pan Options](https://foundryvtt.com/packages/zoom-pan-options) conflict with each other.
* [Force Client Settings](https://foundryvtt.com/packages/force-client-settings) for forcing chosen settings for clients to the defaults provided by the GM.

## Screenshots and Note Locations

### Alien RPG

[Alien RPG](https://foundryvtt.com/packages/alienrpg)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_alienrpg.jpg?raw=true)

| Actor Type     | Note Location |
| -------------- | ------------- |
| **Character**  | Description   |
| **Colony**     | Description   |
| **Creature**   | Notes         |
| **Planet**     | Description   |
| **Spacecraft** | Description   |
| **Synthetic**  | Description   |
| **Territory**  | Description   |
| **Vehicles**   | Description   |

### Blades in the Dark

[Blades in the Dark](https://foundryvtt.com/packages/blades-in-the-dark)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_blades-in-the-dark.jpg?raw=true)

| Actor Type    | Note Location                    |
| ------------- | -------------------------------- |
| **Clock**     | Ticked Segments / Total Segments |
| **Character** | Notes                            |
| **Crew**      | Notes                            |
| **NPC**       | Notes                            |

### Cairn

[Cairn](https://foundryvtt.com/packages/cairn)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_cairn.jpg?raw=true)

| Actor Type               | Note Location                    |
| ------------------------ | -------------------------------- |
| **Player Character**     | Background / Description / Notes |
| **Non-Player Character** | Role / Description / Notes       |

### Call of Cthulhu 7th edition

[Call of Cthulhu 7th edition](https://foundryvtt.com/packages/CoC7)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_cthulhu.jpg?raw=true)

| Actor Type    | Note Location |
| ------------- | ------------- |
| **Character** | Backstory     |
| **Container** | Description   |
| **Creature**  | Notes         |
| **NPC**       | Notes         |

### Custom System Builder

[Custom System Builder](https://foundryvtt.com/packages/custom-system-builder)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_custom-system-builder.jpg?raw=true)

Create a Template with these fields:

* Label: Notes
  * Component Type: Rich Text Area
  * Component key: notes
* Label: Private Notes
  * Component Type: Rich Text Area
  * Component key: privateNotes

Then in a Character Actor, use the Template with the following fields:

| Actor Type    | Note Settings  |
| ------------- | -------------- |
| **Character** | Notes          |
|               | Private Notes  |

### Cypher System

[Cypher System](https://foundryvtt.com/packages/cyphersystem)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_cyphersystem.jpg?raw=true)

| Actor Type       | Note Location    |
| ---------------- | ---------------- |
| **Community**    | Notes            |
| **Companion**    | Notes            |
| **Marker**       | Notes            |
| **NPC/Creature** | Notes            |
| **PC**           | Notes & GM Notes |
| **Vehicle**      | Notes            |

### D&D 5E

[D&D 5E](https://foundryvtt.com/packages/dnd5e)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_dnd5e.jpg?raw=true)

| Actor Type               | Note Location    |
| ------------------------ | ---------------- |
| **Player Character**     | Biography        |
| **Non-player Character** | Biography Public |
| **Group**                | Description      |
| **Vehicle**              | Description      |
| **Encounter**            | Description      |

### Daggerheart

[Daggerheart](https://foundryvtt.com/packages/daggerheart)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_daggerheart.jpg?raw=true)

| Actor Type      | Note Location          |
| --------------- | ---------------------- |
| **Adversary**   | Notes                  |
| **Character**   | Biography - Background |
| **Companion**   | Partner                |
| **Environment** | Notes                  |

### Das Schwarze Auge / The Dark Eye (5th Edition)

[Das Schwarze Auge / The Dark Eye (5th Edition)](https://foundryvtt.com/packages/dsa5)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_dsa5.jpg?raw=true)

| Actor Type               | Note Location |
| ------------------------ | ------------- |
| **Character**            | Notes         |
| **Creature**             | Description   |
| **Non-Player Character** | Notes         |

### Delta Green

[Delta Green](https://foundryvtt.com/packages/deltagreen)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_deltagreen.jpg?raw=true)

| Actor Type    | Note Location |
| ------------- | ------------- |
| **Agent**     | Notes         |
| **NPC**       | Notes         |
| **Unnatural** | Notes         |
| **Vehicle**   | Notes         |

### Dragonbane - Drakar och Demoner

[Dragonbane - Drakar och Demoner](https://foundryvtt.com/packages/dragonbane)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_dragonbane.jpg?raw=true)

| Actor Type               | Note Location |
| ------------------------ | ------------- |
| **Player Character**     | Notes         |
| **Monster**              | Description   |
| **Non-Player Character** | Description   |

### Draw Steel

[Draw Steel](https://foundryvtt.com/packages/draw-steel)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_drawsteel.jpg?raw=true)

| Actor Type    | Note Location              |
| ------------- | -------------------------- |
| **Character** | Biography & Director Notes |
| **NPC**       | Biography & Director Notes |

### Dungeon Crawl Classics

[Dungeon Crawl Classics](https://foundryvtt.com/packages/dcc)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_dcc.jpg?raw=true)

| Actor Type    | Note Location              |
| ------------- | -------------------------- |
| **Player**    | Notes                      |
| **NPC**       | Notes                      |
| **Party**     | Notes                      |

### Forbidden Lands

[Forbidden Lands](https://foundryvtt.com/packages/forbidden-lands)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_forbidden-lands.jpg?raw=true)

| Actor Type     | Note Location |
| -------------- | ------------- |
| **Character**  | Notes         |
| **Monster**    | Notes         |
| **Party**      | Notes         |
| **Stronghold** | Notes         |

### GURPS 4th Edition Game Aid (Unofficial)

[GURPS 4th Edition Game Aid (Unofficial)](https://foundryvtt.com/packages/gurps)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_gurps.jpg?raw=true)

| Actor Type    | Note Location |
| ------------- | ------------- |
| **Character** | Notes         |
| **Enemy**     | Notes         |

### Ironsworn/Starforged

[Ironsworn/Starforged](https://foundryvtt.com/packages/foundry-ironsworn)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_ironsworn.jpg?raw=true)

| Actor Type       | Note Location   |
| ---------------- | --------------- |
| **Character**    | Notes           |
| **Shared Sheet** | Notes           |
| **NPC**          | Text entry area |
| **Starship**     | Notes           |
| **Location**     | Text entry area |

### Level Up: Advanced 5th Edition

[Level Up: Advanced 5th Edition](https://foundryvtt.com/packages/a5e)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_a5e.jpg?raw=true)

| Actor Type               | Note Location                   |
| ------------------------ | ------------------------------- |
| **Player Character**     | Notes                           |
| **Non-Player Character** | Notes & Private Notes (GM only) |

### Mutant Year Zero

[Mutant Year Zero](https://foundryvtt.com/packages/mutant-year-zero)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_mutant-year-zero.jpg?raw=true)

| Actor Type    | Note Location |
| ------------- | ------------- |
| **Animal**    | Info          |
| **Ark**       | Info          |
| **Human**     | Info          |
| **Mutant**    | Info          |
| **NPC**       | Info          |
| **Robot**     | Info          |
| **Spaceship** | Info          |
| **Vehicle**   | Info          |

### Old-School Essentials

[Old-School Essentials](https://foundryvtt.com/packages/ose)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_ose.jpg?raw=true)

| Actor Type    | Note Location |
| ------------- | ------------- |
| **Character** | Notes         |
| **Monster**   | Notes         |

### Pathfinder 1st Edition

[Pathfinder 1](https://foundryvtt.com/packages/pf1)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_pf1.jpg?raw=true)

| Actor Type               | Note Location |
| ------------------------ | ------------- |
| **Player Character**     | Notes         |
| **Haunt**                | Notes         |
| **Trap**                 | Notes         |
| **Non-Player Character** | Notes         |
| **Vehicle**              | Notes         |

### Pathfinder 2e

[Pathfinder 2e](https://foundryvtt.com/packages/pf2e)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_pf2e.jpg?raw=true)

| Actor Type               | Note Location         |
| ------------------------ | --------------------- |
| **Player Character**     | Biography Appearance  |
| **Non-player Character** | Notes Description     |
| **Army**                 | Description           |
| **Familiar**             | Creature Type         |
| **Hazard**               | Description           |
| **Loot**                 | Text entry area       |
| **Party**                | List of party members |
| **Vehicle**              | Description           |

### Powered by the Apocalypse

[Powered by the Apocalpypse](https://foundryvtt.com/packages/pbta)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_pbta.jpg?raw=true)

| Actor Type    | Note Location |
| ------------- | ------------- |
| **Character** | Biography     |
| **NPC**       | Bio           |

### RuneQuest Glorantha

[RuneQuest Glorantha](https://foundryvtt.com/packages/rqg)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_rqg.jpg?raw=true)

| Actor Type | Note Location  |
| ---------- | -------------- |
| **Actor**  | Allies & Notes |

### Savage Worlds Adventure Edition

[Savage Worlds Adventure Edition](https://foundryvtt.com/packages/swade)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_swade.jpg?raw=true)

| Actor Type               | Note Location |
| ------------------------ | ------------- |
| **Player Character**     | About - Notes |
| **Non-Player Character** | Description   |
| **Group**                | Description   |
| **Vehicle**              | Description   |

### Shadowdark

[Shadowdark RPG](https://foundryvtt.com/packages/shadowdark)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_shadowdark.jpg?raw=true)

| Actor Type | Note Location   |
| ---------- | --------------- |
| **Player** | Character Notes |
| **NPC**    | Description     |

### Simple Worldbuilding System

[Simple Worldbuilding System](https://foundryvtt.com/packages/worldbuilding)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_simple.jpg?raw=true)

| Actor Type | Note Location |
| ---------- | ------------- |
| **Actor**  | Description   |

### Starfinder 1st Edition

[Starfinder 1st Edition](https://foundryvtt.com/packages/sfrpg)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_sfrpg.jpg?raw=true)

| Actor Type               | Note Location        |
| ------------------------ | -------------------- |
| **Player Character**     | Biography & GM Notes |
| **Drone**                | Biography & GM Notes |
| **Hazard**               | Notes                |
| **Non-Player Character** | Biography & GM Notes |
| **Old-Style NPC**        | Biography & GM Notes |
| **Starship**             | Notes                |
| **Vehicle**              | Notes                |

### Tormenta20

[Tormenta20](https://foundryvtt.com/packages/tormenta20)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_tormenta20.jpg?raw=true)

| Actor Type                | Note Location |
| ------------------------- | ------------- |
| **Ameaça**                | Diário        |
| **Base**                  | Descrição     |
| **Perigo Complexo**       | Objetivo      |
| **Personagem do Mestre**  | Diário        |
| **Personagem de Jogador** | Biografia     |

### Twodsix - Cepheus & Traveller

[Twodsix - Cepheus & Traveller](https://foundryvtt.com/packages/twodsix)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_twodsix.jpg?raw=true)

| Actor Type       | Note Location   |
| ---------------- | --------------- |
| **Traveller**    | Character Notes |
| **Animal**       | Animal Notes    |
| **Robot**        | Robot Notes     |
| **Ship**         | Ship Notes      |
| **Space Object** | Notes           |
| **Vehicle**      | Cargo Notes     |

### Warhammer 40,000 Roleplay: Wrath & Glory

[Warhammer 40,000 Roleplay: Wrath & Glory](https://foundryvtt.com/packages/wrath-and-glory)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_wrath-and-glory.jpg?raw=true)

| Actor Type  | Note Location |
| ----------- | ------------- |
| **Agent**   | Notes         |
| **Threat**  | Notes         |
| **Vehicle** | Notes         |

### Warhammer Fantasy Roleplay 4th Edition

[Warhammer Fantasy Roleplay 4th Edition](https://foundryvtt.com/packages/wfrp4e)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_wfrp4e.jpg?raw=true)

| Actor Type               | Note Location                        |
| ------------------------ | ------------------------------------ |
| **Player Character**     | Notes - Biography & GM Notes         |
| **Non-Player Character** | Notes - Biography & GM Notes         |
| **Creature**             | Notes - Biography & GM Notes         |
| **Vehicle**              | Description - Description & GM Notes |

### World of Darkness 20th edition

[World of Darkness 20th edition](https://foundryvtt.com/packages/worldofdarkness)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_worldofdarkness.jpg?raw=true)

| Actor Type     | Note Location |
| -------------- | ------------- |
| **All Actors** | Appearance    |

### World of Darkness 5e

[World of Darkness 5e (Archive)](https://foundryvtt.com/packages/vtm5e)
[World of Darkness 5e](https://foundryvtt.com/packages/wod5e)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_vtm5e.jpg?raw=true)

| Actor Type          | Note Location                            |
| ------------------- | ---------------------------------------- |
| **Ghoul**           | Notes - Public Notes & Private Notes     |
| **Group**           | Notes - Public Notes & Storyteller Notes |
| **Hunter**          | Notes - Public Notes & Private Notes     |
| **Mortal**          | Notes - Public Notes & Private Notes     |
| **Story Character** | Notes - Public Notes & Private Notes     |
| **Vampire**         | Notes - Public Notes & Private Notes     |
| **Werewolf**        | Notes - Public Notes & Private Notes     |

## Support

For questions, feature requests or bug reports, please open an [issue](https://github.com/jendave/token-note-hover/issues).

[Pull requests](https://github.com/jendave/token-note-hover/pulls) are welcome. Please include a reason for the request or create an issue before starting one.

## Troubleshooting and Tips

* If the hover does not work or causes the sidebar to move unexpectedly try the following:
  * In the `Configure Settings`, uncheck the `Hover Enabled` box, reload the screen, then re-check the `Hover Enabled` box.
  * Try uninstalling and re-installing the module.
* The Token Note will not display if the token is selected or showing a HUD.
  * This ensures the note does not display when the token is being used to show other attributes.
  * In the `Configure Settings` dialog, enable the `Core` setting checkbox for `Left-Click to Release Objects` to de-select objects easily.

## Credits

Module by David Hudson and licensed for use under the [GNU GPL license v3](https://opensource.org/license/gpl-3-0).

This project is based on [Pin Cushion](https://github.com/p4535992/foundryvtt-pin-cushion) by [4535992](https://github.com/p4535992).

### Contributors

* [Syrious](https://github.com/Syrious) - [Level Up: Advanced 5th Edition](https://foundryvtt.com/packages/a5e) system and code refactoring.
* [DanButcher45](https://github.com/DanButcher45) - [Cairn](https://foundryvtt.com/packages/cairn) system.
* [bithr](https://github.com/bithir) - API code.

## FoundryVTT Modules and Other Resources

Please check out my other modules and resources for Ironsworn, Ironsworn: Starforged and other systems.

### [FoundryVTT](https://foundryvtt.com/community/david-hudson/packages) Modules

* [Starforged Custom Compendiums](https://foundryvtt.com/packages/starforged-custom-oracles)
* [Starsmith Compendiums for Ironsworn: Starforged](https://foundryvtt.com/packages/starsmith-expanded-oracles)
* [Ironsmith Expanded Oracles for Ironsworn](https://foundryvtt.com/packages/ironsmith-expanded-oracles)
* [Augmented Reality Cyberpunk City Kit](https://foundryvtt.com/packages/augmented-reality-foundry)
* [Token Note Hover](https://github.com/jendave/token-note-hover)
* [Token Action HUD Ironsworn](https://foundryvtt.com/packages/token-action-hud-ironsworn)
* [VOID 1680 AM for FoundryVTT](https://foundryvtt.com/packages/void-1680-am)
* [Ancient Wonders](https://foundryvtt.com/packages/ancient-wonders)
* [Rise & Shiningstar - An Adventure for Ironsworn: Starforged](https://foundryvtt.com/packages/rise-and-shining-star)
* [Roll Table Importer](https://foundryvtt.com/packages/roll-table-importer)

### [Itch.io](https://jendave.itch.io/) Resources

* [The City on the Breeze - Cyberpunk-inspired Oracle arrays](https://jendave.itch.io/the-city-on-the-breeze)
* [I'll Be Home for Life Day! - Star Wars Life Day Oracle](https://jendave.itch.io/ill-be-home-for-life-day)
* [Critical Success Oracles](https://jendave.itch.io/critical-success-oracles)
* [I Owe My Soul to the Company Planet Oracles](https://jendave.itch.io/i-owe-my-soul-to-the-company-planet)
* [Creature Rank Generator](https://jendave.itch.io/creature-rank-generator)
