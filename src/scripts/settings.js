import { TokenNoteHover } from "./apps/TokenNoteHover.js";
import CONSTANTS from "./constants.js";

export const registerSettings = function () {
  game.settings.registerMenu(CONSTANTS.MODULE_ID, "resetAllSettings", {
    name: `token-note-hover.SETTINGS.reset.name`,
    hint: `token-note-hover.SETTINGS.reset.hint`,
    icon: "fas fa-coins",
    type: ResetSettingsDialog,
    restricted: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "forceToShowNotes", {
    name: `token-note-hover.SETTINGS.forceToShowNotesN`,
    hint: `token-note-hover.SETTINGS.forceToShowNotesH`,
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "previewMaxLength", {
    name: `token-note-hover.SETTINGS.PreviewMaxLengthN`,
    hint: `token-note-hover.SETTINGS.PreviewMaxLengthH`,
    scope: "world",
    type: Number,
    default: 500,
    config: true,
    onChange: (s) => {},
  });

  game.settings.register(CONSTANTS.MODULE_ID, "previewDelay", {
    name: `token-note-hover.SETTINGS.PreviewDelayN`,
    hint: `token-note-hover.SETTINGS.PreviewDelayH`,
    scope: "world",
    type: Number,
    default: 500,
    config: true,
    onChange: (s) => {},
    //@ts-ignore
    range: { min: 100, max: 3000, step: 100 },
  });

  // game.settings.register(CONSTANTS.MODULE_ID, "enableBackgroundlessPins", {
  //   name: `token-note-hover.SETTINGS.EnableBackgroundlessPinsN`,
  //   hint: `token-note-hover.SETTINGS.EnableBackgroundlessPinsH`,
  //   scope: "world",
  //   type: Boolean,
  //   default: true,
  //   config: true,
  // });

  game.settings.register(CONSTANTS.MODULE_ID, "showJournalImageByDefault", {
    name: `token-note-hover.SETTINGS.ShowJournalImageByDefaultN`,
    hint: `token-note-hover.SETTINGS.ShowJournalImageByDefaultH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableTooltipByDefault", {
    name: `token-note-hover.SETTINGS.enableTooltipByDefaultN`,
    hint: `token-note-hover.SETTINGS.enableTooltipByDefaultH`,
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableAutoScaleNamePlatesNote", {
    name: `token-note-hover.SETTINGS.enableAutoScaleNamePlatesNoteN`,
    hint: `token-note-hover.SETTINGS.enableAutoScaleNamePlatesNoteH`,
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableDragNoteOnTokenLayerIfGM", {
    name: `token-note-hover.SETTINGS.enableDragNoteOnTokenLayerIfGMN`,
    hint: `token-note-hover.SETTINGS.enableDragNoteOnTokenLayerIfGMH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerIconAutoOverride", {
    name: `token-note-hover.SETTINGS.PlayerIconAutoOverrideN`,
    hint: `token-note-hover.SETTINGS.PlayerIconAutoOverrideH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerIconPathDefault", {
    name: `token-note-hover.SETTINGS.PlayerIconPathDefaultN`,
    hint: `token-note-hover.SETTINGS.PlayerIconPathDefaultH`,
    scope: "world",
    config: true,
    default: "icons/svg/book.svg",
    type: String,
    filePicker: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "noteGM", {
    name: `token-note-hover.SETTINGS.noteGMN`,
    hint: `token-note-hover.SETTINGS.noteGMH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotes", {
    name: `token-note-hover.SETTINGS.revealedNotesN`,
    hint: `token-note-hover.SETTINGS.revealedNotesH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorLink", {
    name: `token-note-hover.SETTINGS.revealedNotesTintColorLinkN`,
    hint: `token-note-hover.SETTINGS.revealedNotesTintColorLinkH`,
    scope: "world",
    type: String,
    default: "#7CFC00",
    config: true,
    onChange: () => {
      if (canvas?.ready) {
        canvas.notes.placeables.forEach((note) => note.draw());
        //for (let note of canvas.notes.objects) note.draw();
      }
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorNotLink", {
    name: `token-note-hover.SETTINGS.revealedNotesTintColorNotLinkN`,
    hint: `token-note-hover.SETTINGS.revealedNotesTintColorNotLinkH`,
    scope: "world",
    type: String,
    default: "#c000c0",
    config: true,
    onChange: () => {
      if (canvas?.ready) {
        canvas.notes.placeables.forEach((note) => note.draw());
        //for (let note of canvas.notes.objects) note.draw();
      }
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorRevealed", {
    name: `token-note-hover.SETTINGS.revealedNotesTintColorRevealedN`,
    hint: `token-note-hover.SETTINGS.revealedNotesTintColorRevealedH`,
    scope: "world",
    type: String,
    default: "#ffff00",
    config: true,
    onChange: () => refresh(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorNotRevealed", {
    name: `token-note-hover.SETTINGS.revealedNotesTintColorNotRevealedN`,
    hint: `token-note-hover.SETTINGS.revealedNotesTintColorNotRevealedH`,
    scope: "world",
    type: String,
    default: "#ff0000",
    config: true,
    onChange: () => refresh(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalThumbnailForGMs", {
    name: `token-note-hover.SETTINGS.enableJournalThumbnailForGMsN`,
    hint: `token-note-hover.SETTINGS.enableJournalThumbnailForGMsH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onchange: () => window.location.reload(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalThumbnailForPlayers", {
    name: `token-note-hover.SETTINGS.enableJournalThumbnailForPlayersN`,
    hint: `token-note-hover.SETTINGS.enableJournalThumbnailForPlayersH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onchange: () => window.location.reload(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "journalThumbnailPosition", {
    name: `token-note-hover.SETTINGS.journalThumbnailPositionN`,
    hint: `token-note-hover.SETTINGS.journalThumbnailPositionH`,
    scope: "world",
    config: true,
    default: "right",
    type: String,
    choices: {
      right: "Right",
      left: "Left",
    },
    onChange: () => game.journal.render(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "fontSize", {
    name: `token-note-hover.SETTINGS.fontSizeN`,
    hint: `token-note-hover.SETTINGS.fontSizeH`,
    scope: "client",
    type: String,
    default: "",
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "maxWidth", {
    name: `token-note-hover.SETTINGS.maxWidthN`,
    hint: `token-note-hover.SETTINGS.maxWidthH`,
    scope: "client",
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "tooltipUseMousePositionForCoordinates", {
    name: `token-note-hover.SETTINGS.tooltipUseMousePositionForCoordinatesN`,
    hint: `token-note-hover.SETTINGS.tooltipUseMousePositionForCoordinatesH`,
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  // DEPRECATED ON V11
  //   game.settings.register(CONSTANTS.MODULE_ID, "oneClickNoteCreation", {
  //     name: `token-note-hover.SETTINGS.oneClickNoteCreationN`,
  //     hint: `token-note-hover.SETTINGS.oneClickNoteCreationH`,
  //     scope: "world",
  //     config: true,
  //     default: false,
  //     type: Boolean,
  //   });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalAnchorLink", {
    name: `token-note-hover.SETTINGS.enableJournalAnchorLinkN`,
    hint: `token-note-hover.SETTINGS.enableJournalAnchorLinkH`,
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalDirectoryPages", {
    name: `token-note-hover.SETTINGS.enableJournalDirectoryPagesN`,
    hint: `token-note-hover.SETTINGS.enableJournalDirectoryPagesH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  // ============================================
  // Pin Players Default
  // =============================================

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsEnabled", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.enableN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.enableH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsGlobal", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.globalN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.globalH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsPinImage", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.pinImageN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.pinImageH`,
    scope: "world",
    config: true,
    type: String,
    default: "",
    filePicker: "imagevideo",
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsPlayerColorImage", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.playerColorImageN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.playerColorImageH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsPlayerToken", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.playerTokenN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.playerTokenH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsImageSize", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.imageSizeN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.imageSizeH`,
    scope: "world",
    config: true,
    type: Number,
    default: 100,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsFontSize", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.fontSizeN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.fontSizeH`,
    scope: "world",
    config: true,
    type: Number,
    default: 32,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsAnchorPoint", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.anchorPointN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.anchorPointH`,
    scope: "world",
    config: true,
    type: Number,
    default: 1,
    choices: {
      0: "Center",
      1: "Bottom",
      2: "Top",
      3: "Left",
      4: "Right",
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsAddPlayerName", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.addPlayerNameN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.addPlayerNameH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsPlayerColorText", {
    name: `token-note-hover.SETTINGS.playerPinDefaults.playerColorTextN`,
    hint: `token-note-hover.SETTINGS.playerPinDefaults.playerColorTextH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "debug", {
    name: `token-note-hover.SETTINGS.debugN`,
    hint: `token-note-hover.SETTINGS.debugH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
};
class ResetSettingsDialog extends FormApplication {
  constructor(...args) {
    //@ts-ignore
    super(...args);
    //@ts-ignore
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.title`),
      content:
        '<p style="margin-bottom:1rem;">' +
        game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.content`) +
        "</p>",
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.confirm`),
          callback: async () => {
            const worldSettings = game.settings.storage
              ?.get("world")
              ?.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_ID}.`));
            for (let setting of worldSettings) {
              console.log(`Reset setting '${setting.key}'`);
              await setting.delete();
            }
            //window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.cancel`),
        },
      },
      default: "cancel",
    });
  }
  async _updateObject(event, formData) {
    // do nothing
  }
}
