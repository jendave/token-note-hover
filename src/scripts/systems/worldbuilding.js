import CONSTANTS from '../constants';

export async function worldbuilding(actor, displayImages, tempContent) {
    if (!actor) {
        return null;
    }

    if (actor) {
        const actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
            case "character":
                if (game.settings.get(CONSTANTS.MODULE_ID, 'displayPC')) {
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
