import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Image as ImageIcon, MessageSquare, Flame, Heart, Youtube, Share2 } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Image Generator',
        href: '/image',
        icon: ImageIcon,
    },
    {
        title: 'Image Gallery',
        href: '/image/gallery',
        icon: ImageIcon,
    },
    {
        title: 'Comment Validator',
        href: '/comment',
        icon: MessageSquare,
    },
    {
        title: 'Poem Generator',
        href: route('poem.index'),
        icon: BookOpen,
    },
    {
        title: 'Roast Generator',
        href: route('roast.index'),
        icon: Flame,
    },
    {
        title: 'Love Letter',
        href: route('loveletter.index'),
        icon: Heart,
    },
    {
        title: 'AI Chat',
        href: '/chat',
        icon: MessageSquare,
    },
];

// Agent command tools
const agentNavItems: NavItem[] = [
    {
        title: 'YouTube Agent',
        href: route('youtube.agent'),
        icon: Youtube,
    },
    {
        title: 'Roasted Agent',
        href: route('roasted.agent'),
        icon: Flame,
    },
    {
        title: 'Social Media Optimizer',
        href: route('social.optimizer'),
        icon: Share2,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const page = usePage();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <SidebarGroup className="px-2 py-0 mt-4">
                    <SidebarGroupLabel>Agent Commands</SidebarGroupLabel>
                    <SidebarMenu>
                        {agentNavItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.url === item.href}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
