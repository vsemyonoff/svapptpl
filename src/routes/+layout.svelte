<script lang="ts">
    // Libs
    import { afterNavigate, goto, invalidateAll } from '$app/navigation';
    import { ModeWatcher, setMode, resetMode } from 'mode-watcher';
    import { PrevPage } from '$client/prevpage.svelte';
    import * as DropdownMenu from '$ui/dropdown-menu';
    import AppSbar from '$bricks/appsbar.svelte';
    import SbarBtn from '$bricks/sbarbtn.svelte';
    import Toaster from '$bricks/toaster.svelte';
    import type { LayoutProps } from './$types';
    import * as BottomNav from '$ui/bottom-nav';
    import { buttonVariants } from '$ui/button';
    import { authClient } from '$client/auth';
    import FavIcon from '$icons/favicon.svg';
    import * as Icons from '@lucide/svelte';
    import * as Sidebar from '$ui/sidebar';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';

    // Styles
    import '$css/custom.css';

    type IconsIndex = keyof typeof Icons;

    // Icons
    const LogoutIcon = Icons['LogOut'] as Icons.LucideIcon;
    const LoginIcon = Icons['LogIn'] as Icons.LucideIcon;
    const OrbitIcon = Icons['Orbit'] as Icons.LucideIcon;
    const MoonIcon = Icons['Moon'] as Icons.LucideIcon;
    const UserIcon = Icons['User'] as Icons.LucideIcon;
    const SunIcon = Icons['Sun'] as Icons.LucideIcon;

    const prevPage = new PrevPage();

    afterNavigate(({ from }) => {
        if (from) {
            prevPage.path = from.url.pathname;
        }
    });

    let pageTitle = $state('');
    let formattedTitle = $derived(() => {
        const path = page.url.pathname.split('/').filter(Boolean).pop();
        if (!path) return 'Home';
        return path.charAt(0).toUpperCase() + path.slice(1);
    });

    let timeoutId: ReturnType<typeof setTimeout>;
    let open = $state(false);

    let autoHide = $state(true);

    function onSideBarEnter() {
        if (!autoHide) return;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            open = true;
        }, 150);
    }

    function onSideBarLeave() {
        if (!autoHide) return;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            open = false;
        }, 150);
    }

    let { data, children }: LayoutProps = $props();
    let user = $derived(data.user);

    async function onLogout() {
        if (!user) return;

        await authClient.signOut();
        // INFO: CRUCIAL. Re-run all server-side `load` functions
        await invalidateAll();
    }

    async function onLogin() {
        await goto(resolve(`/auth?redirectTo=${encodeURIComponent(page.url.pathname)}`));
    }
</script>

<svelte:head>
    <link rel="icon" type="image/svg+xml" href={FavIcon} />
</svelte:head>

<ModeWatcher />
<Toaster />

<Sidebar.Provider bind:open>
    <AppSbar items={data.menu} variant="floating" onmouseenter={onSideBarEnter} onmouseleave={onSideBarLeave} />

    <Sidebar.Inset>
        <header id="global-header">
            <div class="flex items-center gap-4">
                <SbarBtn
                    onClick={() => {
                        autoHide = !autoHide;
                    }}
                />
                <span class="sr-only">Menu toggle</span>
            </div>

            <div class="flex items-center gap-4">
                <span class="hidden md:inline font-bold text-lg">{pageTitle || formattedTitle()}</span>
            </div>

            <div class="flex items-center gap-4">
                {#if data.user}
                    <span class="text-sm">{data.user.name}</span>
                {/if}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
                        <UserIcon class="icon-default" />
                        <span class="sr-only">User menu</span>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end">
                        <DropdownMenu.Item onclick={() => setMode('light')}>
                            <SunIcon class="icon-default" />
                            <span>Light</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onclick={() => setMode('dark')}>
                            <MoonIcon class="icon-default" />
                            <span>Dark</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onclick={() => resetMode()}>
                            <OrbitIcon class="icon-default" />
                            <span>System</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            onclick={() => {
                                if (data.user) onLogout();
                                else onLogin();
                            }}
                        >
                            {#if data.user}
                                <LogoutIcon class="icon-default" />
                            {:else}
                                <LoginIcon class="icon-default" />
                            {/if}
                            <span>{data.user ? 'Logout' : 'Login'}</span>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        </header>

        <main id="global-content">
            {@render children()}
        </main>

        <footer id="global-footer">
            <BottomNav.Root>
                {#each data.menu as item (item.title)}
                    {@const Icon = Icons[item.icon as IconsIndex] as Icons.LucideIcon}
                    <BottomNav.Item href={item.url}>
                        {#if Icon}
                            <Icon class="icon-default" />
                        {/if}
                        {#if item.title}
                            <span>{item.title}</span>
                        {/if}
                    </BottomNav.Item>
                {/each}
            </BottomNav.Root>
        </footer>
    </Sidebar.Inset>
</Sidebar.Provider>
