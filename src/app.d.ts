// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { User, Session } from 'better-auth';

declare global {
    namespace App {
        interface Locals {
            user?: User;
            session?: Session;
        }

        // interface Error {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

// Untyped packages
declare module '@drop-in/graffiti/components';
declare module '@drop-in/graffiti/core';
declare module '@drop-in/graffiti/layouts';
declare module '@drop-in/graffiti/utilities';
declare module '@drop-in/graffiti/themes';

export {};
