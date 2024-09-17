import OBR from "@owlbear-rodeo/sdk";
import { getPluginId } from "../util/getPluginId";

import weatherIcon from "../assets/weather.svg";

export function createEffectsMenu() {
  OBR.contextMenu.create({
    id: getPluginId("weather-menu/add"),
    icons: [
      {
        icon: weatherIcon,
        label: "Add Weather",
        filter: {
          every: [
            { key: "type", value: "IMAGE" },
            { key: "layer", value: "MAP" },
            {
              key: ["metadata", getPluginId("weather")],
              value: undefined,
            },
          ],
        },
      },
    ],
    async onClick(context) {
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (const item of items) {
          item.metadata[getPluginId("weather")] = {
            type: "SNOW",
          };
        }
      });
    },
  });

  OBR.contextMenu.create({
    id: getPluginId("weather-menu/settings"),
    icons: [
      {
        icon: weatherIcon,
        label: "Weather Settings",
        filter: {
          every: [
            { key: "type", value: "IMAGE" },
            { key: "layer", value: "MAP" },
            {
              key: ["metadata", getPluginId("weather")],
              value: undefined,
              operator: "!=",
            },
          ],
        },
      },
    ],
    embed: {
      url: "/menu.html",
      height: 263,
    },
  });
}
