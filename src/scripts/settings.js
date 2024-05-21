import { PinCushion } from "./apps/TokenNote.js";
import CONSTANTS from "./constants.js";

export const registerSettings = function () {
  game.settings.registerMenu(CONSTANTS.MODULE_ID, "resetAllSettings", {
    name: `token-note-hover-pin.SETTINGS.reset.name`,
    hint: `token-note-hover-pin.SETTINGS.reset.hint`,
    icon: "fas fa-coins",
    type: ResetSettingsDialog,
    restricted: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "forceToShowNotes", {
    name: `token-note-hover-pin.SETTINGS.forceToShowNotesN`,
    hint: `token-note-hover-pin.SETTINGS.forceToShowNotesH`,
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "previewMaxLength", {
    name: `token-note-hover-pin.SETTINGS.PreviewMaxLengthN`,
    hint: `token-note-hover-pin.SETTINGS.PreviewMaxLengthH`,
    scope: "world",
    type: Number,
    default: 500,
    config: true,
    onChange: (s) => {},
  });

  game.settings.register(CONSTANTS.MODULE_ID, "previewDelay", {
    name: `token-note-hover-pin.SETTINGS.PreviewDelayN`,
    hint: `token-note-hover-pin.SETTINGS.PreviewDelayH`,
    scope: "world",
    type: Number,
    default: 500,
    config: true,
    onChange: (s) => {},
    //@ts-ignore
    range: { min: 100, max: 3000, step: 100 }, // bug https://github.com/p4535992/foundryvtt-token-note-hover-pin/issues/18
  });

  game.settings.register(CONSTANTS.MODULE_ID, "defaultJournalPermission", {
    name: `token-note-hover-pin.SETTINGS.DefaultJournalPermissionN`,
    hint: `token-note-hover-pin.SETTINGS.DefaultJournalPermissionH`,
    scope: "world",
    type: Number,
    choices: Object.entries(CONST.DOCUMENT_PERMISSION_LEVELS).reduce((acc, [perm, key]) => {
      acc[key] = `token-note-hover-pin.SETTINGS.DefaultJournalPermission.PERMISSION.${perm}`;
      return acc;
    }, {}),
    default: 0,
    config: true,
    onChange: (s) => {},
  });

  game.settings.register(CONSTANTS.MODULE_ID, "defaultJournalFolder", {
    name: `token-note-hover-pin.SETTINGS.DefaultJournalFolderN`,
    hint: `token-note-hover-pin.SETTINGS.DefaultJournalFolderH`,
    scope: "world",
    type: String,
    choices: {
      none: `token-note-hover-pin.None`,
      perUser: `token-note-hover-pin.PerUser`,
      specificFolder: `token-note-hover-pin.PerSpecificFolder`,
    },
    default: "none",
    config: true,
    onChange: (s) => {
      // Only run check for folder creation for the main GM
      if (s === "perUser" && game.user === game.users.find((u) => u.isGM && u.active)) {
        PinCushion._createFolders();
      }
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "defaultNoteImageOnCreate", {
    name: `token-note-hover-pin.SETTINGS.defaultNoteImageOnCreateN`,
    hint: `token-note-hover-pin.SETTINGS.defaultNoteImageOnCreateH`,
    scope: "world",
    type: String,
    default: "",
    config: true,
    filePicker: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "specificFolder", {
    name: `token-note-hover-pin.SETTINGS.SpecificFolderN`,
    hint: `token-note-hover-pin.SETTINGS.SpecificFolderH`,
    scope: "world",
    type: String,
    choices: () => {
      const folders = game.journal.directory.folders.sort((a, b) => a.name.localeCompare(b.name));
      const arrObj = {};
      arrObj[""] = "Select a journal folder";
      Object.entries(folders).reduce((folder, [k, v]) => {
        folder[v.id] = v.name;
        arrObj[v.id] = v.name;
        return folder;
      }, {});
      return arrObj;
    },
    default: 0,
    config: true,
    onChange: (s) => {},
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableBackgroundlessPins", {
    name: `token-note-hover-pin.SETTINGS.EnableBackgroundlessPinsN`,
    hint: `token-note-hover-pin.SETTINGS.EnableBackgroundlessPinsH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "showJournalImageByDefault", {
    name: `token-note-hover-pin.SETTINGS.ShowJournalImageByDefaultN`,
    hint: `token-note-hover-pin.SETTINGS.ShowJournalImageByDefaultH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableTooltipByDefault", {
    name: `token-note-hover-pin.SETTINGS.enableTooltipByDefaultN`,
    hint: `token-note-hover-pin.SETTINGS.enableTooltipByDefaultH`,
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableAutoScaleNamePlatesNote", {
    name: `token-note-hover-pin.SETTINGS.enableAutoScaleNamePlatesNoteN`,
    hint: `token-note-hover-pin.SETTINGS.enableAutoScaleNamePlatesNoteH`,
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableDragNoteOnTokenLayerIfGM", {
    name: `token-note-hover-pin.SETTINGS.enableDragNoteOnTokenLayerIfGMN`,
    hint: `token-note-hover-pin.SETTINGS.enableDragNoteOnTokenLayerIfGMH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerIconAutoOverride", {
    name: `token-note-hover-pin.SETTINGS.PlayerIconAutoOverrideN`,
    hint: `token-note-hover-pin.SETTINGS.PlayerIconAutoOverrideH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerIconPathDefault", {
    name: `token-note-hover-pin.SETTINGS.PlayerIconPathDefaultN`,
    hint: `token-note-hover-pin.SETTINGS.PlayerIconPathDefaultH`,
    scope: "world",
    config: true,
    default: "icons/svg/book.svg",
    type: String,
    filePicker: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "noteGM", {
    name: `token-note-hover-pin.SETTINGS.noteGMN`,
    hint: `token-note-hover-pin.SETTINGS.noteGMH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotes", {
    name: `token-note-hover-pin.SETTINGS.revealedNotesN`,
    hint: `token-note-hover-pin.SETTINGS.revealedNotesH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorLink", {
    name: `token-note-hover-pin.SETTINGS.revealedNotesTintColorLinkN`,
    hint: `token-note-hover-pin.SETTINGS.revealedNotesTintColorLinkH`,
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
    name: `token-note-hover-pin.SETTINGS.revealedNotesTintColorNotLinkN`,
    hint: `token-note-hover-pin.SETTINGS.revealedNotesTintColorNotLinkH`,
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
    name: `token-note-hover-pin.SETTINGS.revealedNotesTintColorRevealedN`,
    hint: `token-note-hover-pin.SETTINGS.revealedNotesTintColorRevealedH`,
    scope: "world",
    type: String,
    default: "#ffff00",
    config: true,
    onChange: () => refresh(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorNotRevealed", {
    name: `token-note-hover-pin.SETTINGS.revealedNotesTintColorNotRevealedN`,
    hint: `token-note-hover-pin.SETTINGS.revealedNotesTintColorNotRevealedH`,
    scope: "world",
    type: String,
    default: "#ff0000",
    config: true,
    onChange: () => refresh(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalThumbnailForGMs", {
    name: `token-note-hover-pin.SETTINGS.enableJournalThumbnailForGMsN`,
    hint: `token-note-hover-pin.SETTINGS.enableJournalThumbnailForGMsH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onchange: () => window.location.reload(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalThumbnailForPlayers", {
    name: `token-note-hover-pin.SETTINGS.enableJournalThumbnailForPlayersN`,
    hint: `token-note-hover-pin.SETTINGS.enableJournalThumbnailForPlayersH`,
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onchange: () => window.location.reload(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "journalThumbnailPosition", {
    name: `token-note-hover-pin.SETTINGS.journalThumbnailPositionN`,
    hint: `token-note-hover-pin.SETTINGS.journalThumbnailPositionH`,
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
    name: `token-note-hover-pin.SETTINGS.fontSizeN`,
    hint: `token-note-hover-pin.SETTINGS.fontSizeH`,
    scope: "client",
    type: String,
    default: "",
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "maxWidth", {
    name: `token-note-hover-pin.SETTINGS.maxWidthN`,
    hint: `token-note-hover-pin.SETTINGS.maxWidthH`,
    scope: "client",
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "tooltipUseMousePositionForCoordinates", {
    name: `token-note-hover-pin.SETTINGS.tooltipUseMousePositionForCoordinatesN`,
    hint: `token-note-hover-pin.SETTINGS.tooltipUseMousePositionForCoordinatesH`,
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  // DEPRECATED ON V11
  //   game.settings.register(CONSTANTS.MODULE_ID, "oneClickNoteCreation", {
  //     name: `token-note-hover-pin.SETTINGS.oneClickNoteCreationN`,
  //     hint: `token-note-hover-pin.SETTINGS.oneClickNoteCreationH`,
  //     scope: "world",
  //     config: true,
  //     default: false,
  //     type: Boolean,
  //   });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalAnchorLink", {
    name: `token-note-hover-pin.SETTINGS.enableJournalAnchorLinkN`,
    hint: `token-note-hover-pin.SETTINGS.enableJournalAnchorLinkH`,
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalDirectoryPages", {
    name: `token-note-hover-pin.SETTINGS.enableJournalDirectoryPagesN`,
    hint: `token-note-hover-pin.SETTINGS.enableJournalDirectoryPagesH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  // ============================================
  // Pin Players Default
  // =============================================

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsEnabled", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.enableN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.enableH`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsGlobal", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.globalN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.globalH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsPinImage", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.pinImageN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.pinImageH`,
    scope: "world",
    config: true,
    type: String,
    default: "",
    filePicker: "imagevideo",
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsPlayerColorImage", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.playerColorImageN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.playerColorImageH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsPlayerToken", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.playerTokenN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.playerTokenH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsImageSize", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.imageSizeN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.imageSizeH`,
    scope: "world",
    config: true,
    type: Number,
    default: 100,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsFontSize", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.fontSizeN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.fontSizeH`,
    scope: "world",
    config: true,
    type: Number,
    default: 32,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsAnchorPoint", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.anchorPointN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.anchorPointH`,
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
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.addPlayerNameN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.addPlayerNameH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerPinDefaultsPlayerColorText", {
    name: `token-note-hover-pin.SETTINGS.playerPinDefaults.playerColorTextN`,
    hint: `token-note-hover-pin.SETTINGS.playerPinDefaults.playerColorTextH`,
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "debug", {
    name: `token-note-hover-pin.SETTINGS.debugN`,
    hint: `token-note-hover-pin.SETTINGS.debugH`,
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
