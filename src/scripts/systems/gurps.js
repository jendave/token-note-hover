import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function gurps(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "enemy":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getNotes(displayImages, actor, actorIsOwner) {
    let notes = "";

    for (const note in actor.system?.notes) {
        notes = notes.concat("<div class=\"token-note-hover-hud-h3\">");
        notes = notes.concat(actor.system?.notes[note].title);
        notes = notes.concat("</div>");
        notes = notes.concat("<p>");
        notes = notes.concat(actor.system?.notes[note].notes);
        notes = notes.concat("</p>");
    };

    return await processNotes(notes, actorIsOwner, displayImages);
}
