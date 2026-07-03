// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

// import type { MenuItem } from '$bricks/appsbar.svelte';
import type { User, Session } from 'better-auth';

declare global {
    namespace App {
        interface Locals {
            // menu: MenuItem[];
            session?: Session;
            user?: User;
        }

        // interface Error {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

// Untyped packages:
// declare module '@drop-in/graffiti/core';

export {};
