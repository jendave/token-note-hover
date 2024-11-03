# Changelog

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
