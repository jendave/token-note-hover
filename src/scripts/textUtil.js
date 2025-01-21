export async function processNotes(notes, actorIsOwner, displayImages) {
    const renderedNotes = await getTextFromNote(notes, actorIsOwner);

    if (!renderedNotes) {
        return null;
    }

    return displayImages ? renderedNotes : renderedNotes.replaceAll(/<img.*>/g, "");
}

export async function getTextFromNote(notes, actorIsOwner) {
    if (!notes || notes.length === 0) {
        return null;
    }

    return await TextEditor.enrichHTML(notes, {
        secrets: actorIsOwner,
        documents: true,
        async: true,
    });
}
