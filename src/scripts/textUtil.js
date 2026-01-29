export async function processNotes(notes, actorIsOwner, displayImages) {
    const renderedNotes = await getTextFromNote(notes, actorIsOwner);

    if (!renderedNotes) {
        return null;
    }

    return displayImages ? renderedNotes : renderedNotes.replaceAll(/<img.*>/g, "");
}

async function getTextFromNote(notes, actorIsOwner) {
    if (!notes || notes.length === 0) {
        return null;
    }

    return await foundry.applications.ux.TextEditor.enrichHTML(notes, {
        secrets: actorIsOwner,
        documents: true,
        async: true,
    });
}

export async function processRawNotes(notes, actorIsOwner, displayImages) {
    const renderedNotes = await getTextFromRawNote(notes, actorIsOwner);

    if (!renderedNotes) {
        return null;
    }

    return displayImages ? renderedNotes : renderedNotes.replaceAll(/<img.*>/g, "");
}

async function getTextFromRawNote(notes, actorIsOwner) {
    if (!notes || notes.length === 0) {
        return null;
    }

    const updatedNotes = notes.replaceAll(/\n/g, "<br />");

    return await foundry.applications.ux.TextEditor.enrichHTML(updatedNotes, {
        secrets: actorIsOwner,
        documents: true,
        async: true,
    });
}
