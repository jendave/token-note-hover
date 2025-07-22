import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function swade(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "group":
            return await getActorNotes(displayImages, actor, actorIsOwner);
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNpcNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "vehicle":
            return await getActorNotes(displayImages, actor, actorIsOwner);
        default:
            return null;
    }
}

async function getActorNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.description, actorIsOwner, displayImages);
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.biography?.value, actorIsOwner, displayImages);
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes, actorIsOwner, displayImages);
}
