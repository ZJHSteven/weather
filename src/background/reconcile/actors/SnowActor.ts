import { buildEffect, Effect, isEffect, Item } from "@owlbear-rodeo/sdk";
import { Actor } from "../Actor";
import { Reconciler } from "../Reconciler";
import { SnowConfig } from "../../../types/SnowConfig";
import { getMetadata } from "../../../util/getMetadata";
import { getPluginId } from "../../../util/getPluginId";

import sksl from "../../shaders/snow.frag";

export class SnowActor extends Actor {
  // ID of the current effect item
  private effect: string;
  constructor(reconciler: Reconciler, parent: Item) {
    super(reconciler);
    const item = this.parentToEffect(parent);
    this.effect = item.id;
    this.reconciler.patcher.addItems(item);
  }

  delete(): void {
    this.reconciler.patcher.deleteItems(this.effect);
  }

  update(parent: Item) {
    const config = getMetadata<SnowConfig>(
      parent.metadata,
      getPluginId("snow"),
      {}
    );
    this.reconciler.patcher.updateItems([
      this.effect,
      (item) => {
        if (isEffect(item)) {
          this.applySmokeConfig(item, config);
        }
      },
    ]);
  }

  private parentToEffect(parent: Item) {
    const config = getMetadata<SnowConfig>(
      parent.metadata,
      getPluginId("snow"),
      {}
    );
    const effect = buildEffect()
      .attachedTo(parent.id)
      .position(parent.position)
      .rotation(parent.rotation)
      .sksl(sksl)
      .effectType("ATTACHMENT")
      .locked(true)
      .disableHit(true)
      .layer("MAP")
      .build();

    this.applySmokeConfig(effect, config);

    return effect;
  }

  private applySmokeConfig(effect: Effect, config: SnowConfig) {
    effect.uniforms = [
      { name: "tiling", value: config.tiling ?? 3 },
      { name: "direction", value: config.direction ?? { x: 1, y: -1 } },
      { name: "speed", value: config.speed ?? 0.5 },
    ];
    return effect;
  }
}
