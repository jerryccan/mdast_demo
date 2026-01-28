import { readFile } from 'node:fs/promises'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { math } from 'micromark-extension-math'
import { mathFromMarkdown } from 'mdast-util-math'

/**
 * 扩展示例：解析带有数学公式的 Markdown
 */
export async function parseMarkdownWithMath(filePath: string | URL) {
  const md = await readFile(filePath, 'utf8')
  
  const tree = fromMarkdown(md, {
    extensions: [math()],
    mdastExtensions: [mathFromMarkdown()]
  })
  
  return tree
}
