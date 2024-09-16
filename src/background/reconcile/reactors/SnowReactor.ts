import { Reactor } from "../Reactor";
import { getPluginId } from "../../../util/getPluginId";
import { SnowActor } from "../actors/SnowActor";
import { Reconciler } from "../Reconciler";
import { Item } from "@owlbear-rodeo/sdk";

export class SnowReactor extends Reactor {
  constructor(reconciler: Reconciler) {
    super(reconciler, SnowActor);
  }

  filter(item: Item): boolean {
    return getPluginId("snow") in item.metadata;
  }
}
