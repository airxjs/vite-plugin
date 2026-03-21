# Projitive Governance Workspace

This directory (`.projitive/`) is the governance root for this project.

## Conventions
- Keep roadmap/task source of truth in .projitive governance store.
- Treat roadmap.md/tasks.md as generated views from governance store.
- Keep IDs stable (TASK-xxxx / ROADMAP-xxxx).
- Update report evidence before status transitions.

## Project Info
- Project: vite-plugin
- Package: `vite-plugin-airx`
- Role: AirxJS 的 Vite 集成层，负责把 Airx 项目接入现代构建链路
- Tech Stack: TypeScript, Vite plugin API, TSC
- Primary Concern: Vite 版本兼容范围、插件 API 清晰度、最小可维护构建链路

## Ecosystem Relation
- Upstream Dependency: 依赖 Vite 主版本能力
- Downstream Impact: 直接影响基于 Vite 的 Airx 应用接入成本与升级路径

## Current Governance Focus
- 明确支持的 Vite 主版本范围
- 建立插件示例、兼容性与发布规范
- 为主站未来的构建升级保留演进空间
