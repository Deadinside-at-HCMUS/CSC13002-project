import React from 'react';
import { BiUser, BiMessageDetail } from 'react-icons/bi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { HiOutlineCog, HiOutlineQuestionMarkCircle } from 'react-icons/hi';

interface SidebarLink {
    key: string;
    label: string;
    path: string;
    icon: React.ReactElement;
}

export const SIDEBAR_UPPER_LINKS: SidebarLink[] = [
    {
        key: 'information',
        label: 'Information',
        path: '/profile',
        icon: <BiUser />
    },
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/profile/dashboard',
        icon: <LuLayoutDashboard />
    },
    {
        key: 'message',
        label: 'Message',
        path: '/profile/message',
        icon: <BiMessageDetail />
    },
    {
        key: 'notification',
        label: 'Notification',
        path: '/profile/notification',
        icon: <IoMdNotificationsOutline />
    },
];

export const SIDEBAR_BOTTOM_LINKS: SidebarLink[] = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/profile/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/profile/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
];
