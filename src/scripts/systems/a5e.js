import { getTextFromNote } from "../textUtil.js";

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
  let publicNotes = actor.system?.details?.notes;
  let privateNotes = "";

  if (game.user.isGM) {
    privateNotes += "<br><h3>GM Notes</h3>";
    privateNotes += actor.system?.details?.privateNotes;
  }

  return await processNotes(publicNotes + privateNotes, actorIsOwner, displayImages);
}

async function processNotes(notes, actorIsOwner, displayImages) {
  const renderedNotes = await getTextFromNote(notes, actorIsOwner);

  if (!renderedNotes) {
    return null;
  }

  return displayImages ? renderedNotes : renderedNotes.replaceAll(/<img.*>/g, "");
}
