export async function coc7(actor, displayImages, tempContent) {
    if (actor) {
        const actorIsOwner = actor.isOwner ?? true;
        let characterNoteArray = [""];

        switch (actor.type) {
            case "character":
                for (let i = 0; i < actor.system.biography.length; i += 1) {
                    characterNoteArray = characterNoteArray.concat("<h3>");
                    characterNoteArray = characterNoteArray.concat(actor.system?.biography[i]?.title);
                    characterNoteArray = characterNoteArray.concat("</h3>");
                    characterNoteArray = characterNoteArray.concat("<p>");
                    characterNoteArray = characterNoteArray.concat(actor.system?.biography[i]?.value);
                    characterNoteArray = characterNoteArray.concat("</p>");
                }
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(characterNoteArray.join(""), {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(characterNoteArray.join(""), {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "container":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.description?.value, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.description?.value, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "creature":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.biography?.personalDescription?.value, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.biography?.personalDescription?.value, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "npc":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.biography?.personalDescription?.value, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.biography?.personalDescription?.value, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            default:
                tempContent = null;
        }
    }
    return tempContent;
}
