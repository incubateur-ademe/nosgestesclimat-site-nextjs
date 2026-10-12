import type { Logger } from '../src/features/logger/index.ts'
import { prisma } from '../src/prisma/client.ts'
import { seedDemoData } from '../src/seeds/seed-demo-data.service.ts'

/**
 * Seeds a local database with the demo dataset.
 *
 * The dataset itself is described by the feature seeds and composed by
 * `seedDemoData`; this entry point only reports progress and closes the
 * connection. Every line carries the elapsed time, so a run that spends most of
 * its time evaluating the model says so.
 */
const startedAt = Date.now()

const report = (message: string) => {
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1)
  console.log(`[seed +${elapsed}s] ${message}`)
}

const logger: Logger = {
  child: () => logger,
  // No tracer in a one-shot seed script: the span is a no-op.
  openSpan: (_scope, run) => run(logger),
  setSpanAttribute: () => undefined,
  info: report,
  warn: (message: string | Error) =>
    report(message instanceof Error ? message.message : message),
  debug: report,
  error: (error, meta) => console.error(error, meta ?? ''),
  fatal: (error, meta) => console.error(error, meta ?? ''),
}

seedDemoData({ logger })
  .then(async ({ skipped, accounts, organisations, polls }) => {
    report(
      skipped
        ? 'Done: the demo data was already seeded.'
        : `Done: ${accounts} account(s), ${organisations} organisation(s), ` +
            `${polls.length} poll(s)`
    )

    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
