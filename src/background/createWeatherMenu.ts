import OBR from "@owlbear-rodeo/sdk";
import { getPluginId } from "../util/getPluginId";

import weatherIcon from "../assets/weather.svg";

/**
 * 创建插件的上下文菜单入口。
 * 这里注册两个图标按钮：其一用于在地图上快速添加默认天气，其二嵌入设置面板。
 * 标签统一改为中文，确保与前端界面语言保持一致，便于中文用户理解操作。
 */
export function createWeatherMenu() {
  OBR.contextMenu.create({
    id: getPluginId("weather-menu/add"),
    icons: [
      {
        icon: weatherIcon,
        label: "添加天气",
        filter: {
          every: [
            { key: "layer", value: "MAP", coordinator: "||" },
            { key: "layer", value: "FOG" },
            {
              key: ["metadata", getPluginId("weather")],
              value: undefined,
            },
          ],
          permissions: ["UPDATE"],
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
        label: "天气设置",
        filter: {
          every: [
            { key: "layer", value: "MAP", coordinator: "||" },
            { key: "layer", value: "FOG" },
            {
              key: ["metadata", getPluginId("weather")],
              value: undefined,
              operator: "!=",
            },
          ],
          permissions: ["UPDATE"],
        },
      },
    ],
    embed: {
      url: "/menu.html",
      height: 263,
    },
  });
}
