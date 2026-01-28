import { describe, it, expect } from "vitest";
import { parseMarkdownContentWithMath } from "../src/extensions/math/math.js";

describe("Chemistry Formulas with Math Extension", () => {
  it("解析包含 \\ce 的复杂化学公式 (boldsymbol)", () => {
    const md = "氢氧化铁: $\\boldsymbol{\\ce{Fe(OH)_{3}}}$";
    const tree = parseMarkdownContentWithMath(md);

    const paragraph = tree.children[0] as any;
    const inlineMath = paragraph.children.find(
      (n: any) => n.type === "inlineMath",
    );

    expect(inlineMath).toBeDefined();
    expect(inlineMath.value).toBe("\\boldsymbol{\\ce{Fe(OH)_{3}}}");
  });

  it("解析多个连续的化学公式", () => {
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

  it("当 singleDollarTextMath 为 false 时，连续的化学公式不应解析为 inlineMath", () => {
    const md =
      "混合物包含 $\\boldsymbol{\\ce{Fe(OH)_{3}}}$、$\\ce{Al(OH)_{3}}$、$\\ce{SiO_{2}}$";
    const tree = parseMarkdownContentWithMath(md, {
      singleDollarTextMath: false,
    });

    const paragraph = tree.children[0] as any;
    const mathNodes = paragraph.children.filter(
      (n: any) => n.type === "inlineMath",
    );

    // 应该没有 inlineMath 节点
    expect(mathNodes).toHaveLength(0);

    // 所有内容应该合并在 text 节点中
    // 注意：即使 singleDollarTextMath 为 false，下划线 _ 仍会被解析为强调 (emphasis)
    const hasInlineMath = paragraph.children.some((n: any) => n.type === "inlineMath");
    expect(hasInlineMath).toBe(false);

    // 验证内容确实包含了原始文本的片段（由于下划线会被解析为 emphasis，所以文本会被拆分）
    const fullText = paragraph.children.map((n: any) => {
      if (n.type === "text") return n.value;
      if (n.type === "emphasis") return "_" + n.children[0].value + "_";
      return "";
    }).join("");
    
    expect(fullText).toContain("Fe(OH)");
  });
});
