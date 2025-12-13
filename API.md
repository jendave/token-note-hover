# Token Note Hover API

At the this time, the Token Note Hover API covers a hook where content can be modified.

## Hook token-note-hover.contentCreate (actor, displayImages, contentMap)

Is called with three arguments:
actor the actor whose token is being hovered over
displayImages  if images should be displayed
contentMap a map containing 'content', which is the HTML content to be displayed in the hover note.

Example use:
Hooks.on('token-note-hover.contentCreate', (actor, imageDisplay, contentMap) => { contentMap.content = contentMap.content+`<p>The token's actor name is ${actor}</p>`; });
