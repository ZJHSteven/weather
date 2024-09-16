import OBR from "@owlbear-rodeo/sdk";
import { Reconciler } from "./reconcile/Reconciler";
import { createEffectsMenu } from "./createEffectsMenu";
import { SmokeReactor } from "./reconcile/reactors/SmokeReactor";
import { SnowReactor } from "./reconcile/reactors/SnowReactor";

async function waitUntilOBRReady() {
  return new Promise<void>((resolve) => {
    OBR.onReady(() => {
      resolve();
    });
  });
}

let reconciler: Reconciler | null = null;
async function init() {
  await waitUntilOBRReady();
  createEffectsMenu();
  reconciler = new Reconciler();
  reconciler.register(
    new SmokeReactor(reconciler),
    new SnowReactor(reconciler)
  );
}

init();

// Clean up on HMR refresh
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    reconciler?.delete();
  });
}
