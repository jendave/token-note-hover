import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function alienrpg(actor, displayImages) {
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
        case "colony":
            {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            }
        case "territory":
            {
                return await getTerritoryNotes(displayImages, actor, actorIsOwner);
            }
        case "vehicles":
            {
                return await getVehiclesNotes(displayImages, actor, actorIsOwner);
            }
        case "creature":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "planet":
            {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            }
        case "spacecraft":
            {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            }
        case "synthetic":
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
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getTerritoryNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.comment?.value, actorIsOwner, displayImages);
}

async function getVehiclesNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.attributes?.comment?.value, actorIsOwner, displayImages);
}
