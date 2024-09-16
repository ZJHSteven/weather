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

async function init() {
  await waitUntilOBRReady();
  createEffectsMenu();
  const reconciler = new Reconciler();
  reconciler.register(
    new SmokeReactor(reconciler),
    new SnowReactor(reconciler)
  );
}

init();
