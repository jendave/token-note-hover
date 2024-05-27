import CONSTANTS from './constants';

// class ResetSettingsDialog extends FormApplication {
//   constructor(...args) {
//     // @ts-ignore
//     super(...args);
//   }

//   static get reset() {
//     return new Dialog({
//       title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.dialogs.resetsettings.title`),
//       content: `<p style="margin-bottom:1rem;">${game.i18n.localize(
//         `${CONSTANTS.MODULE_ID}.SETTINGS.dialogs.resetsettings.content`,
//       )}</p>`,
//       buttons: {
//         confirm: {
//           icon: '<i class="fas fa-check"></i>',
//       label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.dialogs.resetsettings.confirm`),
//           callback: async () => {
//             const worldSettings = game.settings.storage
//               ?.get('world')
//               ?.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_ID}.`));
//             for (const setting of worldSettings) {
//               console.log(`Reset setting '${setting.key}'`);
//               await setting.delete();
//             }
//           },
//         },
//         cancel: {
//           icon: '<i class="fas fa-times"></i>',
//        label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.dialogs.resetsettings.cancel`),
//         },
//       },
//       default: 'cancel',
//     });
//   }

//   async _updateObject(event, formData) {
//     // do nothing
//   }
// }

function reload() {
  window.location.reload();
}

