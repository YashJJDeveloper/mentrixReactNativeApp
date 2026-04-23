export const TIMEOUTS = {
    SPLASH_DURATION: 2000,
};

export const DASHBOARD_CARDS = [
    {
        number: '08',
        titleKey: 'dashboardActiveInstitutes',
        descriptionKey: 'dashboardActiveInstitutesDesc',
        type: 'blue' as const,
    },
    {
        number: '05',
        titleKey: 'dashboardInactiveInstitutes',
        descriptionKey: 'dashboardInactiveInstitutesDesc',
        type: 'green' as const,
    },
    {
        number: '15+',
        titleKey: 'dashboardTotalModules',
        descriptionKey: 'dashboardTotalModulesDesc',
        type: 'orange' as const,
    },
    {
        number: '50+',
        titleKey: 'dashboardTotalUsers',
        descriptionKey: 'dashboardTotalUsersDesc',
        type: 'purple' as const,
    },
];

export const CARD_TYPE_COLORS = {
    light: {
        blue: { bg: '#dbeafe', number: '#2563eb', title: '#1e3a8a', desc: '#1e3a8a' },
        green: { bg: '#d1fae5', number: '#059669', title: '#065f46', desc: '#065f46' },
        orange: { bg: '#ffedd5', number: '#ea580c', title: '#7c2d12', desc: '#7c2d12' },
        purple: { bg: '#ede9fe', number: '#7c3aed', title: '#4c1d95', desc: '#4c1d95' },
    },
    dark: {
        blue: { bg: '#1f2937', number: '#fff', title: '#e5e7eb', desc: '#9ca3af' },
        green: { bg: '#1f2937', number: '#fff', title: '#e5e7eb', desc: '#9ca3af' },
        orange: { bg: '#1f2937', number: '#fff', title: '#e5e7eb', desc: '#9ca3af' },
        purple: { bg: '#1f2937', number: '#fff', title: '#e5e7eb', desc: '#9ca3af' },
    },
};