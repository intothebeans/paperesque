import { docReady } from "./utils/utils";
import initCollapsibleAlerts from "./animations/blockquoteAlertsAnimations";
import initRightLinksAnimation from "./animations/rightLinksAnimation";
import initColorTransitionStyles from "./animations/colorModeTransition";
docReady(() => {
    initCollapsibleAlerts();
    initRightLinksAnimation();
    initColorTransitionStyles();
});