export default function registerSettings() {
  // game.settings.registerMenu(CONSTANTS.MODULE_ID, 'resetAllSettings', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.reset.name`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.reset.hint`,
  //   icon: 'fas fa-coins',
  //   type: ResetSettingsDialog.reset,
  //   restricted: true,
  // });

  game.settings.register(CONSTANTS.MODULE_ID, 'enabled', {
    name: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.Enabled.Name`),
    hint: game.i18n.localize(`${CONSTANTS.MODULE_ID}.SETTINGS.Enabled.Hint`),
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'forceToShowNotes', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.forceToShowNotesN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.forceToShowNotesH`,
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'previewDelay', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.PreviewDelayN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.PreviewDelayH`,
    scope: 'world',
    type: Number,
    default: 500,
    config: true,
    onChange: (s) => { },
    // @ts-ignore
    range: { min: 100, max: 3000, step: 100 },
  });

  // game.settings.register(CONSTANTS.MODULE_ID, 'showJournalImageByDefault', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.ShowJournalImageByDefaultN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.ShowJournalImageByDefaultH`,
  //   scope: 'world',
  //   type: Boolean,
  //   default: true,
  //   config: true,
  // });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipColor', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.Tooltip.Color.title`,
    hint: '',
    scope: 'world',
    config: true,
    type: String,
    default: 'Default',
    choices: {
      default: 'Default',
      blue: 'Blue',
      dark: 'Dark',
      green: 'Green',
      light: 'Light',
      orange: 'Orange',
      purple: 'Purple',
      red: 'Red',
      yellow: 'Yellow',
    },
  });

  // game.settings.register(CONSTANTS.MODULE_ID, 'enableAutoScaleNamePlatesNote', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.enableAutoScaleNamePlatesNoteN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.enableAutoScaleNamePlatesNoteH`,
  //   scope: 'world',
  //   type: Boolean,
  //   default: false,
  //   config: true,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'enableDragNoteOnTokenLayerIfGM', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.enableDragNoteOnTokenLayerIfGMN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.enableDragNoteOnTokenLayerIfGMH`,
  //   scope: 'world',
  //   type: Boolean,
  //   default: true,
  //   config: true,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerIconAutoOverride', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.PlayerIconAutoOverrideN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.PlayerIconAutoOverrideH`,
  //   scope: 'world',
  //   config: true,
  //   default: false,
  //   type: Boolean,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerIconPathDefault', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.PlayerIconPathDefaultN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.PlayerIconPathDefaultH`,
  //   scope: 'world',
  //   config: true,
  //   default: 'icons/svg/book.svg',
  //   type: String,
  //   filePicker: true,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'revealedNotes', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesH`,
  //   scope: 'world',
  //   config: true,
  //   default: false,
  //   type: Boolean,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'revealedNotesTintColorLink', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesTintColorLinkN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesTintColorLinkH`,
  //   scope: 'world',
  //   type: String,
  //   default: '#7CFC00',
  //   config: true,
  //   onChange: () => {
  //     if (canvas?.ready) {
  //       canvas.notes.placeables.forEach((note) => note.draw());
  //       // for (let note of canvas.notes.objects) note.draw();
  //     }
  //   },
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'revealedNotesTintColorNotLink', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesTintColorNotLinkN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesTintColorNotLinkH`,
  //   scope: 'world',
  //   type: String,
  //   default: '#c000c0',
  //   config: true,
  //   onChange: () => {
  //     if (canvas?.ready) {
  //       canvas.notes.placeables.forEach((note) => note.draw());
  //       // for (let note of canvas.notes.objects) note.draw();
  //     }
  //   },
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'revealedNotesTintColorRevealed', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesTintColorRevealedN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesTintColorRevealedH`,
  //   scope: 'world',
  //   type: String,
  //   default: '#ffff00',
  //   config: true,
  //   onChange: reload,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'revealedNotesTintColorNotRevealed', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesTintColorNotRevealedN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.revealedNotesTintColorNotRevealedH`,
  //   scope: 'world',
  //   type: String,
  //   default: '#ff0000',
  //   config: true,
  //   onChange: reload,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'enableJournalThumbnailForGMs', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.enableJournalThumbnailForGMsN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.enableJournalThumbnailForGMsH`,
  //   scope: 'world',
  //   type: Boolean,
  //   default: true,
  //   config: true,
  //   onchange: reload,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'enableJournalThumbnailForPlayers', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.enableJournalThumbnailForPlayersN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.enableJournalThumbnailForPlayersH`,
  //   scope: 'world',
  //   type: Boolean,
  //   default: true,
  //   config: true,
  //   onchange: reload,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'journalThumbnailPosition', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.journalThumbnailPositionN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.journalThumbnailPositionH`,
  //   scope: 'world',
  //   config: true,
  //   default: 'right',
  //   type: String,
  //   choices: {
  //     right: 'Right',
  //     left: 'Left',
  //   },
  //   onChange: reload,
  // });

  game.settings.register(CONSTANTS.MODULE_ID, 'fontSize', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.fontSizeN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.fontSizeH`,
    scope: 'client',
    type: String,
    default: '',
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'maxWidth', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.maxWidthN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.maxWidthH`,
    scope: 'client',
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, 'tooltipUseMousePositionForCoordinates', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.tooltipUseMousePositionForCoordinatesN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.tooltipUseMousePositionForCoordinatesH`,
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });

  // game.settings.register(CONSTANTS.MODULE_ID, 'enableJournalAnchorLink', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.enableJournalAnchorLinkN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.enableJournalAnchorLinkH`,
  //   scope: 'world',
  //   config: true,
  //   default: true,
  //   type: Boolean,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'enableJournalDirectoryPages', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.enableJournalDirectoryPagesN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.enableJournalDirectoryPagesH`,
  //   scope: 'world',
  //   config: true,
  //   default: false,
  //   type: Boolean,
  // });

  // ============================================
  // Pin Players Default
  // =============================================

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsEnabled', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.enableN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.enableH`,
  //   scope: 'world',
  //   config: true,
  //   default: false,
  //   type: Boolean,
  // });

  game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsGlobal', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.globalN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.globalH`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsPinImage', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.pinImageN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.pinImageH`,
  //   scope: 'world',
  //   config: true,
  //   type: String,
  //   default: '',
  //   filePicker: 'imagevideo',
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsPlayerColorImage', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.playerColorImageN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.playerColorImageH`,
  //   scope: 'world',
  //   config: true,
  //   type: Boolean,
  //   default: false,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsPlayerToken', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.playerTokenN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.playerTokenH`,
  //   scope: 'world',
  //   config: true,
  //   type: Boolean,
  //   default: false,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsImageSize', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.imageSizeN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.imageSizeH`,
  //   scope: 'world',
  //   config: true,
  //   type: Number,
  //   default: 100,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsFontSize', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.fontSizeN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.fontSizeH`,
  //   scope: 'world',
  //   config: true,
  //   type: Number,
  //   default: 32,
  // });

  game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsAnchorPoint', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.anchorPointN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.anchorPointH`,
    scope: 'world',
    config: true,
    type: Number,
    default: 1,
    choices: {
      0: 'Center',
      1: 'Bottom',
      2: 'Top',
      3: 'Left',
      4: 'Right',
    },
  });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsAddPlayerName', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.addPlayerNameN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.addPlayerNameH`,
  //   scope: 'world',
  //   config: true,
  //   type: Boolean,
  //   default: false,
  // });

  // game.settings.register(CONSTANTS.MODULE_ID, 'playerPinDefaultsPlayerColorText', {
  //   name: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.playerColorTextN`,
  //   hint: `${CONSTANTS.MODULE_ID}.SETTINGS.playerPinDefaults.playerColorTextH`,
  //   scope: 'world',
  //   config: true,
  //   type: Boolean,
  //   default: false,
  // });

  game.settings.register(CONSTANTS.MODULE_ID, 'debug', {
    name: `${CONSTANTS.MODULE_ID}.SETTINGS.debugN`,
    hint: `${CONSTANTS.MODULE_ID}.SETTINGS.debugH`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
}
