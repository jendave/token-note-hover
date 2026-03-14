import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function drawsteel(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "hero":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
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
        case "object":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "party":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getPartyNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "retainer":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    const publicNotes = actor.system?.biography?.value;
    const privateNotes = actor.system?.biography?.director;
    let notes = publicNotes;

    if (!game.settings.get(CONSTANTS.MODULE_ID, 'hidePrivateNotes') && game.user.isGM && privateNotes) {
        notes += "<div class=\"token-note-hover-hud-h3\">Director Notes</div>";
        notes += privateNotes;
    }

    return await processNotes(notes, actorIsOwner, displayImages);
}

async function getPartyNotes(displayImages, actor, actorIsOwner) {
    let partyNoteArray = "<div class=\"token-note-hover-hud-h3\">Party Members</div>";
    for (let i = 0; i < actor.system.members.contents.length; i += 1) {
        partyNoteArray = partyNoteArray.concat("<p>");
        partyNoteArray = partyNoteArray.concat(actor.system.members.contents[i].actor.name);
        partyNoteArray = partyNoteArray.concat("</p>");
    }
    let publicNotes = "<div class=\"token-note-hover-hud-h3\">Party Details</div>";
    publicNotes = publicNotes.concat(actor.system?.description?.value);
    let notes = partyNoteArray.concat(publicNotes);

    return await processNotes(notes, actorIsOwner, displayImages);
}
