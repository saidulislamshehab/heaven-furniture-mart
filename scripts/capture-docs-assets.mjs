import { createServer } from 'vite'
import { chromium } from '@playwright/test'
import path from 'node:path'

async function capture() {
  const screenshotDir = path.resolve('docs/screenshots')

  console.log('Starting Vite server...')
  const server = await createServer({
    server: { port: 5197 },
  })
  await server.listen()

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  try {
    console.log('Navigating to home page...')
    await page.goto('http://localhost:5197', { waitUntil: 'networkidle' })

    // Wait for intro curtain and headline stagger to fully settle (~7.5s)
    console.log('Waiting for hero typography to settle...')
    await page.waitForTimeout(7500)

    console.log('Capturing settled Hero screenshot...')
    await page.screenshot({
      path: path.join(screenshotDir, '01-hero-landing.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    })

    // Scroll down to reveal AI Assistant widget
    console.log('Scrolling down to reveal AI Assistant widget...')
    await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }))
    await page.waitForTimeout(1200)

    const assistantBtn = page.locator('button[aria-label*="assistant"]').first()
    await assistantBtn.waitFor({ state: 'visible', timeout: 5000 })
    await assistantBtn.click()
    await page.waitForTimeout(1500)

    // Dedicated high-res close-up of the AI Assistant dialog
    const panel = page.locator('section[role="dialog"]')
    await panel.waitFor({ state: 'visible', timeout: 5000 })
    const box = await panel.boundingBox()
    if (box) {
      console.log('Capturing close-up of AI Concierge widget...', box)
      // Add a little padding around the widget for shadow and aesthetic border
      const pad = 24
      await page.screenshot({
        path: path.join(screenshotDir, 'ai-concierge-widget.png'),
        clip: {
          x: Math.max(0, box.x - pad),
          y: Math.max(0, box.y - pad),
          width: box.width + pad * 2,
          height: box.height + pad * 2,
        },
      })
    }

    console.log('Done!')
  } catch (err) {
    console.error('Error during capture:', err)
  } finally {
    await browser.close()
    await server.close()
  }
}

capture().catch(console.error)
