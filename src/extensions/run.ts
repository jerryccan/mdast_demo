import { parseMarkdownWithMath } from './math.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const arg = process.argv[2] || path.join(__dirname, '../../examples/example-math.md')
  try {
    const tree = await parseMarkdownWithMath(arg)
    console.log('--- 数学公式扩展示例解析结果 ---')
    console.log(JSON.stringify(tree, null, 2))
  } catch (err) {
    console.error('解析失败:', err)
    process.exitCode = 1
  }
}

main()
