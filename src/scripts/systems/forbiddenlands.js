import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function forbiddenlands(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCreatureNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "monster":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCreatureNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "party":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "stronghold":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getCreatureNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.bio?.note?.value, actorIsOwner, displayImages);
}

async function getNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.description, actorIsOwner, displayImages);
}