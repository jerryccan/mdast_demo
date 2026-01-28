# mdast-demo

这是一个演示如何使用 `mdast-util-from-markdown` 解析 Markdown 为 **MDAST**（Markdown Abstract Syntax Tree）的项目。

项目包含了两个层面的示例：
1. **基础用法**: 仅使用默认配置解析标准 Markdown。
2. **扩展用法**: 使用扩展插件（如数学公式 `math`）解析非标准 Markdown。

## 项目结构

```text
.
├── examples/               # 示例 Markdown 文件
│   ├── example.md          # 基础示例
│   └── example-math.md     # 数学公式示例
├── src/
│   ├── basic/              # 基础用法实现
│   │   ├── index.ts        # 基础解析函数
│   │   └── run.ts          # 基础用法演示入口
│   └── extensions/         # 扩展用法实现
│       ├── math.ts         # 数学公式解析配置
│       └── run.ts          # 扩展用法演示入口
├── tests/                  # 单元测试
└── package.json            # 项目配置与依赖
```

## 如何使用

### 1. 安装依赖

```bash
npm install
```

### 2. 运行演示

#### 基础用法演示
解析标准 Markdown（不包含扩展语法）：
```bash
npm run demo:basic
```

#### 数学公式扩展示例
演示如何配置并解析数学公式（`$` 和 `$$`）：
```bash
npm run demo:math
```

### 3. 运行测试

```bash
npm test
```

### 4. 断点调试 (Debugging)

#### 方式 A: VS Code (推荐)
1. 安装 **Vitest** 官方扩展。
2. 在测试文件（如 `tests/math-options.test.ts`）中点击行号左侧设置断点。
3. 点击测试函数旁边的调试图标，选择 **Debug Test**。

#### 方式 B: 命令行 + 浏览器
1. 在代码中插入 `debugger;` 语句。
2. 运行调试脚本：
   ```bash
   npm run test:debug <测试文件路径>
   ```
3. 打开 Chrome 访问 `chrome://inspect`，点击 "Open dedicated DevTools for Node" 进行调试。

## 技术栈

- [mdast-util-from-markdown](https://github.com/syntax-tree/mdast-util-from-markdown) - 核心解析引擎
- [micromark-extension-math](https://github.com/micromark/micromark-extension-math) - 数学公式语法支持
- [mdast-util-math](https://github.com/syntax-tree/mdast-util-math) - 数学公式 MDAST 支持
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
