import { execSync } from 'node:child_process'
import { resolve } from 'node:path'
import process from 'node:process'
import { defineConfig, ProgressEvent } from 'bumpp'

export default defineConfig({
  execute(config) {
    const { newVersion, updatedFiles } = config.state

    console.log(`Generating changelog for version ${newVersion}...`)

    const filename = 'CHANGELOG.md'
    execSync(`npx changelogen -r=${newVersion} --output=${filename}`, { encoding: 'utf-8' })
    execSync(`git add ${filename}`, { encoding: 'utf-8' })

    config.update({
      event: ProgressEvent.FileUpdated,
      updatedFiles: updatedFiles.concat(resolve(process.cwd(), filename)),
    })
  },
})
