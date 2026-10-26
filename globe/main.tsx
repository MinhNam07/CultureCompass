import { createRoot } from "react-dom/client";
import Globe3DDemo from "@/components/3d-globe-demo";

const embedded = new URLSearchParams(window.location.search).get("embed") === "1";
const root = document.getElementById("globe-root")!;
createRoot(root).render(<Globe3DDemo embedded={embedded} />);

if (embedded) {
  new ResizeObserver(() => {
    window.parent.postMessage({ type: "culturecompass-globe-height", height: Math.ceil(root.getBoundingClientRect().height) }, window.location.origin === "null" ? "*" : window.location.origin);
  }).observe(root);
}
