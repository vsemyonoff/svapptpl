import { command, form, getRequestEvent, query } from '$app/server';
import { error, redirect } from '@sveltejs/kit';
import { post } from './server/db/main.schema';
import { eq } from 'drizzle-orm';
import { db } from '$server/db';
import * as v from 'valibot';

export const index = query(async () => {
    return db.select().from(post);
});

export const get = query(v.number(), async (id) => {
    const event = getRequestEvent();
    const user = event.locals.user;

    if (!user) error(401, 'Unauthorized');

    return await db.select().from(post).where(eq(post.id, id));
});

export const remove = command(v.number(), async (id) => {
    return await db.delete(post).where(eq(post.id, id));
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

        redirect(303, '/blog');
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

        redirect(303, '/blog');
    }
);
