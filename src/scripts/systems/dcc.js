import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function dcc(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "Player":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "NPC":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Party":
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
    return await processNotes(actor.system?.details?.notes?.value, actorIsOwner, displayImages);
}
