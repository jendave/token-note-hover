import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function lancer(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "pilot":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "deployable":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getDeployableNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "mech":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getMechNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
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
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getDeployableNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.detail, actorIsOwner, displayImages);
}

async function getMechNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = "";
    const privateNotes = actor.system?.notes;
    let notes = publicNotes;

    if (!game.settings.get(CONSTANTS.MODULE_ID, 'hidePrivateNotes') && game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">GM Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}
