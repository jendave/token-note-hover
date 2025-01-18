export async function pf2e(actor, displayImages, tempContent) {
    if (actor) {
        const actorIsOwner = actor.isOwner ?? true;
        let partyNoteArray = [""];
        switch (actor.type) {
            case "vehicle":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.details?.description, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.details?.description, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "character":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.details?.biography?.appearance, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    // eslint-disable-next-line max-len
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.details?.biography?.appearance, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "npc":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.details?.publicNotes, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.details?.publicNotes, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "loot":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.details?.description, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.details?.description, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "hazard":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.details?.description, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.details?.description, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "army":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.details?.description, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.details?.description, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "familiar":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.details?.creature?.value, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.details?.creature?.value, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "party":
                for (let i = 0; i < actor.members.length; i += 1) {
                    partyNoteArray = partyNoteArray.concat("<p>");
                    partyNoteArray = partyNoteArray.concat(actor.members[i].name);
                    partyNoteArray = partyNoteArray.concat("</p>");
                }
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(partyNoteArray.join(""), {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(partyNoteArray.join(""), {
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
