import { pgTable, text, serial, timestamp, index } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';
import { sql } from 'drizzle-orm';

export const post = pgTable(
    'post',
    {
        id: serial().primaryKey(),
        title: text().notNull(),
        slug: text().notNull(),
        body: text().notNull(),
        authorId: text('author_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        createdAt: timestamp('created_at')
            .default(sql`now()`)
            .notNull(),
        updatedAt: timestamp('updated_at')
            .default(sql`now()`)
            .notNull()
    },
    (table) => [index('post_authorId_idx').using('btree', table.authorId.asc().nullsLast())]
);
