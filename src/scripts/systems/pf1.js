import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function pf1(actor, displayImages) {
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
        case "haunt":
            return await getHauntNotes(displayImages, actor, actorIsOwner);
        case "trap":
            return await getTrapNotes(displayImages, actor, actorIsOwner);
        case "vehicle":
            return await getVehicleNotes(displayImages, actor, actorIsOwner);
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNpcNotes(displayImages, actor, actorIsOwner);
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

async function getHauntNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes, actorIsOwner, displayImages);
}

async function getTrapNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getVehicleNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes, actorIsOwner, displayImages);
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes?.value, actorIsOwner, displayImages);
}
