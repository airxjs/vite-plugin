# Code Style

## Core Principles

- **类型安全**：所有 TypeScript 代码必须类型正确
- **Vite 插件规范**：遵循 Vite 插件格式
- **Tree-shakable**：保持模块化，支持按需导入

## Naming and Structure

### 文件组织
```
/source/           — 源码
  index.ts        — 插件主入口
/output/           — 构建输出
/examples/         — 使用示例
```

### 命名规则
- **文件**：`kebab-case.ts`
- **函数/变量**：`camelCase`
- **常量**：`SCREAMING_SNAKE_CASE`

### 插件结构
```typescript
// 标准 Vite 插件格式
export default function airxPlugin(config): Plugin {
  return {
    name: 'vite-plugin-airx',
    enforce: 'pre', // 或 'post'
    // ... 其他钩子
  }
}
```

## Testing and Validation

### 验证命令
```bash
pnpm run build     # TypeScript 编译
pnpm run typecheck # 类型检查
```

### 测试要求
- 插件核心功能需要测试验证
- 集成测试使用 Vite 测试环境

## Review Checklist

- [ ] TypeScript 类型完整
- [ ] 构建成功
- [ ] 类型检查通过
- [ ] 插件钩子正确实现
- [ ] peerDependencies 正确声明

## Change Triggers

当以下情况发生时，需更新本文档：
- 引入新的代码规范
- 调整插件结构
- 更新 Vite 兼容性要求
