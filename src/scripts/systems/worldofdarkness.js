import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function worldofdarkness(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "Mortal":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Creature":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Mummy":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Hunter":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Changeling":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Vampire":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Werewolf":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Wraith":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Demon":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Mage":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Changing Breed":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "Exalted":
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
    return await processNotes(actor.system?.appearance, actorIsOwner, displayImages);
}
