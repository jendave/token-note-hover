import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function wrathAndGlory(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "agent":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "threat":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "vehicle":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}
