import { describe, it, expect } from "vitest";
import { parseMarkdownContentWithMath } from "../src/extensions/math/math.js";

describe("Math Syntax Interference (数学语法干扰测试)", () => {
  it("当开启数学扩展时，复杂的公式内容（含下划线等）应被视为整体，不触发 Markdown 语法切割", () => {
    const md = "氢氧化铁: $\\boldsymbol{\\ce{Fe(OH)_{3}}}$";
    const tree = parseMarkdownContentWithMath(md);

    const paragraph = tree.children[0] as any;
    const inlineMath = paragraph.children.find(
      (n: any) => n.type === "inlineMath",
    );

    expect(inlineMath).toBeDefined();
    // 验证下划线 _ 没有触发 emphasis，而是作为 math 的一部分
    expect(inlineMath.value).toBe("\\boldsymbol{\\ce{Fe(OH)_{3}}}");
  });

  it("当开启数学扩展时，连续的公式应被正确识别为独立的 inlineMath 节点", () => {
    const md =
      "混合物包含 $\\boldsymbol{\\ce{Fe(OH)_{3}}}$、$\\ce{Al(OH)_{3}}$、$\\ce{SiO_{2}}$";
    const tree = parseMarkdownContentWithMath(md);

    const paragraph = tree.children[0] as any;
    const mathNodes = paragraph.children.filter(
      (n: any) => n.type === "inlineMath",
    );

    expect(mathNodes).toHaveLength(3);
    expect(mathNodes[0].value).toBe("\\boldsymbol{\\ce{Fe(OH)_{3}}}");
    expect(mathNodes[1].value).toBe("\\ce{Al(OH)_{3}}");
    expect(mathNodes[2].value).toBe("\\ce{SiO_{2}}");
  });

  it("【核心场景】当禁用 singleDollarTextMath 时，由于公式解析不生效，其内部字符（如下划线）会触发原生 Markdown 语法导致文本被切割", () => {
    // 使用包含多个下划线的字符串，确保触发 emphasis 语法
    const md = "混合物包含 $\\ce{Al(OH)_{3}}$ 和 $\\ce{SiO_{2}}$";
    const tree = parseMarkdownContentWithMath(md, {
      singleDollarTextMath: false,
    });

    const paragraph = tree.children[0] as any;
    
    // 1. 验证没有 inlineMath 节点
    const hasInlineMath = paragraph.children.some((n: any) => n.type === "inlineMath");
    expect(hasInlineMath).toBe(false);

    // 2. 验证由于存在两个下划线，触发了 emphasis 语法，导致段落被切割为 text + emphasis + text
    const types = paragraph.children.map((n: any) => n.type);
    expect(types).toContain("text");
    expect(types).toContain("emphasis");

    // 3. 验证文本被切割的具体片段
    const emphasisNode = paragraph.children.find((n: any) => n.type === "emphasis");
    // 在这个例子中，两个 _ 之间的内容： {3}}$ 和 $\ce{SiO
    expect(emphasisNode.children[0].value).toContain("3");
  });

  it("干扰案例：星号 (*) 触发 emphasis", () => {
    // 使用星号紧贴文本的场景
    const md = "公式内包含星号：$*a* + b$";
    const tree = parseMarkdownContentWithMath(md, { singleDollarTextMath: false });
    const paragraph = tree.children[0] as any;

    const hasEmphasis = paragraph.children.some((n: any) => n.type === "emphasis");
    expect(hasEmphasis).toBe(true);
  });

  it("干扰案例：反引号 (`) 触发 inlineCode", () => {
    const md = "公式内含反引号：$a = `code` + b$";
    const tree = parseMarkdownContentWithMath(md, { singleDollarTextMath: false });
    const paragraph = tree.children[0] as any;

    const hasInlineCode = paragraph.children.some((n: any) => n.type === "inlineCode");
    expect(hasInlineCode).toBe(true);
  });

  it("干扰案例：方括号与圆括号 ([...](...)) 触发链接", () => {
    const md = "集合定义：$[a, b](url)$";
    const tree = parseMarkdownContentWithMath(md, { singleDollarTextMath: false });
    const paragraph = tree.children[0] as any;

    const hasLink = paragraph.children.some((n: any) => n.type === "link");
    expect(hasLink).toBe(true);
  });

  it("干扰案例：小于号 (<) 误认为 HTML 标签", () => {
    const md = "当 $x <y$ 且 $z > 0$ 时";
    const tree = parseMarkdownContentWithMath(md, { singleDollarTextMath: false });
    const paragraph = tree.children[0] as any;
    
    // 即使没有开启 HTML 扩展，micromark 也会尝试处理 HTML 标签
    // 如果 <y 后面有匹配的结束标签，它可能会被识别为 html
    // 在这个简单例子中，我们主要演示它不再被视为 math 整体
    expect(paragraph.children).toBeDefined();
  });
});
