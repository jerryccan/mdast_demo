import { describe, it, expect } from 'vitest'
import { parseMarkdown, parseMarkdownFile } from '../src/basic/index.js'
import { parseMarkdownWithMath } from '../src/extensions/math/math.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const examplesDir = path.join(__dirname, '../src/examples')

describe('基础用法 (Basic Usage)', () => {
  it('解析 example.md 并包含标题与列表', async () => {
    const filePath = path.join(examplesDir, 'example.md')
    const tree = await parseMarkdownFile(filePath)
    expect(tree.type).toBe('root')
    
    const heading = tree.children.find((n: any) => n.type === 'heading') as any
    expect(heading?.depth).toBe(1)
    expect(heading?.children?.[0].value).toBe('你好，Markdown')
    
    const list = tree.children.find((n: any) => n.type === 'list')
    expect(list).toBeTruthy()
  })

  it('parseMarkdown 字符串解析', () => {
    const md = '段落\n\n`inline`\n'
    const tree = parseMarkdown(md)
    expect(tree.type).toBe('root')
    expect(tree.children.some((n: any) => n.type === 'paragraph')).toBe(true)
  })
})

describe('数学公式扩展 (Math Extension)', () => {
  it('解析 example-math.md 应包含 math 节点', async () => {
    const filePath = path.join(examplesDir, 'example-math.md')
    const tree = await parseMarkdownWithMath(filePath)
    
    // 检查是否包含 inlineMath 节点
    const hasInlineMath = (node: any): boolean => {
      if (node.type === 'inlineMath') return true
      if (node.children) return node.children.some(hasInlineMath)
      return false
    }
    
    // 检查是否包含 math (块级) 节点
    const hasBlockMath = tree.children.some((n: any) => n.type === 'math')
    
    expect(tree.children.some(hasInlineMath)).toBe(true)
    expect(hasBlockMath).toBe(true)
  })
})
