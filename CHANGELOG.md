# Changelog

[Token Note Hover](https://foundryvtt.com/packages/token-note-hover)

## [3.0.1](https://github.com/jendave/token-note-hover/commits/main) (2025-04-14)

* Small updates.

## [3.0.0](https://github.com/jendave/token-note-hover/commits/main) (2025-03-19)

* Updated for [FoundryVTT v13](https://foundryvtt.com/releases/13.338)
* [Token Note Hover](https://foundryvtt.com/packages/token-note-hover) 3.x only runs on [FoundryVTT v13](https://foundryvtt.com/releases/13.338).

## [2.1.16](https://github.com/jendave/token-note-hover/commits/main) (2025-04-14)

* Added support for [Das Schwarze Auge / The Dark Eye (5th Edition)](https://foundryvtt.com/packages/dsa5).

## [2.1.15](https://github.com/jendave/token-note-hover/commits/main) (2025-02-26)

* Adjust module maximum compatibility for v12 only.
* [Token Note Hover](https://foundryvtt.com/packages/token-note-hover) 2.x only runs on [FoundryVTT v12](https://foundryvtt.com/releases/12.331).

## [2.1.14](https://github.com/jendave/token-note-hover/commits/main) (2025-01-20)

* [Pull Request](https://github.com/jendave/token-note-hover/pull/16) from [Syrious](https://github.com/Syrious)
  * Notes no longer display if they are empty.

## [2.1.13](https://github.com/jendave/token-note-hover/commits/main) (2025-01-20)

* [Pull Request](https://github.com/jendave/token-note-hover/pull/15) from [Syrious](https://github.com/Syrious)
  * Added support for [Level Up: Advanced 5th Edition](https://foundryvtt.com/packages/a5e).
  * Refactored all systems into their own files.

## [2.1.12](https://github.com/jendave/token-note-hover/commits/main) (2025-01-14)

* Added support for [RuneQuest Glorantha](https://foundryvtt.com/packages/rqg).

## [2.1.11](https://github.com/jendave/token-note-hover/commits/main) (2024-12-02)

* Added Location Type for Ironsworn/Starforged.

## [2.1.10](https://github.com/jendave/token-note-hover/commits/main) (2024-11-25)

* Added better error handling of missing fields

## [2.1.9](https://github.com/jendave/token-note-hover/commits/main) (2024-11-18)

* Fixed issues with D&D 5E and Pathfinder 2e notes.
* Added documentation for the location of the notes for each actor token.

## [2.1.8](https://github.com/jendave/token-note-hover/commits/main) (2024-11-03)

* Fix initialization error.

## [2.1.7](https://github.com/jendave/token-note-hover/commits/main) (2024-11-03)

* Fix warning.

## [2.1.6](https://github.com/jendave/token-note-hover/commits/main) (2024-10-02)

* Fix bug with `Phosphor` theme text color.

## [2.1.5](https://github.com/jendave/token-note-hover/commits/main) (2024-09-29)

* Added support for [Ironsworn/Starforged](https://foundryvtt.com/packages/foundry-ironsworn) `Oceanic` theme.

## [2.1.4](https://github.com/jendave/token-note-hover/commits/main) (2024-09-28)

* Fixed formatting for notes on [Call of Cthulhu 7th edition](https://foundryvtt.com/packages/CoC7) characters. This required slightly increasing the size of the title on the note.
* Attempt to fix `moving sidebar` issue.

## [2.1.3](https://github.com/jendave/token-note-hover/commits/main) (2024-09-25)

* Added support for:
  * [Call of Cthulhu 7th edition](https://foundryvtt.com/packages/CoC7).
  * [Simple Worldbuilding System](https://foundryvtt.com/packages/worldbuilding).

## [2.1.2](https://github.com/jendave/token-note-hover/commits/main) (2024-09-22)

* Note won't display when the token is displaying a HUD or is controlled/clicked.

## [2.1.1](https://github.com/jendave/token-note-hover/commits/main) (2024-06-22)

* Remove [Zoom/Pan Options](https://foundryvtt.com/packages/zoom-pan-options) from `recommended` in module.json. It was causing confusion.

## [2.1.0](https://github.com/jendave/token-note-hover/commits/main) (2024-06-21)

* The tooltip will now close when the pointer is not hovering over the token nor the tooltip. Previously, the tooltip would only close if the pointer hovered the tooltip, then moved off.
* The delay for the opening and closing of the tooltip can be adjusted.

## [2.0.3](https://github.com/jendave/token-note-hover/commits/main) (2024-06-21)

* Added support for [Twodsix - Cepheus & Traveller](https://foundryvtt.com/packages/twodsix).

## [2.0.2](https://github.com/jendave/token-note-hover/commits/main) (2024-06-20)

* Added setting to enable token title on tooltip.

## [2.0.1](https://github.com/jendave/token-note-hover/commits/main) (2024-06-19)

* Added support for [Pathfinder 2e](https://foundryvtt.com/packages/pf2e).

## [2.0.0](https://github.com/jendave/token-note-hover/commits/main) (2024-06-18)

* New Features and Changes
  * Complete re-write using [Pin Cushion Module](https://github.com/p4535992/foundryvtt-pin-cushion) as a foundation. As a result, the LICENSE has been changed to the GPLv3.
  * Supports [D&D 5E](https://foundryvtt.com/packages/dnd5e) and [Ironsworn/Starforged](https://foundryvtt.com/packages/foundry-ironsworn).
  * Interaction with the tooltip - clicking on links, scrolling text
  * Adjust placement of tooltips relative to token
  * Tooltip themes
  * Hide images for tooltip display
  * Require token ownership level to display tooltips

## [1.0.4](https://github.com/jendave/token-note-hover/commits/main) (2024-06-01)

* Verified for FoundryVTT v12.

## [1.0.3](https://github.com/jendave/token-note-hover/commits/main) (2024-03-24)

* Added setting to delay the token note display.

## [1.0.2](https://github.com/jendave/token-note-hover/commits/main) (2024-03-22)

* Updated development and build process. Using vite.

## [1.0.1](https://github.com/jendave/token-note-hover/commits/main) (2024-03-14)

* Minor update.
  * Fixed deprecated warnings for method calls.
  * Tweaked position slightly so it does not cover up the token.

## [1.0.0](https://github.com/jendave/token-note-hover/commits/main) (2024-01-19)

* Initial release.
