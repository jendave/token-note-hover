import CONSTANTS from '../constants';
import { processNotes } from "../textUtil.js";

export async function dnd5e(actor, displayImages) {
  if (!actor) {
    return null;
  }

  const actorIsOwner = actor.isOwner ?? true;

  switch (actor.type) {
    case "encounter":
      return await processNotes(actor.system?.description?.full, actorIsOwner, displayImages);
    case "vehicle":
      return await processNotes(actor.system?.details?.biography?.value, actorIsOwner, displayImages);
    case "character":
      if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
        return await processNotes(actor.system?.details?.biography?.value, actorIsOwner, displayImages);
      } else {
        return null;
      }
    case "npc":
      if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
        return await processNotes(actor.system?.details?.biography?.public, actorIsOwner, displayImages);
      } else {
        return null;
      }
    case "group":
      return await getGroupNotes(displayImages, actor, actorIsOwner);
    default:
      return null;
  }
}

async function getGroupNotes(displayImages, actor, actorIsOwner) {
  let groupNoteArray = "<div class=\"token-note-hover-hud-h3\">Group Members</div>";
  for (let i = 0; i < actor.system.members.length; i += 1) {
      groupNoteArray = groupNoteArray.concat("<p>");
      groupNoteArray = groupNoteArray.concat(actor.system.members[i].actor?.name);
      groupNoteArray = groupNoteArray.concat("</p>");
  }
  let publicNotes = "<div class=\"token-note-hover-hud-h3\">Group Details</div>";
  publicNotes = publicNotes.concat(actor.system?.description?.summary, actor.system?.description?.full);
  let notes = groupNoteArray.concat(publicNotes);

  return await processNotes(notes, actorIsOwner, displayImages);
}
