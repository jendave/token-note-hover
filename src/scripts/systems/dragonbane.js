import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function dragonbane(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getPCNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNPCNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "monster":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNPCNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getPCNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getNPCNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.description, actorIsOwner, displayImages);
}