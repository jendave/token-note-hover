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
      return await processNotes(actor.system?.description?.full, actorIsOwner, displayImages);
    default:
      return null;
  }
}
