export async function worldbuilding(actor, displayImages, tempContent) {
    if (actor) {
        const actorIsOwner = actor.isOwner ?? true;

        switch (actor.type) {
            case "character":
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
            default:
                tempContent = null;
        }
    }
    return tempContent;
}
