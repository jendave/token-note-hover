import CONSTANTS from "../constants";
import Logger from "../lib/Logger";
import { retrieveFirstImageFromJournalId, retrieveFirstTextFromJournalId } from "../lib/lib";
import { ElementWrapper } from "./token-note-hover-pixi-element-wrapper";

export class PinCushionPixiHelpers {
  static async drawTooltipPixi(note) {
    const journal = note.entry;
    let journalType = "";
    let pageType = "";
    if (journal) {
      journalType = PinCushionPixiHelpers._retrieveJournalTypeFromJournal(journal);
      pageType = PinCushionPixiHelpers._retrievePageTypeFromJournal(journal);
    }
    Logger.debug(`Journal type: ${journalType}`);
    Logger.debug(`Journal Page type: ${pageType}`);

    // Destroy any prior text
    if (note.tooltip) {
      note.removeChild(note.tooltip);
      note.tooltip = undefined;
    }

    // Create Element
    const wrappedEl = await PinCushionPixiHelpers.wrapElement(note);

    // Add child and return
    return (note.tooltip = note.addChild(wrappedEl));
  }

  static _retrievePageTypeFromJournal(journal) {
    let pageType = "";
    if (journal?.pages?.contents?.length > 0) {
      const journalPage0 = journal?.pages.contents[0];
      if (getProperty(journalPage0, `flags.monks-enhanced-journal.type`)) {
        pageType = getProperty(journalPage0, `flags.monks-enhanced-journal.type`);
      } else {
        pageType = journalPage0.type;
      }
    }
    return pageType;
  }

  static _retrieveJournalTypeFromJournal(journal) {
    let journalType = "";
    if (getProperty(journal, `flags.monks-enhanced-journal.pagetype`)) {
      journalType = getProperty(journal, `flags.monks-enhanced-journal.pagetype`);
    } else {
      journalType = journal.type;
    }
    return journalType;
  }

  static async wrapElement(note) {
    const data = await PinCushionPixiHelpers._manageContentHtmlFromNote(note);
    const contentHTML = await TextEditor.enrichHTML(data.contentTooltip);

    const fontSize = data.fontSize;
    const maxWidth = data.maxWidth;

    const container = $(
      `<aside class="token-note-hover-hud-container" 
                style="font-size:${fontSize}px; max-width:${maxWidth}px; opacity: 0; display: none;">
            </aside>`
    )[0];

    // create wrapped element
    const wrappedElement = new ElementWrapper(container, contentHTML, note);
    wrappedElement.anchorXY = 0;
    wrappedElement.visible = false;

    return wrappedElement;
  }

