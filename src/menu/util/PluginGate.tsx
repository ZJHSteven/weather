import OBR from "@owlbear-rodeo/sdk";
import React, { useEffect, useState } from "react";

/**
 * 仅在插件运行环境就绪后才渲染子组件。
 * 通过监听 OBR.onReady，避免在扩展尚未初始化时访问 SDK 导致报错。
 */
export function PluginGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (OBR.isAvailable) {
      OBR.onReady(() => setReady(true));
    }
  }, []);

  if (ready) {
    return <>{children}</>;
  } else {
    return null;
  }
}
