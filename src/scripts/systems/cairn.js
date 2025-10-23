import CONSTANTS from "../constants";
import { processNotes } from "../textUtil.js";

export async function cairn(actor, displayImages) {
    // Using a guard here looks cleaner
    if (!actor) {
        return null;
    }
    const actorIsOwner = actor.isOwner ?? true;

    switch (actor.type) {
        case "character":
            if (game.settings.get(CONSTANTS.MODULE_ID, "displayPC")) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        case "npc":
            if (game.settings.get(CONSTANTS.MODULE_ID, "displayNPC")) {
                return await getCharacterNotes(displayImages, actor, actorIsOwner);
            } else {
                return null;
            }
        default:
            return null;
    }
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
    const background = game.i18n.localize("CAIRN.Background");
    const role = game.i18n.localize("CAIRN.Role");
    const description = game.i18n.localize("CAIRN.Description");
    let content = "";
    if (actor.system.background != null && actor.system.background != "") {
        content = content.concat(actor.type == "npc" ? `<p><b>${role}:</b>` : `<p><b>${background}:</b>`);
        content = content.concat(` ${actor.system.background}</p>`);
    }
    if (actor.system.biography != null && actor.system.biography != "") {
        content = content.concat(`<b>${description}:</b><br><p>${actor.system.biography}</p>`);
    } else if (actor.system.description != null && actor.system.description != "") {
        content = content.concat(`<b>${description}:</b><br>${actor.system.description}`);
    }
    if (actor.system.notes != null && actor.system.notes != "") {
        const Notes = game.i18n.localize("CAIRN.Notes");
        content = content.concat(`<b>${Notes}:</b>${actor.system.notes}`);
    }
    return await processNotes(content, actorIsOwner, displayImages);
}
