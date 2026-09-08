# My React App

> Vite + React 19 + TypeScript 前端项目

## 项目信息

| 项目 | 说明 |
|------|------|
| 框架 | React 19.2 |
| 构建工具 | Vite 8.2 |
| 语言 | TypeScript 6.0 |
| 包管理器 | yarn（镜像源：npmmirror） |
| 默认端口 | 5173 |

---

## 启动命令

### 开发模式启动

```powershell
# 在项目根目录下执行
yarn dev
```

启动成功后访问：http://localhost:5173

### 构建生产版本

```powershell
yarn build
```

构建产物输出到 `dist/` 目录。

### 预览生产构建

```powershell
yarn preview
```

### 指定端口启动

```powershell
yarn dev --port 3000
```

### 允许局域网访问

```powershell
yarn dev --host
```

---

## 安装依赖命令

### 安装所有依赖

```powershell
yarn install
```

### 添加生产依赖

```powershell
# 示例：添加 axios
yarn add axios
```

### 添加开发依赖

```powershell
# 示例：添加 tailwindcss
yarn add -D tailwindcss
```

### 移除依赖

```powershell
# 示例：移除 axios
yarn remove axios
```

### 更新所有依赖

```powershell
yarn upgrade
```

### 清理缓存并重装

```powershell
yarn cache clean
rm -r node_modules
yarn install
```

---

## 调试命令

### 代码检查

```powershell
yarn lint
```

### TypeScript 类型检查

```powershell
npx tsc --noEmit
```

### 浏览器调试

1. 在代码中添加 `debugger;` 语句或使用 `console.log()` 输出日志
2. 打开浏览器开发者工具（F12）
3. 切换到 **Sources** 面板，在断点处调试

### React DevTools

1. 安装 [React Developer Tools](https://react.dev/learn/react-developer-tools) 浏览器扩展
2. 打开开发者工具中的 **Components** 和 **Profiler** 面板
3. 可查看组件树、Props、State 及渲染性能

### Vite 调试

```powershell
# 查看 Vite 详细日志
yarn dev --debug

# 强制重新构建依赖预构建缓存
yarn dev --force
```

### 常见问题排查

| 问题 | 排查方法 |
|------|----------|
| 端口被占用 | 使用 `yarn dev --port 3000` 指定其他端口 |
| 依赖安装失败 | 检查 yarn 镜像源：`yarn config get registry`，应为 `https://registry.npmmirror.com` |
| HMR 不生效 | 清除缓存：`yarn dev --force` |
| 类型报错 | 执行 `npx tsc --noEmit` 检查 TypeScript 类型 |
| 构建失败 | 执行 `yarn build` 查看完整错误日志 |

---

## 项目结构

```
my-react-app/
├── src/
│   ├── App.tsx          # 根组件
│   ├── App.css          # 根组件样式
│   ├── main.tsx         # 入口文件
│   └── index.css        # 全局样式
├── public/              # 静态资源目录
├── index.html           # HTML 模板
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 项目配置
```

---

## Oxlint 配置

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
