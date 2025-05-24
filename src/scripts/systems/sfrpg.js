import CONSTANTS from '../constants';
import { processNotes } from "../textUtil.js";

export async function sfrpg(actor, displayImages) {
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "drone":
            return await getDroneNotes(displayImages, actor, actorIsOwner);
        case "vehicle":
            return await getVehicleHazardNotes(displayImages, actor, actorIsOwner);
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc2":
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
            return await getVehicleHazardNotes(displayImages, actor, actorIsOwner);
        case "starship":
            return await getStarshipNotes(displayImages, actor, actorIsOwner);
        default:
            return null;
    }
}

async function getDroneNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.details?.biography?.value;
    const privateNotes = actor.system?.details?.biography?.gmNotes;
    let notes = publicNotes;

    if (game.user.isGM && privateNotes) {
        notes += "<br><h3>GM Notes</h3>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.details?.biography?.value;
    const privateNotes = actor.system?.details?.biography?.gmNotes;
    let notes = publicNotes;

    if (game.user.isGM && privateNotes) {
        notes += "<br><h3>GM Notes</h3>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}

async function getVehicleHazardNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.description?.value, actorIsOwner, displayImages);
}

async function getStarshipNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes, actorIsOwner, displayImages);
}
