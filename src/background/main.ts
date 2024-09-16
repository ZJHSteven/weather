import OBR from "@owlbear-rodeo/sdk";
import { Reconciler } from "./reconcile/Reconciler";
import { SmokeReactor } from "./reconcile/reactors/SmokeReactor";
import { createEffectsMenu } from "./createEffectsMenu";

async function waitUntilOBRReady() {
  return new Promise<void>((resolve) => {
    OBR.onReady(() => {
      resolve();
    });
  });
}

async function init() {
  await waitUntilOBRReady();
  createEffectsMenu();
  const reconciler = new Reconciler();
  reconciler.register(new SmokeReactor(reconciler));
}

init();
