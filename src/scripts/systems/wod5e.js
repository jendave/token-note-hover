import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function wod5e(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "mortal":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getPrivateNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "ghoul":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getPrivateNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "group":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getPrivateNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "hunter":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getPrivateNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "spc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getPrivateNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "vampire":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getPrivateNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "werewolf":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getPrivateNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

// async function getPublicNotes(displayImages, actor, actorIsOwner) {
//     return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
// }

async function getPrivateNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.notes;
    const privateNotes = actor.system?.privatenotes;
    let notes = publicNotes;

    if (!game.settings.get(CONSTANTS.MODULE_ID, 'hidePrivateNotes') && game.user.isOwner && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">Private Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}
