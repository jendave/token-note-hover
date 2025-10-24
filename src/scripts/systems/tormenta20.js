import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function tormenta20(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "simple":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "bases":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "hazard":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getHazardNotes(displayImages, actor, actorIsOwner);
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
    return await processNotes(actor.system.detalhes?.biography?.value, actorIsOwner, displayImages);
}

async function getHazardNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system.detalhes?.goal, actorIsOwner, displayImages);
}
