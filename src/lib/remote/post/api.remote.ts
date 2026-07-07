import { command, form, getRequestEvent, query } from '$app/server';
import { post } from '$schema/default/main.schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$db/default';
import * as v from 'valibot';

export const index = query(async () => {
    return db.select().from(post);
});

export const get = query(v.number(), async (id) => {
    return await db.select().from(post).where(eq(post.id, id));
});

export const remove = command(v.number(), async (id) => {
    const event = getRequestEvent();
    const user = event.locals.user;

    if (!user) error(401, 'Unauthorized');

    await db.delete(post).where(eq(post.id, id));
    return { success: true };
});

export const insert = form(
    v.object({
        title: v.pipe(v.string(), v.nonEmpty('Title is empty')),
        body: v.pipe(v.string(), v.nonEmpty('Body is empty'))
    }),

    async ({ title, body }) => {
        const event = getRequestEvent();
        const user = event.locals.user;

        if (!user) error(401, 'Unauthorized');

        const slug = title.toLowerCase().replace(/ /g, '-');
        await db.insert(post).values({
            title: title,
            slug: slug,
            body: body,
            authorId: user.id
        });

        return { success: true };
    }
);

export const update = form(
    v.object({
        id: v.number(),
        title: v.string(),
        body: v.string()
    }),

    async ({ id, title, body }) => {
        const event = getRequestEvent();
        const user = event.locals.user;

        if (!user) error(401, 'Unauthorized');

        const slug = title.toLowerCase().replace(/ /g, '-');
        await db
            .update(post)
            .set({
                title: title,
                slug: slug,
                body: body
            })
            .where(eq(post.id, id));

        return { success: true };
    }
);
