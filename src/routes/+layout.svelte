<script lang="ts">
    import { ModeWatcher, setMode, resetMode } from 'mode-watcher';
    import * as DropdownMenu from '$ui/dropdown-menu/index.js';
    import { Button, buttonVariants } from '$ui/button';
    import AppSidebar from '$bricks/appsbar.svelte';
    import Toaster from '$bricks/toaster.svelte';
    import * as Sidebar from '$ui/sidebar';
    import { page } from '$app/state';

    import { MenuIcon, MoonIcon, SunIcon, HouseIcon as HomeIcon, SearchIcon, BellIcon, UserIcon } from '@lucide/svelte';
    import FavIcon from '$icons/favicon.svg';

    import '$css/custom.css';

    let formattedTitle = $derived(() => {
        const path = page.url.pathname.split('/').filter(Boolean).pop();
        if (!path) return 'Home';
        return path.charAt(0).toUpperCase() + path.slice(1);
    });

    let pageTitle = $state('');

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" type="image/svg+xml" href={FavIcon} />
</svelte:head>

<ModeWatcher />
<Toaster />

<Sidebar.Provider open={false}>
    <AppSidebar />

    <Sidebar.Inset>
        <header id="global-header">
            <div class="flex items-center gap-4">
                <Sidebar.Trigger class="hidden md:block">
                    <Button variant="outline" size="icon">
                        <MenuIcon class="h-4 w-4" />
                    </Button>
                </Sidebar.Trigger>
            </div>

            <div class="flex items-center gap-4">
                <span class="font-bold text-lg">{pageTitle || formattedTitle()}</span>
            </div>

            <div class="flex items-center gap-4">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
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

        <main id="global-content">
            {@render children()}
        </main>

        <footer id="global-footer">
            <Button variant="ghost" size="icon" class="flex flex-col gap-1 h-full flex-1" aria-label="Home">
                <HomeIcon class="h-5 w-5" />
                <span class="text-[10px]">Home</span>
            </Button>

            <Button variant="ghost" size="icon" class="flex flex-col gap-1 h-full flex-1" aria-label="Search">
                <SearchIcon class="h-5 w-5" />
                <span class="text-[10px]">Search</span>
            </Button>

            <Button variant="ghost" size="icon" class="flex flex-col gap-1 h-full flex-1" aria-label="Notifications">
                <BellIcon class="h-5 w-5" />
                <span class="text-[10px]">Alerts</span>
            </Button>

            <Button variant="ghost" size="icon" class="flex flex-col gap-1 h-full flex-1" aria-label="Profile">
                <UserIcon class="h-5 w-5" />
                <span class="text-[10px]">Profile</span>
            </Button>
        </footer>
    </Sidebar.Inset>
</Sidebar.Provider>
