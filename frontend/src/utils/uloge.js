export const ROLES = {
    DARIVATELJ: 'darivatelj',
    DJELATNIK: 'djelatnik',
    ORGANIZATOR: 'organizator',
    ADMINISTRATOR: 'administrator'
};

export function getRole(user) {
    if (!user) return null;
    return user.uloga;
}

export function hasRole(user, ...dopusteneUloge) {
    return dopusteneUloge.includes(getRole(user));
};