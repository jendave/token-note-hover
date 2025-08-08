import CONSTANTS from '../constants';

export async function coc7(actor, displayImages, tempContent) {
    if (!actor) {
        return null;
    }

    if (actor) {
        const actorIsOwner = actor.isOwner ?? true;
        let characterNoteArray = [""];

        switch (actor.type) {
            case "character":
                if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
                    for (let i = 0; i < actor.system.biography.length; i += 1) {
                        characterNoteArray = characterNoteArray.concat("<div class=\"token-note-hover-hud-h3\">");
                        characterNoteArray = characterNoteArray.concat(actor.system?.biography[i]?.title);
                        characterNoteArray = characterNoteArray.concat("</div>");
                        characterNoteArray = characterNoteArray.concat("<p>");
                        characterNoteArray = characterNoteArray.concat(actor.system?.biography[i]?.value);
                        characterNoteArray = characterNoteArray.concat("</p>");
                    }
                    if (displayImages) {
                        tempContent = await foundry.applications.ux.TextEditor.enrichHTML(characterNoteArray.join(""), {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        });
                    } else {
                        tempContent = (
                            await foundry.applications.ux.TextEditor.enrichHTML(characterNoteArray.join(""), {
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
            case "container":
                if (displayImages) {
                    tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.description?.value, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.description?.value, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "creature":
                if (displayImages) {
                    tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.biography?.personalDescription?.value, {
                        secrets: actorIsOwner,
                        documents: true,
                        async: true,
                    });
                } else {
                    tempContent = (
                        await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.biography?.personalDescription?.value, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        })
                    ).replaceAll(/<img.*>/g, "");
                }
                break;
            case "npc":
                if (game.settings.get(CONSTANTS.MODULE_ID, 'displayNPC')) {
                    if (displayImages) {
                        tempContent = await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.biography?.personalDescription?.value, {
                            secrets: actorIsOwner,
                            documents: true,
                            async: true,
                        });
                    } else {
                        tempContent = (
                            await foundry.applications.ux.TextEditor.enrichHTML(actor.system?.biography?.personalDescription?.value, {
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
            default:
                tempContent = null;
        }
    }
    return tempContent;
}
