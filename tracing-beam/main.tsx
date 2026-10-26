import { createRoot } from "react-dom/client";
import { TracingBeam } from "@/components/ui/tracing-beam";

// Mount outside main so the track includes the header and footer, and survives
// content rendering. A fixed overlay never changes the document's scroll range.
function attach() {
  if (document.querySelector("body > .cc-tracing-mount")) return;
  const mount = document.createElement("div");
  mount.className = "cc-tracing-mount";
  mount.setAttribute("aria-hidden", "true");
  document.body.append(mount);
  createRoot(mount).render(<TracingBeam target={document.body} />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attach, { once: true });
} else {
  attach();
}
