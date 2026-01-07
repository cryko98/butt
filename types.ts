import React from 'react';

export interface NavLink {
    label: string;
    href: string;
    external?: boolean;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon?: React.ReactNode;
}