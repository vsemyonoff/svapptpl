<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import { type Pathname } from '$app/types';
    import { resolve } from '$app/paths';
    import * as Sidebar from '$ui/sidebar';

    import BrandIcon from '$icons/brand.svg';
    import {
        House as HomeIcon,
        ListCheck as TodoIcon,
        NewspaperIcon,
        TvMinimalPlayIcon,
        UserStarIcon
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
            title: 'News',
            url: '/blog',
            icon: NewspaperIcon
        },
        {
            title: 'TODO',
            url: '/todo',
            icon: TodoIcon
        },
        {
            title: 'Media MTX',
            url: '/video',
            icon: TvMinimalPlayIcon
        }
    ];

    let { collapsible = 'icon', variant = 'sidebar', ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {variant} {collapsible} {...restProps}>
    <Sidebar.Header>
        <img src={BrandIcon} alt="Logo" class="w-full h-6 object-fill" />
    </Sidebar.Header>

    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupLabel><span class="text-base">Services:</span></Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each items as item (item.title)}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton onclick={handleMenuClick}>
                                {#snippet child({ props })}
                                    <a href={resolve(item.url as Pathname)} {...props}>
                                        <item.icon class="icon-default" />
                                        <span class="text-sm">{item.title}</span>
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
                        <a href={resolve('/admin')} {...props}>
                            <UserStarIcon />
                            <span>Administration</span>
                        </a>
                    {/snippet}
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Footer>
</Sidebar.Root>
