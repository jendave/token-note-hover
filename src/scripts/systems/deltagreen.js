import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function deltagreen(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "agent":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getAgentNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "unnatural":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "vehicle":
            return await getVehicleNotes(displayImages, actor, actorIsOwner);
        default:
            return null;
    }
}

async function getNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getAgentNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.physicalDescription, actorIsOwner, displayImages);
}

async function getVehicleNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.description, actorIsOwner, displayImages);
}
