import { processNotes } from "../textUtil.js";

export async function dnd5e(actor, displayImages) {
  if (!actor) {
    return null;
  }

  const actorIsOwner = actor.isOwner ?? true;

  switch (actor.type) {
    case "vehicle":
      return await processNotes(actor.system?.details?.biography?.value, actorIsOwner, displayImages);
    case "character":
      return await processNotes(actor.system?.details?.biography?.value, actorIsOwner, displayImages);
    case "npc":
      return await processNotes(actor.system?.details?.biography?.public, actorIsOwner, displayImages);
    case "group":
      return await processNotes(actor.system?.description?.full, actorIsOwner, displayImages);
    default:
      return null;
  }
}
