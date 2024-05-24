import CONSTANTS from "./constants";
import API from "./api";
import Logger from "./lib/Logger";

export let tokenNoteHoverSocket;
export function registerSocket() {
  Logger.debug("Registered tokenNoteHoverSocket");
  if (tokenNoteHoverSocket) {
    return tokenNoteHoverSocket;
  }

  tokenNoteHoverSocket = socketlib.registerModule(CONSTANTS.MODULE_ID);

  tokenNoteHoverSocket.register("requestEvent", (...args) => API.requestEventArr(...args));
  tokenNoteHoverSocket.register("setNoteRevealed", (...args) => API.setNoteRevealedArr(...args));

  game.modules.get(CONSTANTS.MODULE_ID).socket = tokenNoteHoverSocket;
  return tokenNoteHoverSocket;
}
