const puppeteer = require("puppeteer")
const fs = require("fs")

const headless = false

const test = async (name) => {
  const browser = await puppeteer.launch({ headless, timeout: 0 })
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()
  await page.emulateCPUThrottling(6)

  const root = `benchmark/${name}`
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }
  await page.tracing.start({ path: `${root}/tracing.json` })
  page.setDefaultNavigationTimeout(0)
  await page.goto(`http://localhost:3000/${name}`, {
    waitUntil: "load",
    timeout: 0,
  })
  await navigationPromise

  const count = 4
  for (let i = 0; i < count; i++) {
    await page.type(`[name=input-${i}]`, "Hello")
    for (let j = 0; j < count; j++) {
      await page.type(`[name=input-${i}-0-${j}]`, "Hello")
    }
  }

  await page.tracing.stop()

  const metrics = await page.metrics()
  fs.writeFileSync(`${root}/metrics.json`, JSON.stringify(metrics))

  await page.screenshot({ path: `${root}/screen-end.png` })

  await browser.close()
}

;(async () => {
  await test("reatom-form")
  await test("final-form")
  // await test("formik")
  await test("react-hook-form")
})()
