import { parseMarkdownFile } from './index.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const arg = process.argv[2] || path.join(__dirname, '../../examples/example.md')
  try {
    const tree = await parseMarkdownFile(arg)
    console.log('--- 基本用法解析结果 ---')
    console.log(JSON.stringify(tree, null, 2))
  } catch (err) {
    console.error('解析失败:', err)
    process.exitCode = 1
  }
}

main()
