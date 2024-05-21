// =============================
// Module Generic function
// =============================

// export function getOwnedTokens(priorityToControlledIfGM) {
//     const gm = game.user?.isGM;
//     if (gm) {
//         if (priorityToControlledIfGM) {
//             const arr = canvas.tokens?.controlled;
//             if (arr && arr.length > 0) {
//                 return arr;
//             } else {
//                 return canvas.tokens?.placeables;
//             }
//         } else {
//             return canvas.tokens?.placeables;
//         }
//     }
//     if (priorityToControlledIfGM) {
//         const arr = canvas.tokens?.controlled;
//         if (arr && arr.length > 0) {
//             return arr;
//         }
//     }
//     let ownedTokens = canvas.tokens?.placeables.filter((token) => token.isOwner && (!token.document.hidden || gm));
//     if (ownedTokens.length === 0 || !canvas.tokens?.controlled[0]) {
//         ownedTokens = canvas.tokens?.placeables.filter(
//             (token) => (token.observer || token.isOwner) && (!token.document.hidden || gm),
//         );
//     }
//     return ownedTokens;
// }

export function isRealNumber(inNumber) {
    return !isNaN(inNumber) && typeof inNumber === "number" && isFinite(inNumber);
}

export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isPlacementVertical(tooltipPlacement) {
    // n, e, s, w, nw, ne, sw, se, nw-alt, ne-alt, sw-alt
    const arr = ["n", "s", "nw", "ne", "sw", "se", "nw-alt", "ne-alt", "sw-alt"];
    if (arr.includes(tooltipPlacement)) {
        return true;
    } else {
        return false;
    }
}
/*
function getOffsetSum(elem) {
    let top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
    }

    return {top: top, left: left}
}


function getOffsetRect(elem) {
    let box = elem.getBoundingClientRect()

    let body = document.body
    let docElem = document.documentElement

    let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

    let clientTop = docElem.clientTop || body.clientTop || 0
    let clientLeft = docElem.clientLeft || body.clientLeft || 0

    let top  = box.top +  scrollTop - clientTop
    let left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }
}


export function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}
*/

export function stripQueryStringAndHashFromPath(url) {
    let myUrl = url;
    if (!myUrl) {
        return myUrl;
    }
    if (myUrl.includes("?")) {
        myUrl = myUrl.split("?")[0];
    }
    if (myUrl.includes("#")) {
        myUrl = myUrl.split("#")[0];
    }
    return myUrl;
}

export function isAlt() {
    // check if Alt and only Alt is being pressed during the drop event.
    const alts = new Set(["Alt", "AltLeft"]);
    return game.keyboard?.downKeys.size === 1 && game.keyboard.downKeys.intersects(alts);
}

export function retrieveFirstImageFromJournalId(id, pageId, noDefault) {
    const journalEntry = game.journal.get(id);
    let firstImage = undefined;
    if (!journalEntry) {
        return firstImage;
    }
    // Support old data image
    // if (journalEntry?.data?.img) {
    // 	return stripQueryStringAndHashFromPath(journalEntry?.data?.img);
    // }
    // Support new image type journal
    if (journalEntry?.pages.size > 0) {
        const sortedArray = journalEntry.pages.contents.sort((a, b) => a.sort - b.sort);
        if (pageId) {
            const pageSelected = sortedArray.find((page) => page.id === pageId);
            if (pageSelected) {
                if (pageSelected.type === "image" && pageSelected.src) {
                    firstImage = stripQueryStringAndHashFromPath(pageSelected.src);
                }
                // this should manage all MJE type
                else if (pageSelected.src) {
                    firstImage = stripQueryStringAndHashFromPath(pageSelected.src);
                }
            }
        }
        // const shouldCheckForDefault = !noDefault && pageId?.length > 0;
        if (!noDefault && !firstImage) {
            for (const pageEntry of sortedArray) {
                if (pageEntry.type === "image" && pageEntry.src) {
                    firstImage = stripQueryStringAndHashFromPath(pageEntry.src);
                    break;
                } else if (pageEntry.src && pageEntry.type === "pdf") {
                    firstImage = stripQueryStringAndHashFromPath(pageEntry.src);
                    break;
                }
                // this should manage all MJE type
                else if (pageEntry.src) {
                    firstImage = stripQueryStringAndHashFromPath(pageEntry.src);
                    break;
                }
            }
        }
    }
    return firstImage;
}

export function retrieveFirstTextFromJournalId(id, pageId, noDefault) {
    const journalEntry = game.journal.get(id);
    let firstText = undefined;
    if (!journalEntry) {
        return firstText;
    }
    // Support new image type journal
    if (journalEntry?.pages.size > 0) {
        const sortedArray = journalEntry.pages.contents.sort((a, b) => a.sort - b.sort);
        if (pageId) {
            const pageSelected = sortedArray.find((page) => page.id === pageId);
            if (pageSelected) {
                if (pageSelected.type === "text" && pageSelected.text?.content) {
                    firstText = pageSelected.text?.content;
                }
                // this should manage all MJE type
                else if (pageSelected.text?.content) {
                    firstText = pageSelected.text?.content;
                }
            }
        }
        if (!noDefault && !firstText) {
            for (const journalEntry of sortedArray) {
                if (journalEntry.type === "text" && journalEntry.text?.content) {
                    firstText = journalEntry.text?.content;
                    break;
                }
                // this should manage all MJE type
                else if (journalEntry.text?.content) {
                    firstText = journalEntry.text?.content;
                    break;
                }
            }
        }
    }
    return firstText;
}
