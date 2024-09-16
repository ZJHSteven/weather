import OBR from "@owlbear-rodeo/sdk";
import { getPluginId } from "../util/getPluginId";

const TEST_EFFECT = "smoke";

export function createEffectsMenu() {
  OBR.contextMenu.create({
    id: getPluginId("effects-menu/add"),
    icons: [
      {
        icon: "/icon.svg",
        label: "Add Effect",
        filter: {
          every: [
            { key: "type", value: "IMAGE" },
            { key: "layer", value: "MAP" },
            {
              key: ["metadata", getPluginId(TEST_EFFECT)],
              value: undefined,
            },
          ],
        },
      },
    ],
    async onClick(context) {
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (const item of items) {
          item.metadata[getPluginId(TEST_EFFECT)] = {};
        }
      });
    },
  });

  OBR.contextMenu.create({
    id: getPluginId("effects-menu/remove"),
    icons: [
      {
        icon: "/icon.svg",
        label: "Remove Effect",
        filter: {
          every: [
            {
              key: ["metadata", getPluginId(TEST_EFFECT)],
              value: undefined,
              operator: "!=",
            },
          ],
        },
      },
    ],
    async onClick(context) {
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (const item of items) {
          delete item.metadata[getPluginId(TEST_EFFECT)];
        }
      });
    },
  });
}
