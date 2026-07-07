import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/valibot';
import { post } from '$schema/default/main.schema';
import * as v from 'valibot';

const selectSchema = createSelectSchema(post);

const insertSchema = v.omit(
    createInsertSchema(post, {
        title: v.pipe(v.string(), v.minLength(5, 'Title too short')),
        body: v.pipe(v.string(), v.nonEmpty('Body is empty'))
    }),
    ['slug', 'authorId']
);

const updateSchema = createUpdateSchema(post, {
    title: (schema) => v.pipe(schema, v.minLength(5, 'Title too short')),
    body: (schema) => v.pipe(schema, v.nonEmpty('Body is empty'), v.maxLength(100, 'Bory too long'))
});

export { selectSchema, insertSchema, updateSchema };

// export type InsertSchema = v.InferOutput<typeof insertSchema>;
