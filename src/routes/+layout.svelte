<script lang="ts">
    import { ModeWatcher, setMode, resetMode } from 'mode-watcher';
    import Alerts from '$bricks/alerts.svelte';
    import { buttonVariants } from '$ui/button/index.js';
    import * as DropdownMenu from '$ui/dropdown-menu/index.js';
    import SunIcon from '@lucide/svelte/icons/sun';
    import MoonIcon from '@lucide/svelte/icons/moon';

    import favicon from '$icons/favicon.svg';
    import '$css/custom.css';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <nav class="flex items-center justify-between max-w-7xl mx-auto">
            <span class="font-bold">My App</span>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
                    <SunIcon class="day-icon" />
                    <MoonIcon class="night-icon" />
                    <span class="sr-only">Toggle theme</span>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Item onclick={() => setMode('light')}>Light</DropdownMenu.Item>
                    <DropdownMenu.Item onclick={() => setMode('dark')}>Dark</DropdownMenu.Item>
                    <DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </nav>
    </header>

    <div class="flex-1 flex">
        <aside class="hidden w-64 border-r md:block">Main menu:</aside>

        <main class="flex-1 overflow-y-auto">
            <div id="root">
                <Alerts />
                {@render children()}
            </div>
        </main>
    </div>
</div>
