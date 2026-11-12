export const ROLES = {
    DARIVATELJ: 'darivatelj',
    DJELATNIK: 'djelatnik',
    ORGANIZATOR: 'organizator',
    ADMIN: 'admin'
};

export function getRoles(user) {
    if (!user) return [];
    if (Array.isArray(user.uloge)) return user.uloge;
    return user.uloga ? [user.uloga] : [];
}

export function hasRole(user, ...dopusteneUloge) {
    return getRoles(user).some((u) => dopusteneUloge.includes(u));
};