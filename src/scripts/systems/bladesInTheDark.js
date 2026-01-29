import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";
import { processRawNotes } from "../textUtil.js";

export async function bladesInTheDark(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "🕛 clock":
            return await getClockNotes(displayImages, actor, actorIsOwner);
        case "crew":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "factions":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getFactionNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNPCNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getClockNotes(displayImages, actor, actorIsOwner) {
    return await processRawNotes(actor.system?.value + " / " + actor.system?.type, actorIsOwner, displayImages);
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    return await processRawNotes(actor.system?.description, actorIsOwner, displayImages);
}

async function getNPCNotes(displayImages, actor, actorIsOwner) {
    return await processRawNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getFactionNotes(displayImages, actor, actorIsOwner) {
    let factionNote = "";
    for (let i = 0; i < actor.items.contents.length; i += 1) {
        factionNote = factionNote.concat("<div class=\"token-note-hover-hud-h3\">");
        factionNote = factionNote.concat(actor.items.contents[i].name);
        factionNote = factionNote.concat("</div>");
        factionNote = factionNote.concat("<p>");
        factionNote = factionNote.concat(actor.items.contents[i].system.description);
        factionNote = factionNote.concat("</p>");
    }
    return await processNotes(factionNote, actorIsOwner, displayImages);
}
