import {
  FiMap,
  FiBox,
  FiCalendar,
  FiHeart
} from "react-icons/fi";

import { useAuth } from "./AuthContext";
import { ROLES, hasRole } from "../utils/uloge";

const PRIJAVLJENI = Object.values(ROLES);

export const NAV_LINKS = [
  { label: "Karta", to: "/", icon: FiMap, end: true },
  { label: "Zalihe", to: "/zalihe", icon: FiBox },
  { label: "Termini", to: "/termini", icon: FiCalendar, roles: PRIJAVLJENI },
  {
    label: "Darivanja",
    to: "/moja-darivanja",
    icon: FiHeart,
    roles: PRIJAVLJENI,
  }
];
export const PROFILE_LINKS = [
  { label: "Pregled", to: "/pregled", roles: [ROLES.DJELATNIK] },
  { label: "Statistika", to: "/statistika", roles: [ROLES.DJELATNIK] },
  { label: "Akcije", to: "/moje-akcije", roles: [ROLES.ORGANIZATOR] },
  { label: "Upravljanje", to: "/admin", roles: [ROLES.ADMINISTRATOR] },
];

export function useLinksFor(links) {
  const { user } = useAuth();
  return links.filter((i) => !i.roles || hasRole(user, ...i.roles));
}
export function useNavLinks() {
  return useLinksFor(NAV_LINKS);
}
export function useProfileLinks() {
  return useLinksFor(PROFILE_LINKS);
}
