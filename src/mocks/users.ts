import type { User } from "@/context/AuthContext";

interface StoredUser extends User {
  password: string;
}

export const demoUser: StoredUser = {
  id: "usr-demo-001",
  email: "demo@nocteum.com",
  password: "nocteum2026",
  firstName: "Elena",
  lastName: "Voss",
  phone: "+33 1 42 60 00 00",
  birthday: "1990-03-15",
  memberSince: "2025-01-10T00:00:00Z",
  tier: "gold",
};

export function seedDemoUser() {
  const AUTH_USERS_KEY = "nocteum-users";
  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    const users: StoredUser[] = raw ? JSON.parse(raw) : [];
    if (!users.find((u) => u.id === demoUser.id)) {
      users.push(demoUser);
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
    }
  } catch {
    // ignore
  }
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
  phone?: string;
  isDefault: boolean;
}

export const demoAddresses: Address[] = [
  {
    id: "addr-001",
    label: "Home",
    firstName: "Elena",
    lastName: "Voss",
    street: "14 Rue de la Paix",
    apartment: "Apartment 3B",
    city: "Paris",
    country: "France",
    postalCode: "75002",
    phone: "+33 1 42 60 00 00",
    isDefault: true,
  },
  {
    id: "addr-002",
    label: "Office",
    firstName: "Elena",
    lastName: "Voss",
    street: "8 Place Vendôme",
    city: "Paris",
    country: "France",
    postalCode: "75001",
    isDefault: false,
  },
];

export function loadAddresses(userId: string): Address[] {
  const key = `nocteum-addresses-${userId}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  if (userId === demoUser.id) return [...demoAddresses];
  return [];
}

export function saveAddresses(userId: string, addresses: Address[]) {
  const key = `nocteum-addresses-${userId}`;
  localStorage.setItem(key, JSON.stringify(addresses));
}
