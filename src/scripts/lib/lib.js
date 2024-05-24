// =============================
// Module Generic function
// =============================

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
  }
  return false;
}

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
  let firstImage;
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
  let firstText;
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
