import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function impmal(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getActorNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getActorNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "patron":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getActorNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "vehicle":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getActorNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getActorNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.notes?.player;
    const privateNotes = actor.system?.notes?.gm;
    let notes = publicNotes;

    if (!game.settings.get(CONSTANTS.MODULE_ID, 'hidePrivateNotes') && game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">GM Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}
