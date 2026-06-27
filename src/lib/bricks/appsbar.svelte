<script lang="ts">
    import { type Pathname } from '$app/types';
    import { resolve } from '$app/paths';
    import * as Sidebar from '$ui/sidebar';

    import BrandIcon from '$icons/brand.svg';
    import {
        UserPlus as RegisterIcon,
        House as HomeIcon,
        LogIn as LoginIcon,
        ListCheck as TodoIcon,
        Settings as SettingsIcon
    } from '@lucide/svelte';

    const sidebar = Sidebar.useSidebar();

    function handleMenuClick() {
        if (sidebar.isMobile) {
            sidebar.setOpenMobile(false);
        }
    }

    // Menu items.
    const items = [
        {
            title: 'Home',
            url: '/',
            icon: HomeIcon
        },
        {
            title: 'Login',
            url: '/login',
            icon: LoginIcon
        },
        {
            title: 'Register',
            url: '/register',
            icon: RegisterIcon
        },
        {
            title: 'TODO',
            url: '/todo',
            icon: TodoIcon
        }
    ];
</script>

<Sidebar.Root variant="sidebar" collapsible="icon">
    <Sidebar.Header>
        <img src={BrandIcon} alt="Logo" class="w-full h-6 object-fill" />
    </Sidebar.Header>

    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupLabel>Applications</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each items as item (item.title)}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton onclick={handleMenuClick}>
                                {#snippet child({ props })}
                                    <a href={resolve(item.url as Pathname)} {...props}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    </Sidebar.Content>

    <Sidebar.Footer>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                    {#snippet child({ props })}
                        <a href={resolve('/')} {...props}>
                            <SettingsIcon />
                            <span>Settings</span>
                        </a>
                    {/snippet}
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Footer>
</Sidebar.Root>
