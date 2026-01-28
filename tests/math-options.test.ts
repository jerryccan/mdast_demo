import { describe, it, expect } from "vitest";
import { parseMarkdownContentWithMath } from "../src/extensions/math/math.js";

describe("Math Extension Options: singleDollarTextMath", () => {
  const md = "Here is some math: $E=mc^2$.";

  it("当 singleDollarTextMath 为 true (默认值) 时，应该解析为 inlineMath", () => {
    const tree = parseMarkdownContentWithMath(md, {
      singleDollarTextMath: true,
    });

    // 查找 inlineMath 节点
    const paragraph = tree.children[0] as any;
    const inlineMath = paragraph.children.find(
      (n: any) => n.type === "inlineMath",
    );

    expect(inlineMath).toBeDefined();
    expect(inlineMath.value).toBe("E=mc^2");
  });

  it("当 singleDollarTextMath 为 false 时，单美元符号 $ 不应解析为 inlineMath", () => {
    const tree = parseMarkdownContentWithMath(md, {
      singleDollarTextMath: false,
    });

    const paragraph = tree.children[0] as any;
    const inlineMath = paragraph.children.find(
      (n: any) => n.type === "inlineMath",
    );

    // 此时应该找不到 inlineMath 节点
    expect(inlineMath).toBeUndefined();

    // 文本内容应保留原始 $ 符号
    const textNode = paragraph.children.find((n: any) => n.type === "text");
    expect(textNode.value).toContain("$E=mc^2$");
  });

  it("当 singleDollarTextMath 为 false 时，双美元符号仍然可以解析为块级 math (如果符合语法)", () => {
    const blockMd = "$$\nE=mc^2\n$$";
    const tree = parseMarkdownContentWithMath(blockMd, {
      singleDollarTextMath: false,
    });

    const mathBlock = tree.children.find((n: any) => n.type === "math");
    expect(mathBlock).toBeDefined();
    expect((mathBlock as any).value).toBe("E=mc^2");
  });

  it("当 singleDollarTextMath 为 false 时，使用两个美元符号作为内联数学公式 (Pandoc 风格) 的行为", () => {
    const inlineDoubleMd =
      "Here is inline math with double dollars: $$E=mc^2$$.";
    const tree = parseMarkdownContentWithMath(inlineDoubleMd, {
      singleDollarTextMath: false,
    });

    // 注意：micromark-extension-math 默认情况下 $$...$$ 在段落中可能被解析为 inlineMath (如果开启了某种设置)
    // 或者它可能仍然解析为 inlineMath，因为 singleDollarTextMath 仅影响 *单个* 美元符号。

    const paragraph = tree.children[0] as any;
    const inlineMath = paragraph.children.find(
      (n: any) => n.type === "inlineMath",
    );

    // 验证双美元符号在 singleDollarTextMath: false 时是否仍然生效
    expect(inlineMath).toBeDefined();
    expect(inlineMath.value).toBe("E=mc^2");
  });
});
