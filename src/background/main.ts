import OBR from "@owlbear-rodeo/sdk";
import { Reconciler } from "./reconcile/Reconciler";
import { createEffectsMenu } from "./createEffectsMenu";
import { WeatherReactor } from "./reconcile/reactors/WeatherReactor";

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
  reconciler.register(new WeatherReactor(reconciler));
}

init();

// Clean up on HMR refresh
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    reconciler?.delete();
  });
}
