import { pgTable, serial, text, timestamp, index } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

export const post = pgTable(
    'post',
    {
        id: serial().primaryKey(),
        title: text().notNull(),
        slug: text().notNull(),
        body: text().notNull(),
        authorId: text('author_id').references(() => user.id, { onDelete: 'cascade' }),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull()
    },
    (table) => [index('post_authorId_idx').on(table.authorId)]
);

export * from './auth.schema';
