import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function cyberpunkRedCore(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "container":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getContainerNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "demon":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getDemonNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "blackIce":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getDemonNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "mook":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.information?.notes, actorIsOwner, displayImages);
}

async function getDemonNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getContainerNotes(displayImages, actor, actorIsOwner) {
    let containerNote = "";
    let test ="";
    for (let i = 0; i < actor.items.contents.length; i += 1) {
        containerNote = containerNote.concat("<div class=\"token-note-hover-hud-h3\">");
        containerNote = containerNote.concat(actor.items.contents[i].name);
        containerNote = containerNote.concat("</div>");
        containerNote = containerNote.concat("<p>");
        containerNote = containerNote.concat(actor.items.contents[i].type);
        containerNote = containerNote.concat("</p>");
    }
    return await processNotes(containerNote, actorIsOwner, displayImages);
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
    const privateNotes = actor.system?.information?.notes;
    let notes = "";

    if (!game.settings.get(CONSTANTS.MODULE_ID, 'hidePrivateNotes') && game.user.isGM && privateNotes) {
        notes = privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}
