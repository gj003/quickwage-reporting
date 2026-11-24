import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

type Row = Record<string, unknown>;

/**
 * Turn a TypeORM SelectQueryBuilder into an AsyncIterable suitable for the
 * report streaming methods.
 *
 * Usage:
 *   const qb = this.repo
 *     .createQueryBuilder('e')
 *     .select(['e.id', 'e.name', 'e.salary'])
 *     .where(...);
 *   await reports.stream(fromQueryBuilder(qb), res, { format: 'xlsx' });
 *
 * - Uses `.stream()` which returns a `pg` cursor — constant memory.
 * - Converts the raw DB row shape (`e_id`, `e_name`) to a flattened map by
 *   default; pass `mapRow` to customize column names or shape.
 * - Honors an optional AbortSignal so a client disconnect stops the cursor.
 */
export async function* fromQueryBuilder<T extends Row>(
  qb: SelectQueryBuilder<ObjectLiteral>,
  opts: {
    mapRow?: (raw: Record<string, unknown>) => T;
    signal?: AbortSignal;
  } = {},
): AsyncGenerator<Row> {
  const cursor = await qb.stream();

  const cleanup = () => {
    // pg's Readable from `qb.stream()` supports destroy.
    if (!cursor.destroyed) cursor.destroy();
  };

  if (opts.signal) {
    if (opts.signal.aborted) {
      cleanup();
      return;
    }
    opts.signal.addEventListener('abort', cleanup, { once: true });
  }

  try {
    for await (const raw of cursor) {
      yield opts.mapRow ? opts.mapRow(raw as Record<string, unknown>) : flattenAlias(raw);
    }
  } finally {
    cleanup();
  }
}

// Strip the alias prefix TypeORM adds to raw cursor rows (e.g. `e_id` → `id`).
function flattenAlias(raw: Record<string, unknown>): Row {
  const out: Row = {};
  for (const key of Object.keys(raw)) {
    const idx = key.indexOf('_');
    out[idx > 0 ? key.slice(idx + 1) : key] = raw[key];
  }
  return out;
}
