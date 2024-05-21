import CONSTANTS from "./constants.js";
import API from "./api.js";
import Logger from "./lib/Logger.js";

export let pinCushionSocket;
export function registerSocket() {
    Logger.debug("Registered pinCushionSocket");
    if (pinCushionSocket) {
        return pinCushionSocket;
    }

    pinCushionSocket = socketlib.registerModule(CONSTANTS.MODULE_ID);

    pinCushionSocket.register("requestEvent", (...args) => API.requestEventArr(...args));
    pinCushionSocket.register("setNoteRevealed", (...args) => API.setNoteRevealedArr(...args));

    game.modules.get(CONSTANTS.MODULE_ID).socket = pinCushionSocket;
    return pinCushionSocket;
}
