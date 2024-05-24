const CONSTANTS = {
  MODULE_ID: 'token-note-hover',
  PATH: 'modules/token-note-hover/',
  MODULE_TITLE: 'Token Note Hover',
  PATH_TRANSPARENT: 'modules/token-note-hover/assets/transparent.png',
  PATH_PDF_THUMBNAIL: 'modules/token-note-hover/assets/file-pdf-solid.svg',
  FLAGS: {
    USE_PIN_REVEALED: 'usePinIsRevealed',
    PIN_IS_REVEALED: 'pinIsRevealed',
    PIN_GM_TEXT: 'gmNote',
    HAS_BACKGROUND: 'hasBackground',
    RATIO_WIDTH: 'ratio',
    TEXT_ALWAYS_VISIBLE: 'textAlwaysVisible',
    PLAYER_ICON_STATE: 'PlayerIconState',
    PLAYER_ICON_PATH: 'PlayerIconPath',
    CUSHION_ICON: 'cushionIcon',
    SHOW_IMAGE: 'showImage',
    SHOW_IMAGE_EXPLICIT_SOURCE: 'showImageExplicitSource',
    HIDE_LABEL: 'hideLabel',
    // DO_NOT_SHOW_JOURNAL_PREVIEW: "doNotShowJournalPreview",
    TOOLTIP_PLACEMENT: 'tooltipPlacement',
    TOOLTIP_COLOR: 'tooltipColor',
    TOOLTIP_FORCE_REMOVE: 'tooltipForceRemove',
    TOOLTIP_SMART_PLACEMENT: 'tooltipSmartPlacement',
    TOOLTIP_FOLLOW_MOUSE: 'tooltipFollowMouse',
    PREVIEW_AS_TEXT_SNIPPET: 'previewAsTextSnippet',
    ABOVE_FOG: 'aboveFog',
    SHOW_ONLY_TO_GM: 'showOnlyToGM',
    PIN_IS_TRANSPARENT: 'pinIsTransparent',
    JAL_ANCHOR: 'anchor',
    NUMBER_WS_SUFFIX_ON_NAMEPLATE: 'numberWsSuffixOnNameplate',
    TOOLTIP_CUSTOM_DESCRIPTION: 'tooltipCustomDescription',
    TOOLTIP_SHOW_DESCRIPTION: 'tooltipShowDescription',
    TOOLTIP_SHOW_TITLE: 'tooltipShowTitle',
    // Added from player pin defaults
    PLAYER_PIN_DEFAULTS_ORIGINAL_TEXT: 'playerPinDefaultsOriginalText',
    PLAYER_PIN_DEFAULTS_IS_DEFAULTED: 'playerPinDefaultsIsDefaulted',
    PLAYER_PIN_DEFAULTS_CHARACTER_NAME: 'playerPinDefaultsCharacterName',
  },
};
CONSTANTS.PATH = `modules/${CONSTANTS.MODULE_ID}/`;
CONSTANTS.PATH_TRANSPARENT = `modules/${CONSTANTS.MODULE_ID}/assets/transparent.png`;
export default CONSTANTS;
