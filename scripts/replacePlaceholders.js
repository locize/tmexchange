// scripts/replacePlaceholders.js
// Replaces __NAME__ and __VERSION__ in built files with values from package.json

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pkgPath = path.join(__dirname, '..', 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

const targets = [
  'esm/js2tmx.js',
  'cjs/js2tmx.js'
  // Add more files if needed
]

for (const file of targets) {
  const filePath = path.join(__dirname, '..', file)
  if (!fs.existsSync(filePath)) continue
  let content = fs.readFileSync(filePath, 'utf8')
  content = content.replace(/__NAME__/g, pkg.name).replace(/__VERSION__/g, pkg.version)
  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`Replaced placeholders in ${file}`)
}
