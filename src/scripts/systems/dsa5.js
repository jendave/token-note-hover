import { processNotes } from "../textUtil.js";

export async function dsa5(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "character":
            return await getCharacterNotes(displayImages, actor, actorIsOwner);
        case "creature":
            return await getCreatureNotes(displayImages, actor, actorIsOwner);
        case "npc":
            return await getNpcNotes(displayImages, actor, actorIsOwner);
        default:
            return null;
    }
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes?.value, actorIsOwner, displayImages);
}

async function getCreatureNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.description?.value, actorIsOwner, displayImages);
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
    return await processNotes(actor.system?.details?.notes?.value, actorIsOwner, displayImages);
}
