import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function ose(actor, displayImages) {
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
        case "monster":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getMonsterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes, actorIsOwner, displayImages);
}

async function getMonsterNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.biography, actorIsOwner, displayImages);
}
