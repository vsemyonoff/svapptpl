import { defineRelations } from 'drizzle-orm';
import * as schema from '$server/db/schema';

export const relations = defineRelations(schema, (r) => ({
    account: {
        user: r.one.user({
            from: r.account.userId,
            to: r.user.id
        })
    },
    user: {
        accounts: r.many.account(),
        posts: r.many.post(),
        sessions: r.many.session()
    },
    post: {
        user: r.one.user({
            from: r.post.authorId,
            to: r.user.id
        })
    },
    session: {
        user: r.one.user({
            from: r.session.userId,
            to: r.user.id
        })
    }
}));
