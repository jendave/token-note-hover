export async function ironsworn(actor, displayImages, tempContent) {
    if (actor) {
        const actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
            case "starship":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.notes, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "character":
                if (actor.sheet?.constructor.name === "IronswornCharacterSheetV2") {
                    if (displayImages) {
                        tempContent = await TextEditor.enrichHTML(actor.system?.biography, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        });
                    } else {
                        tempContent = (
                            await TextEditor.enrichHTML(actor.system?.biography, {
                                secrets: actorIsOwner,
                                documents: true,
                                async: true,
                            })
                        ).replaceAll(/<img.*>/g, "");
                    }
                } else if (actor.sheet?.constructor.name === "StarforgedCharacterSheet") {
                    if (displayImages) {
                        tempContent = await TextEditor.enrichHTML(actor.system?.notes, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        });
                    } else {
                        tempContent = (
                            await TextEditor.enrichHTML(actor.system?.notes, {
                                secrets: actorIsOwner,
                                documents: true,
                                async: true,
                            })
                        ).replaceAll(/<img.*>/g, "");
                    }
                }
                break;
            case "foe":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(
                        Array.from(actor.items.values()).map((c) => c.system?.description),
                        {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        }
                    );
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(
                            Array.from(actor.items.values()).map((c) => c.system?.description),
                            {
                                secrets: actorIsOwner,
                                documents: true,
                                async: true,
                            }
                        )
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "shared":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.biography, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.biography, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "site":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(actor.system?.description, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await TextEditor.enrichHTML(actor.system?.description, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "location":
                if (displayImages) {
                    tempContent = await TextEditor.enrichHTML(
                        "<b>Location Type:<b> " +
                        game.i18n.localize(actor.system?.klass).charAt(0).toUpperCase() +
                        actor.system?.klass.slice(1) +
                        " " +
                        (actor.system?.subtype !== "star" ? actor.system?.subtype : "") +
                        actor.system?.description,
                        {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        }
                    );
                } else {
                    tempContent = await TextEditor.enrichHTML(
                        "<b>Location Type:<b> " +
                        game.i18n.localize(actor.system?.klass).charAt(0).toUpperCase() +
                        actor.system?.klass.slice(1) +
                        " " +
                        (actor.system?.subtype !== "star" ? actor.system?.subtype : "") +
                        actor.system?.description,
                        {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        }
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            default:
                tempContent = null;
        }
    }
    return tempContent;
}
