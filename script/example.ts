
import { join } from "path"
import { existsSync } from "fs"

;( async () => {
    const file = process.argv.at(2)
    const timestrap = Date.now()

    const file_path = [join(__dirname, `../example/${file}.ts`), join(__dirname, `../example/${file}/index.ts`)].find(v => existsSync(v))
    if(!file_path) throw new Error(`file ${file}, not exist`)

    await import(`file://${file_path}`)

    console.log("deno.:", Date.now() - timestrap, "ms")
})();
