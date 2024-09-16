import { Reactor } from "../Reactor";
import { getPluginId } from "../../../util/getPluginId";
import { SmokeActor } from "../actors/SmokeActor";
import { Reconciler } from "../Reconciler";
import { Item } from "@owlbear-rodeo/sdk";

export class SmokeReactor extends Reactor {
  constructor(reconciler: Reconciler) {
    super(reconciler, SmokeActor);
  }

  filter(item: Item): boolean {
    return getPluginId("smoke") in item.metadata;
  }
}
