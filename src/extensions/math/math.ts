import { readFile } from 'node:fs/promises'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { math, type Options as MathOptions } from 'micromark-extension-math'
import { mathFromMarkdown } from 'mdast-util-math'

/**
 * 扩展示例：解析带有数学公式的内容
 */
export function parseMarkdownContentWithMath(content: string, options?: MathOptions) {
  const tree = fromMarkdown(content, {
    extensions: [math(options)],
    mdastExtensions: [mathFromMarkdown()]
  })
  
  return tree
}

/**
 * 扩展示例：解析带有数学公式的 Markdown 文件
 */
export async function parseMarkdownWithMath(filePath: string | URL, options?: MathOptions) {
  const md = await readFile(filePath, 'utf8')
  return parseMarkdownContentWithMath(md, options)
}
