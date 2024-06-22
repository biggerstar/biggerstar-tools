import {clearPromiseInterval, setPromiseInterval} from "../src";
import fs from "node:fs";
import * as path from "path";


const filepath = './test/.cache/setPromiseInterval.txt'

let cont = 0
const timer = setPromiseInterval(() => {
  block()
  writeFile()
  console.log(++cont)
}, 100)

function writeFile() {
  if (!fs.existsSync(filepath)) fs.mkdirSync(path.dirname(filepath), {recursive: true})
  const data = 'hello setPromiseInterval'.toString().repeat(1e7)
  fs.writeFileSync(filepath, data, "utf-8")
}

function block() {
  let cont = 0
  while (true) {
    cont++
    if (cont++ > 1e8) {
      break
    }
  }
}

setTimeout(() => {
  clearPromiseInterval(timer)
}, 5000)
