import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function tor2e(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "adversary":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNpcNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "community":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getLoreNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "lore":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getLoreNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNpcNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.history?.notes.value, actorIsOwner, displayImages);
}

async function getLoreNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.description?.value;
    const privateNotes = actor.system?.notes?.value;
    let notes = publicNotes;

    if (!game.settings.get(CONSTANTS.MODULE_ID, 'hidePrivateNotes') && game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.description?.value, actorIsOwner, displayImages);
}