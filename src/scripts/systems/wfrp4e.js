import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function wfrp4e(actor, displayImages) {
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
        case "creature":
            return await getCreatureNotes(displayImages, actor, actorIsOwner);
        case "vehicle":
            return await getVehicleNotes(displayImages, actor, actorIsOwner);
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
    const publicNotes = actor.system?.details?.biography?.value;
    const privateNotes = actor.system?.details?.gmnotes?.value;
    let notes = publicNotes;

    if (game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">GM Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}

async function getCreatureNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.details?.biography?.value;
    const privateNotes = actor.system?.details?.gmnotes?.value;
    let notes = publicNotes;

    if (game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">GM Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.details?.biography?.value;
    const privateNotes = actor.system?.details?.gmnotes?.value;
    let notes = publicNotes;

    if (game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">GM Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}

async function getVehicleNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.details?.description?.value;
    const privateNotes = actor.system?.details?.gmdescription?.value;
    let notes = publicNotes;

    if (game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">GM Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}
