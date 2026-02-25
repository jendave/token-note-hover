import CONSTANTS from '../constants.js';
import { processNotes } from "../textUtil.js";

export async function universalTabletopSystem(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }

    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "token":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                return await getTokenNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "chess":
            if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                return await getChessNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getTokenNotes(displayImages, actor, actorIsOwner) {
    let tokenNoteArray = [""];
    tokenNoteArray = tokenNoteArray.concat("<div class=\"token-note-hover-hud-h3\">");
    tokenNoteArray = tokenNoteArray.concat("Resource");
    tokenNoteArray = tokenNoteArray.concat("</div>");
    tokenNoteArray = tokenNoteArray.concat("<p>");
    tokenNoteArray = tokenNoteArray.concat("Value: " + actor.system?.resource?.value);
    tokenNoteArray = tokenNoteArray.concat("</p>");
    tokenNoteArray = tokenNoteArray.concat("<p>");
    tokenNoteArray = tokenNoteArray.concat("Max: " + actor.system?.resource.max);
    tokenNoteArray = tokenNoteArray.concat("</p>");
    return await processNotes(tokenNoteArray.join(""), actorIsOwner, displayImages);
}

async function getChessNotes(displayImages, actor, actorIsOwner) {
    let chessNoteArray = [""];
    chessNoteArray = chessNoteArray.concat("<div class=\"token-note-hover-hud-h3\">");
    chessNoteArray = chessNoteArray.concat("Piece");
    chessNoteArray = chessNoteArray.concat("</div>");
    chessNoteArray = chessNoteArray.concat("<p>");
    chessNoteArray = chessNoteArray.concat(`${actor.system?.piece?.[0].toUpperCase()}${actor.system?.piece?.slice(1) || ""}`);
    chessNoteArray = chessNoteArray.concat("</p>");
    return await processNotes(chessNoteArray.join(""), actorIsOwner, displayImages);
}
