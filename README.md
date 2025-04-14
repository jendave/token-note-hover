# Token Note Hover

![GitHub all releases](https://img.shields.io/github/downloads/jendave/token-note-hover/total)
[![Latest Version](https://img.shields.io/github/v/release/jendave/token-note-hover?display_name=tag&sort=semver&label=Latest%20Version)](https://github.com/jendave/token-note-hover/releases/latest)
![Foundry Version](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjendave%2Ftoken-note-hover%2Fmain%2Fsrc%2Fmodule.json)
[![License](https://img.shields.io/github/license/jendave/token-note-hover)](LICENSE)

## Features and Notes

The `Token Note Hover` module displays the note of a hovered-over token in a tooltip. Links, images and scrolling in the tooltip are supported.

The tooltip will not display if the note is empty or while the token is being dragged.

### Supported Systems

* [Ironsworn/Starforged](https://foundryvtt.com/packages/foundry-ironsworn)
* [D&D 5E](https://foundryvtt.com/packages/dnd5e)
* [Pathfinder 2e](https://foundryvtt.com/packages/pf2e)
* [Twodsix - Cepheus & Traveller](https://foundryvtt.com/packages/twodsix)
* [Call of Cthulhu 7th edition](https://foundryvtt.com/packages/CoC7)
* [Simple Worldbuilding System](https://foundryvtt.com/packages/worldbuilding)
* [RuneQuest Glorantha](https://foundryvtt.com/packages/rqg)
* [Level Up: Advanced 5th Edition](https://foundryvtt.com/packages/a5e)
* [Das Schwarze Auge / The Dark Eye (5th Edition)](https://foundryvtt.com/packages/dsa5)

### Some customization options

* Tooltip themes (Ironsworn/Starforged only)
* Placement, display delay, display window size and font size customization
* Show/hide note images for tooltip display
* Can require minimum token ownership level on notes for display
* Display token title in tooltip

All settings, except for `token ownership required` are client-side only so each player can enable the features they need.

## Contact

* [Ironsworn/Starforged Discord Server - FoundryVTT Channel](https://discord.com/channels/437120373436186625/867434336201605160) (jendave)
* [FoundryVTT Discord Server - Module Discussion Channel](https://discord.com/channels/170995199584108546/513918036919713802) (jendave)
* [GitHub Repository](https://github.com/jendave/token-note-hover)
* [Itch.io](https://jendave.itch.io/)

## Module Installation

To install the module, search for `Token Note Hover` in the `Add-On Modules` tab of of the Foundry VTT game setup screen. Then click on `Install`.

Or use this URL and click on `Install`:

```bash
https://github.com/jendave/token-note-hover/releases/latest/download/module.json
```

### Other Recommended Modules

* [Zoom/Pan Options](https://foundryvtt.com/packages/zoom-pan-options) for `Zoom Around Cursor` setting.
* [Lock View](https://foundryvtt.com/packages/LockView) to prevent zooming from affecting the tooltip placement.
  * Note that these two modules conflict with each other.

## Screenshots and Note Locations

### Ironsworn/Starforged

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_ironsworn.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Character** | Notes |
| **Shared Sheet** | Notes |
| **NPC** | Text entry area |
| **Starship** | Notes |
| **Location** | Text entry area |

### D&D 5E

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_dnd5e.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | Biography |
| **Non-player Character** | Biography Public |
| **Group** | Description |
| **Vehicle** | Description |

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

### Call of Cthulhu 7th edition

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_cthulhu.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Character** | Backstory |
| **Container** | Description |
| **Creature** | Notes |
| **NPC** | Notes |

### Simple Worldbuilding System

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_simple.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Actor** | Description |

### RuneQuest Glorantha

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_rqg.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Actor** | Allies & Notes |

### Level Up: Advanced 5th Edition

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_a5e.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Player Character** | Notes |
| **Non-Player Character** | Notes & Private Notes (GM only)|

### Das Schwarze Auge / The Dark Eye (5th Edition)

![Screenshot](https://github.com/jendave/token-note-hover/blob/main/docs/screenshot_dsa5.jpg?raw=true)

| Actor Type | Note Location |
| ------------- | ----------- |
| **Character** | Notes |
| **Creature** | Description |
| **Non-Player Character** | Notes|

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

* [Starforged Custom Oracles](https://foundryvtt.com/packages/starforged-custom-oracles)
* [Starsmith Compendiums for Ironsworn: Starforged](https://foundryvtt.com/packages/starsmith-expanded-oracles)
* [Ironsmith Expanded Oracles for Ironsworn](https://foundryvtt.com/packages/ironsmith-expanded-oracles)
* [Augmented Reality Cyberpunk City Kit](https://foundryvtt.com/packages/augmented-reality-foundry)
* [Token Note Hover](https://github.com/jendave/token-note-hover)
* [Token Action HUD Ironsworn](https://foundryvtt.com/packages/token-action-hud-ironsworn)

### [Itch.io](https://jendave.itch.io/) Resources

* [The City on the Breeze - Cyberpunk-inspired Oracle arrays](https://jendave.itch.io/the-city-on-the-breeze)
* [I'll Be Home for Life Day! - Star Wars Life Day Oracle](https://jendave.itch.io/ill-be-home-for-life-day)
* [Critical Success Oracles](https://jendave.itch.io/critical-success-oracles)
* [I Owe My Soul to the Company Planet Oracles](https://jendave.itch.io/i-owe-my-soul-to-the-company-planet)
* [Creature Rank Generator](https://jendave.itch.io/creature-rank-generator)
