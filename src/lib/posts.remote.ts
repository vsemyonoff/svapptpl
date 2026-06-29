import { query } from '$app/server';
import { db } from '$server/db';

export const index = query(async () => db.query.post.findMany());
