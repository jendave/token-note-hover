import { getTextFromNote } from "../textUtil.js";

export async function a5e(actor, displayImages, tempContent) {
  // Using a guard here looks cleaner
  if (!actor) {
    return tempContent;
  }

  const actorIsOwner = actor.isOwner ?? true;

  switch (actor.type) {
    case "character":
      tempContent = await getCharacterNotes(displayImages, actor, actorIsOwner);
      break;
    case "npc":
      tempContent = await getNpcNotes(displayImages, actor, actorIsOwner);
      break;
    default:
      tempContent = null;
  }

  return tempContent;
}

async function getCharacterNotes(displayImages, actor, actorIsOwner) {
  let notes = actor.system?.details?.notes;

  const renderedNotes = await getTextFromNote(notes, actorIsOwner);

  if (!renderedNotes) {
    return null;
  }

  if (displayImages) {
    return renderedNotes;
  } else {
    return renderedNotes.replaceAll(/<img.*>/g, "");
  }
}

async function getNpcNotes(displayImages, actor, actorIsOwner) {
  let publicNotes = actor.system?.details?.notes;
  let privateNotes = "";

  if (game.user.isGM) {
    privateNotes += "<br><h3>GM Notes</h3>";
    privateNotes += actor.system?.details?.privateNotes;
  }

  const renderedNotes = await getTextFromNote(publicNotes + privateNotes, actorIsOwner);

  if (!renderedNotes) {
    return null;
  }

  if (displayImages) {
    return renderedNotes;
  } else {
    return renderedNotes.replaceAll(/<img.*>/g, "");
  }
}
