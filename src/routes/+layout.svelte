<script lang="ts">
    import { ModeWatcher } from 'mode-watcher';
    import Alerts from '$bricks/alerts.svelte';

    import favicon from '$icons/favicon.svg';
    import '$css/custom.css';

    import { Button } from '$ui/button';
    import SunIcon from '@lucide/svelte/icons/sun';
    import MoonIcon from '@lucide/svelte/icons/moon';
    import { toggleMode } from 'mode-watcher';

    // import Header from '$bricks/header.svelte';

    // import * as Sidebar from '$lib/bricks/ui/sidebar/index.js';
    // import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
    // import Settings from '@lucide/svelte/icons/settings';
    // import User from '@lucide/svelte/icons/user';

    // Sample navigation entries
    // const items = [
    //     { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    //     { title: 'Profile', url: '/profile', icon: User },
    //     { title: 'Settings', url: '/settings', icon: Settings }
    // ];

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<!-- <div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"> -->
<!-- <div id="root" class="theme-soft-consumer"> -->
<div
    class="root fixed top-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
    <div class="bg-muted flex flex-col items-end-safe">
        <Button onclick={toggleMode} variant="outline" size="icon">
            <SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90" />

            <MoonIcon
                class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
            />
            <span class="sr-only">Toggle theme</span>
        </Button>
    </div>
</div>

<!-- <!-- The variant="floating" gives the menu its detached, card-like style --> -->
<!-- <Sidebar.Provider> -->
<!--     <Sidebar.Root side="left" variant="floating" collapsible="icon"> -->
<!--         <Sidebar.Content> -->
<!--             <Sidebar.Group> -->
<!--                 <Sidebar.GroupLabel>Application</Sidebar.GroupLabel> -->
<!--                 <Sidebar.GroupContent> -->
<!--                     <Sidebar.Menu> -->
<!--                         {#each items as item (item.title)} -->
<!--                             <Sidebar.MenuItem> -->
<!--                                 <Sidebar.MenuButton> -->
<!--                                     <a href={item.url} class="flex items-center gap-2"> -->
<!--                                         <!-- <hr.icon component={item.icon} class="size-4" /> --> -->
<!--                                         <span>{item.title}</span> -->
<!--                                     </a> -->
<!--                                 </Sidebar.MenuButton> -->
<!--                             </Sidebar.MenuItem> -->
<!--                         {/each} -->
<!--                     </Sidebar.Menu> -->
<!--                 </Sidebar.GroupContent> -->
<!--             </Sidebar.Group> -->
<!--         </Sidebar.Content> -->
<!--     </Sidebar.Root> -->
<!-- </Sidebar.Provider> -->

<div id="root" class="theme-soft-consumer">
    <Alerts />
    {@render children()}
</div>
