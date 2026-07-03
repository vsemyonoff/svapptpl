<script lang="ts" module>
    export type MenuItem = {
        title: string;
        url: string;
        icon: string;
    };
</script>

<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import type { LucideIcon } from '@lucide/svelte';
    import { type Pathname } from '$app/types';
    import BrandIcon from '$icons/brand.svg';
    import * as Icons from '@lucide/svelte';
    import * as Sidebar from '$ui/sidebar';
    import { resolve } from '$app/paths';

    type IconsIndex = keyof typeof Icons;

    const sidebar = Sidebar.useSidebar();

    function handleMenuClick() {
        if (sidebar.isMobile) {
            sidebar.setOpenMobile(false);
        }
    }

    type Props = {
        items: MenuItem[];
    } & ComponentProps<typeof Sidebar.Root>;

    const UserStarIcon = Icons['UserStarIcon' as IconsIndex] as LucideIcon;

    let { collapsible = 'icon', variant = 'sidebar', items, ...restProps }: Props = $props();
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
                        {@const Icon = Icons[item.icon as IconsIndex] as LucideIcon}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton onclick={handleMenuClick}>
                                {#snippet child({ props })}
                                    <a href={resolve(item.url as Pathname)} {...props}>
                                        {#if Icon}
                                            <Icon class="icon-default" />
                                        {/if}
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
