import { env } from '$env/dynamic/public';
import { query } from '$app/server';
import * as v from 'valibot';

type StreamInfo = {
    name: string;
} & Record<string, unknown>;

type Status = {
    items: StreamInfo[];
} & Record<string, unknown>;

const MTX_PROT = env.PUBLIC_MTX_PROT || 'http';
const MTX_HOST = env.PUBLIC_MTX_HOST || 'localhost';
const MTX_LIST = env.PUBLIC_MTX_LIST || 'v3/paths/list';
const MTX_USER = env.PUBLIC_MTX_USER || '';
const MTX_PASS = env.PUBLIC_MTX_PASS || '';
const MTX_UUID = env.PUBLIC_MTX_UUID || '';

async function getStreams(url: string, user: string, pass: string): Promise<StreamInfo[]> {
    const creds = btoa(`${user}:${pass}`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${creds}`
        }
    });

    if (!response.ok) {
        return [];
    }

    const data = (await response.json()) as Status;
    data.items = data.items.filter((item) => {
        return !item.name.startsWith(`${MTX_UUID}/`);
    });
    return data.items;
}

export const index = query.live(
    v.object({
        live: v.boolean(),
        timeout: v.number()
    }),
    async function* ({ live, timeout }) {
        console.log('starting...');

        while (live) {
            const data = await getStreams(`${MTX_PROT}://${MTX_HOST}/${MTX_LIST}`, MTX_USER, MTX_PASS);
            yield data;
            await new Promise((resolve) => setTimeout(resolve, timeout));
        }

        console.log('exited...');
    }
);
