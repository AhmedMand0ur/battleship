import "./styles.css";
import {
    setupBoardClickHandlers,
    setupOrientationToggle,
} from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
    setupOrientationToggle();
    setupBoardClickHandlers();
});
