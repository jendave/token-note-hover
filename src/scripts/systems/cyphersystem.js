import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function cyphersystem(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "community":
            return await getActorNotes(displayImages, actor, actorIsOwner);
        case "companion":
            return await getActorNotes(displayImages, actor, actorIsOwner);
        case "marker":
            return await getActorNotes(displayImages, actor, actorIsOwner);
        case "pc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getPcNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getActorNotes(displayImages, actor, actorIsOwner);
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
    return await processNotes(actor.system?.notes, actorIsOwner, displayImages);
}

async function getPcNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.notes;
    const privateNotes = actor.system?.gmNotes;
    let notes = publicNotes;

    if (!game.settings.get(CONSTANTS.MODULE_ID, 'hidePrivateNotes') && game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">GM Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}
