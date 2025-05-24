import CONSTANTS from '../constants';

export async function twodsix(actor, displayImages, tempContent) {
    if (actor) {
        const actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
            case "vehicle":
                if (displayImages) {
                    tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.cargoList, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.cargoList, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "traveller":
                if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
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
                } else {
                    return null;
                }
                break;
            case "animal":
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
            case "robot":
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
            case "ship":
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
            case "space-object":
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
            default:
                tempContent = null;
        }
    }
    return tempContent;
}
