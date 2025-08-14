import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function daggerheart(actor, displayImages) {
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
        case "adversary":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "companion":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCompanionNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "environment":
            return await getNotes(displayImages, actor, actorIsOwner);
        default:
            return null;
    }
}

async function getNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.biography?.background, actorIsOwner, displayImages);
}

async function getCompanionNotes(displayImages, actor, actorIsOwner) {
    const partner = actor.system?.partner?.name;
    let notes = "<div class=\"token-note-hover-hud-h3\">Partner</div>" + partner;
    return await processNotes(notes, actorIsOwner, displayImages);
}
