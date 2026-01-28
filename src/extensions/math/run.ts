import { parseMarkdownWithMath, parseMarkdownContentWithMath } from './math.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const arg = process.argv[2] || path.join(__dirname, '../../examples/example-math.md')
  
  console.log('--- 场景 1: 默认配置 (singleDollarTextMath: true) ---')
  try {
    const tree = await parseMarkdownWithMath(arg, { singleDollarTextMath: true })
    console.log('解析成功，包含 inlineMath 和 math 节点')
    // 简化输出，只展示节点类型
    console.log('节点类型统计:', countNodes(tree))
  } catch (err) {
    console.error('解析失败:', err)
  }

  console.log('\n--- 场景 2: 禁用单美元公式 (singleDollarTextMath: false) ---')
  const demoMd = '价格是 $10.00 和 $20.00，公式是 $$E=mc^2$$.'
  console.log('测试文本:', demoMd)
  try {
    const tree = parseMarkdownContentWithMath(demoMd, { singleDollarTextMath: false })
    const hasInlineMath = JSON.stringify(tree).includes('inlineMath')
    console.log('是否包含 inlineMath:', hasInlineMath)
    console.log('节点类型统计:', countNodes(tree))
  } catch (err) {
    console.error('解析失败:', err)
  }
}

function countNodes(node: any, stats: Record<string, number> = {}) {
  stats[node.type] = (stats[node.type] || 0) + 1
  if (node.children) {
    node.children.forEach((child: any) => countNodes(child, stats))
  }
  return stats
}

main()
