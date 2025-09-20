# 天气（Weather 汉化版）

> 本仓库为 [Owlbear Rodeo/weather](https://github.com/owlbear-rodeo/weather) 的汉化分支，由 ZJHSteven 维护。若需原版功能说明或提交非汉化相关问题，请前往上游仓库。

## 项目简介

“天气”是一个适用于 Owlbear Rodeo 虚拟桌面平台的扩展，能够为战斗地图叠加雨、雪、沙尘等多种动态天气效果，强化叙事与沉浸感。当前版本仅进行了界面与文档的中文化处理，功能逻辑与上游保持一致。

## 功能概览
- 在指定地图上快速启用/停用天气特效。
- 通过界面实时调节天气类型、风向、风速与覆盖强度。
- 支持多种预设天气材质，适配不同场景需求。

## 最小可运行示例
1. 安装依赖：`npm install`。
2. 开发模式启动：`npm run dev`，并在 Owlbear Rodeo 中加载生成的开发扩展链接。
3. 在任意地图的右键菜单中选择“添加天气”，即可看到中文界面的天气管理面板。

## 本地开发步骤
1. 克隆本仓库：`git clone https://github.com/ZJHSteven/weather.git`。
2. 切换到目录并安装依赖：`npm install`。
3. 启动开发服务器：`npm run dev`。默认会在终端输出一个本地 URL，将其添加到 Owlbear Rodeo 的扩展管理中即可调试。
4. 构建生产版本：`npm run build`，生成文件位于 `dist` 目录，可用于后续自行部署。

## 贡献指南
本仓库主要负责汉化维护，欢迎就翻译改进、文档补充等提出 Issue 或 Pull Request。若涉及功能性变更，请先在上游仓库取得共识后再同步到本分支。

## 许可证
本项目遵循 GNU GPLv3，与上游保持一致。

— ZJHSteven，2025 年
