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
