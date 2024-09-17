import { Reactor } from "../Reactor";
import { getPluginId } from "../../../util/getPluginId";
import { Reconciler } from "../Reconciler";
import { Item } from "@owlbear-rodeo/sdk";
import { WeatherActor } from "../actors/WeatherActor";

export class WeatherReactor extends Reactor {
  constructor(reconciler: Reconciler) {
    super(reconciler, WeatherActor);
  }

  filter(item: Item): boolean {
    return getPluginId("weather") in item.metadata;
  }
}
