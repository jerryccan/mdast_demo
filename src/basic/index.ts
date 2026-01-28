import { readFile } from 'node:fs/promises'
import { fromMarkdown } from 'mdast-util-from-markdown'

export type MdastRoot = ReturnType<typeof fromMarkdown>

/**
 * 基本用法：将 Markdown 字符串解析为 MDAST
 */
export function parseMarkdown(markdown: string): MdastRoot {
  return fromMarkdown(markdown)
}

/**
 * 基本用法：将 Markdown 文件解析为 MDAST
 */
export async function parseMarkdownFile(filePath: string | URL): Promise<MdastRoot> {
  const md = await readFile(filePath, 'utf8')
  return fromMarkdown(md)
}
