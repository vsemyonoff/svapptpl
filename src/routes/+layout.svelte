<script lang="ts">
    // Libs
    import { ModeWatcher, setMode, resetMode } from 'mode-watcher';
    import * as DropdownMenu from '$ui/dropdown-menu/index.js';
    import { afterNavigate, goto } from '$app/navigation';
    import { usePrevPage } from '$client/prevpage.svelte';
    import { Button, buttonVariants } from '$ui/button';
    import AppSidebar from '$bricks/appsbar.svelte';
    import Toaster from '$bricks/toaster.svelte';
    import SbarBtn from '$bricks/sbarbtn.svelte';
    import type { Pathname } from '$app/types';
    import * as Sidebar from '$ui/sidebar';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';

    // Icons
    import FavIcon from '$icons/favicon.svg';
    import {
        MoonIcon,
        Undo2Icon,
        SunIcon,
        HouseIcon as HomeIcon,
        SearchIcon,
        BellIcon,
        UserIcon
    } from '@lucide/svelte';

    // Styles
    import '$css/custom.css';

    const prevPage = usePrevPage();
    let pageTitle = $state('');
    let open = $state(false);

    afterNavigate(({ from }) => {
        if (from?.url.pathname) {
            prevPage.set(from.url.pathname);
        }
    });

    function onPrevPage() {
        goto(resolve(prevPage.get() as Pathname));
    }

    let formattedTitle = $derived(() => {
        const path = page.url.pathname.split('/').filter(Boolean).pop();
        if (!path) return 'Home';
        return path.charAt(0).toUpperCase() + path.slice(1);
    });

    let timeoutId: ReturnType<typeof setTimeout>;

    function onSideBarEnter() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            open = true;
        }, 150);
    }

    function onSideBarLeave() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            open = false;
        }, 150);
    }

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" type="image/svg+xml" href={FavIcon} />
</svelte:head>

<ModeWatcher />
<Toaster />

<Sidebar.Provider bind:open>
    <AppSidebar variant="floating" onmouseenter={onSideBarEnter} onmouseleave={onSideBarLeave} />

    <Sidebar.Inset>
        <header id="global-header">
            <div class="flex items-center gap-4">
                <Button variant="ghost" onclick={onPrevPage} size="icon">
                    <Undo2Icon class="icon-default" />
                </Button>
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
            <SbarBtn>
                <span class="text-[10px]">Menu</span>
            </SbarBtn>

            <Button variant="ghost" size="icon" class="flex flex-col gap-1 h-full flex-1" aria-label="Home">
                <HomeIcon class="icon-default" />
                <span class="text-[10px]">Home</span>
            </Button>

            <Button variant="ghost" size="icon" class="flex flex-col gap-1 h-full flex-1" aria-label="Search">
                <SearchIcon class="icon-default" />
                <span class="text-[10px]">Search</span>
            </Button>

            <Button variant="ghost" size="icon" class="flex flex-col gap-1 h-full flex-1" aria-label="Notifications">
                <BellIcon class="icon-default" />
                <span class="text-[10px]">Alerts</span>
            </Button>

            <Button variant="ghost" size="icon" class="flex flex-col gap-1 h-full flex-1" aria-label="Profile">
                <UserIcon class="icon-default" />
                <span class="text-[10px]">Profile</span>
            </Button>
        </footer>
    </Sidebar.Inset>
</Sidebar.Provider>
