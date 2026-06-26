<script lang="ts">
    import { ModeWatcher, setMode, resetMode } from 'mode-watcher';
    import Alerts from '$bricks/alerts.svelte';
    import { buttonVariants } from '$ui/button/index.js';
    import * as DropdownMenu from '$ui/dropdown-menu/index.js';
    import SunIcon from '@lucide/svelte/icons/sun';
    import MoonIcon from '@lucide/svelte/icons/moon';

    import favicon from '$icons/favicon.svg';
    import '$css/custom.css';

    import AppSidebar from '$bricks/appsbar.svelte';
    import * as Sidebar from '$ui/sidebar';
    import Button from '$ui/button/button.svelte';
    import Menu from '@lucide/svelte/icons/menu';
    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<Sidebar.Provider>
    <!-- 1. The left-side navigation rail -->
    <AppSidebar />

    <!-- 2. Main wrapper that shifts layout when sidebar expands -->
    <Sidebar.Inset>
        <!-- Top Navbar / Header Section -->
        <header class="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-background">
            <div class="flex items-center gap-4">
                <!-- Built-in trigger toggles desktop/mobile view -->
                <Sidebar.Trigger>
                    <Button variant="outline" size="icon">
                        <Menu class="h-4 w-4" />
                    </Button>
                </Sidebar.Trigger>
                <span class="font-semibold text-lg">My Platform</span>
            </div>

            <Alerts />

            <!-- Right side Navbar elements (e.g., User Profile, Theme Toggle) -->
            <div class="flex items-center gap-4">
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
            </div>
        </header>

        <!-- 3. Dynamic Page Body Content -->
        <main id="root" class="flex-1 overflow-y-auto p-6">
            {@render children()}
        </main>
    </Sidebar.Inset>
</Sidebar.Provider>