  static async _manageContentHtmlFromNote(note) {
    const data = deepClone(note);
    const entry = note.entry;
    let entryName = data.text;
    let entryIsOwner = true;
    let entryId = undefined;
    let entryIcon = data.texture?.src;
    let entryContent = data.text;
    if (entry) {
      entryName = entry.name;
      entryId = entry.id;
      entryIsOwner = entry.isOwner ?? true;
      entryIcon = retrieveFirstImageFromJournalId(entryId, note.page?.id, false);
      if (!entryIcon && data.icon) {
        entryIcon = data.icon;
      }
      entryContent = retrieveFirstTextFromJournalId(entryId, note.page?.id, false);
      if (!entryContent && data.text) {
        entryContent = data.text;
      }
    }
    // TODO The getFlag was returning as 'not a function', for whatever reason...
    // const showImage = note.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.SHOW_IMAGE);
    const showImage = getProperty(note.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.SHOW_IMAGE);
    const showImageExplicitSource = getProperty(
      note.document.flags[CONSTANTS.MODULE_ID],
      CONSTANTS.FLAGS.SHOW_IMAGE_EXPLICIT_SOURCE
    );
    const tooltipCustomDescription = getProperty(
      note.document.flags[CONSTANTS.MODULE_ID],
      CONSTANTS.FLAGS.TOOLTIP_CUSTOM_DESCRIPTION
    );

    let content;
    if (showImage) {
      const imgToShow = showImageExplicitSource ? showImageExplicitSource : entryIcon;
      if (imgToShow && imgToShow.length > 0) {
        content = await TextEditor.enrichHTML(`<img class='image' src='${imgToShow}' alt=''></img>`, {
          secrets: entryIsOwner,
          documents: true,
          async: true,
        });
      } else {
        content = await TextEditor.enrichHTML(`<img class='image' src='${CONSTANTS.PATH_TRANSPARENT}' alt=''></img>`, {
          secrets: entryIsOwner,
          documents: true,
          async: true,
        });
      }
    } else {
      if (!entry && tooltipCustomDescription) {
        const previewMaxLength = game.settings.get(CONSTANTS.MODULE_ID, "previewMaxLength");
        const textContent = tooltipCustomDescription;
        content =
          textContent.length > previewMaxLength ? `${textContent.substr(0, previewMaxLength)} ...` : textContent;
      } else {
        const previewTypeAsText = getProperty(
          note.document.flags[CONSTANTS.MODULE_ID],
          CONSTANTS.FLAGS.PREVIEW_AS_TEXT_SNIPPET
        );
        let firstContent = entryContent ?? "";
        // START Support for 'Journal Anchor Links' JAL
        if (note.document.entryId) {
          firstContent = firstContent.replaceAll(
            "@UUID[.",
            "@UUID[JournalEntry." + note.document.entryId + ".JournalEntryPage."
          );
          firstContent = firstContent.replaceAll(`data-uuid=".`, `data-uuid="JournalEntry."`);
        }
        // END Support for 'Journal Anchor Links' JAL
        if (!previewTypeAsText) {
          content = await TextEditor.enrichHTML(firstContent, {
            secrets: entryIsOwner,
            documents: true,
            async: true,
          });
        } else {
          const previewMaxLength = game.settings.get(CONSTANTS.MODULE_ID, "previewMaxLength");
          const textContent = $(firstContent).text();
          content =
            textContent.length > previewMaxLength ? `${textContent.substr(0, previewMaxLength)} ...` : textContent;
        }
      }
    }

    // START Support for 'Journal Anchor Links'
    if (note.document.entryId) {
      content = content.replaceAll("@UUID[.", "@UUID[JournalEntry." + note.document.entryId + ".JournalEntryPage.");
    }
    // END Support for 'Journal Anchor Links'

    let titleTooltip = entryName; // by default is the title of the journal
    const newtextGM = getProperty(note.document.flags[CONSTANTS.MODULE_ID], CONSTANTS.FLAGS.PIN_GM_TEXT);
    if (game.user.isGM && game.settings.get(CONSTANTS.MODULE_ID, "noteGM") && newtextGM) {
      titleTooltip = newtextGM;
    } else if (data.text && data.text !== titleTooltip) {
      titleTooltip = data.text;
    }

    let bodyPlaceHolder = `<img class='image' src='${CONSTANTS.PATH_TRANSPARENT}' alt=''></img>`;

    data.tooltipId = note.id;
    data.title = titleTooltip;
    data.body = bodyPlaceHolder;

    const fontSize = game.settings.get(CONSTANTS.MODULE_ID, "fontSize") || canvas.grid.size / 5;
    const maxWidth = game.settings.get(CONSTANTS.MODULE_ID, "maxWidth") || 400;

    data.titleTooltip = titleTooltip;
    data.content = content;
    data.fontSize = fontSize;
    data.maxWidth = maxWidth;

    const isTooltipShowTitleS = getProperty(
      note.document.flags[CONSTANTS.MODULE_ID],
      CONSTANTS.FLAGS.TOOLTIP_SHOW_TITLE
    );
    const isTooltipShowDescriptionS = getProperty(
      note.document.flags[CONSTANTS.MODULE_ID],
      CONSTANTS.FLAGS.TOOLTIP_SHOW_DESCRIPTION
    );

    const isTooltipShowTitle = String(isTooltipShowTitleS) === "true" ? true : false;
    const isTooltipShowDescription = String(isTooltipShowDescriptionS) === "true" ? true : false;
    data.contentTooltip = `
              ${isTooltipShowTitle ? `<div id="header"><h3>${titleTooltip}</h3></div><hr/>` : ``}
              ${isTooltipShowDescription ? `<div id="content">${content} </div>` : ``}
          `;
    return data;
  }
}
