import CONSTANTS from '../constants';

export async function ironsworn(actor, displayImages, tempContent) {
    if (!actor) {
        return null;
    }
    
    if (actor) {
        const actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
            case "starship":
                if (displayImages) {
                    tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.notes, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.notes, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "character":
                if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                    if (actor.sheet?.constructor.name === "IronswornCharacterSheetV2") {
                        if (displayImages) {
                            tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.biography, {
                                secrets: actorIsOwner,
                                documents: true,
                                async: true,
                            });
                        } else {
                            tempContent = (
                                await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.biography, {
                                    secrets: actorIsOwner,
                                    documents: true,
                                    async: true,
                                })
                            ).replaceAll(/<img.*>/g, "");
                        }
                    } else if (actor.sheet?.constructor.name === "StarforgedCharacterSheet") {
                        if (displayImages) {
                            tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.notes, {
                                secrets: actorIsOwner,
                                documents: true,
                                async: true,
                            });
                        } else {
                            tempContent = (
                                await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.notes, {
                                    secrets: actorIsOwner,
                                    documents: true,
                                    async: true,
                                })
                            ).replaceAll(/<img.*>/g, "");
                        }
                    }
                } else {
                    return null;
                }
                break;
            case "foe":
                if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                    if (displayImages) {
                        tempContent = await foundry.applications.ux.TextEditor.enrichHTML(
                            Array.from(actor.items.values()).map((c) => c.system?.description),
                            {
                                secrets: actorIsOwner,
                                documents: true,
                                async: true,
                            }
                        );
                    } else {
                        tempContent = (
                            await foundry.applications.ux.TextEditor.enrichHTML(
                                Array.from(actor.items.values()).map((c) => c.system?.description),
                                {
                                    secrets: actorIsOwner,
                                    documents: true,
                                    async: true,
                                }
                            )
                        ).replaceAll(/<img.*>/g, "");
                    }
                } else {
                    return null;
                }
                break;
            case "shared":
                if (displayImages) {
                    tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.biography, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.biography, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "site":
                if (displayImages) {
                    tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.description, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.description, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "location":
                if (displayImages) {
                    tempContent = await foundry.applications.ux.TextEditor.enrichHTML(
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
                    tempContent = await foundry.applications.ux.TextEditor.enrichHTML(
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
