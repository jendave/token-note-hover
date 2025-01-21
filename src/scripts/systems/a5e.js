import { getTextFromNote, processNotes } from "../textUtil.js";

export async function a5e(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "character":
            return await getCharacterNotes(displayImages, actor, actorIsOwner);
        case "npc":
            return await getNpcNotes(displayImages, actor, actorIsOwner);
        default:
            return null;
    }
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes, actorIsOwner, displayImages);
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.details?.notes;
    const privateNotes = actor.system?.details?.privateNotes;
    let notes = publicNotes;

    if (game.user.isGM && privateNotes) {
        notes += "<br><h3>GM Notes</h3>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}


