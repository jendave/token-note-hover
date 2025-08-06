# Token Note Hover

![GitHub all releases](https://img.shields.io/github/downloads/jendave/token-note-hover/total)
[![Latest Version](https://img.shields.io/github/v/release/jendave/token-note-hover?display_name=tag&sort=semver&label=Latest%20Version)](https://github.com/jendave/token-note-hover/releases/latest)
![Foundry Version](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjendave%2Ftoken-note-hover%2Fmain%2Fsrc%2Fmodule.json)
[![License](https://img.shields.io/github/license/jendave/token-note-hover)](LICENSE)

## Features and Notes

The `Token Note Hover` module displays the note of a hovered-over token in a tooltip. Links, images and scrolling in the tooltip are supported.

The tooltip will not display if the note is empty or while the token is being dragged.

## FoundryVTT Compatibility

* [Token Note Hover](https://foundryvtt.com/packages/token-note-hover) 3.0.0 and above only run on [FoundryVTT v13](https://foundryvtt.com/releases/13.338).
* [Token Note Hover](https://foundryvtt.com/packages/token-note-hover) 2.1.17 and below only run on [FoundryVTT v12](https://foundryvtt.com/releases/12.331).

### Supported Systems

* [Call of Cthulhu 7th edition](https://foundryvtt.com/packages/CoC7). FoundryVTT v12 and v13.
* [Cypher System](https://foundryvtt.com/packages/cyphersystem). FoundryVTT v13.
* [D&D 5E](https://foundryvtt.com/packages/dnd5e). FoundryVTT v12 and v13.
* [Das Schwarze Auge / The Dark Eye (5th Edition)](https://foundryvtt.com/packages/dsa5). FoundryVTT v12 and v13.
* [Ironsworn/Starforged](https://foundryvtt.com/packages/foundry-ironsworn). FoundryVTT v12 and v13.
* [Level Up: Advanced 5th Edition](https://foundryvtt.com/packages/a5e). FoundryVTT v12 only.
* [Pathfinder 1](https://foundryvtt.com/packages/pf1). FoundryVTT v13.
* [Pathfinder 2e](https://foundryvtt.com/packages/pf2e). FoundryVTT v12 and v13.
* [RuneQuest Glorantha](https://foundryvtt.com/packages/rqg). FoundryVTT v12 and v13.
* [Savage Worlds Adventure Edition](https://foundryvtt.com/packages/swade). FoundryVTT v13.
* [Simple Worldbuilding System](https://foundryvtt.com/packages/worldbuilding). FoundryVTT v12 and v13.
* [Starfinder 1st Edition](https://foundryvtt.com/packages/sfrpg). FoundryVTT v12 and v13.
* [Twodsix - Cepheus & Traveller](https://foundryvtt.com/packages/twodsix). FoundryVTT v12 and v13.
* [Warhammer Fantasy Roleplay 4th Edition](https://foundryvtt.com/packages/wfrp4e). FoundryVTT v13.
* [World of Darkness 5e](https://foundryvtt.com/packages/vtm5e). FoundryVTT v13.

### Some customization options

* Tooltip themes
* Placement, display delay, display window size and font size customization
* Note can appear adjacent to the token or in a corner of the screen.
* Enable/Disable notes for PCs and NPCs.
* Show/hide note images for tooltip display
* Can require minimum token ownership level on notes for display
* Display token title in tooltip

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

### Call of Cthulhu 7th edition

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_cthulhu.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Character** | Backstory |
| **Container** | Description |
| **Creature** | Notes |
| **NPC** | Notes |

### Cypher System

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_cyphersystem.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Community** | Notes |
| **Companion** | Notes |
| **Marker** | Notes |
| **NPC/Creature** | Notes |
| **PC** | Notes & GM Notes |
| **Vehicle** | Notes |

### D&D 5E

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_dnd5e.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | Biography |
| **Non-player Character** | Biography Public |
| **Group** | Description |
| **Vehicle** | Description |

### Das Schwarze Auge / The Dark Eye (5th Edition)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_dsa5.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Character** | Notes |
| **Creature** | Description |
| **Non-Player Character** | Notes |

### Ironsworn/Starforged

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_ironsworn.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Character** | Notes |
| **Shared Sheet** | Notes |
| **NPC** | Text entry area |
| **Starship** | Notes |
| **Location** | Text entry area |

### Level Up: Advanced 5th Edition

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_a5e.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | Notes |
| **Non-Player Character** | Notes & Private Notes (GM only) |

### Pathfinder 1st Edition

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_pf1.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | Notes |
| **Haunt** | Notes |
| **Trap** | Notes |
| **Non-Player Character** | Notes |
| **Vehicle** | Notes |

### Pathfinder 2e

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_pf2e.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | Biography Appearance |
| **Non-player Character** | Notes Description |
| **Army** | Description |
| **Familiar** | Creature Type |
| **Hazard** | Description |
| **Loot** | Text entry area |
| **Party** | List of party members |
| **Vehicle** | Description |

### RuneQuest Glorantha

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_rqg.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Actor** | Allies & Notes |

### Savage Worlds Adventure Edition

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_swade.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | About - Notes |
| **Non-Player Character** | Description |
| **Group** | Description |
| **Vehicle** | Description |

### Simple Worldbuilding System

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_simple.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Actor** | Description |

### Starfinder 1st Edition

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_sfrpg.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | Biography & GM Notes |
| **Drone** | Biography & GM Notes |
| **Hazard** | Notes |
| **Non-Player Character** | Biography & GM Notes|
| **Old-Style NPC** | Biography & GM Notes |
| **Starship** | Notes |
| **Vehicle** | Notes |

### Twodsix - Cepheus & Traveller

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_twodsix.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Traveller** | Character Notes |
| **Animal** | Animal Notes |
| **Robot** | Robot Notes |
| **Ship** | Ship Notes |
| **Space Object** | Notes |
| **Vehicle** | Cargo Notes |

### Warhammer Fantasy Roleplay 4th Edition

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_wfrp4e.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | Notes - Biography & GM Notes |
| **Non-Player Character** | Notes - Biography & GM Notes |
| **Creature** | Notes - Biography & GM Notes |
| **Vehicle** | Description - Description & GM Notes |

### World of Darkness 5e

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_vtm5e.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Ghoul** | Notes - Public Notes & Private Notes |
| **Group** | Notes - Public Notes & Storyteller Notes |
| **Hunter** | Notes - Public Notes & Private Notes |
| **Mortal** | Notes - Public Notes & Private Notes |
| **Story Character** | Notes - Public Notes & Private Notes |
| **Vampire** | Notes - Public Notes & Private Notes |
| **Werewolf** | Notes - Public Notes & Private Notes |

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

* [Syrious](https://github.com/Syrious) - Level Up A5E system and code refactoring.

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

### [Itch.io](https://jendave.itch.io/) Resources

* [The City on the Breeze - Cyberpunk-inspired Oracle arrays](https://jendave.itch.io/the-city-on-the-breeze)
* [I'll Be Home for Life Day! - Star Wars Life Day Oracle](https://jendave.itch.io/ill-be-home-for-life-day)
* [Critical Success Oracles](https://jendave.itch.io/critical-success-oracles)
* [I Owe My Soul to the Company Planet Oracles](https://jendave.itch.io/i-owe-my-soul-to-the-company-planet)
* [Creature Rank Generator](https://jendave.itch.io/creature-rank-generator)
