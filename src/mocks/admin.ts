export interface ShippingConfig {
  baseFee: number;
  expressFee: number;
  freeShippingThreshold: number;
  currency: string;
  countryOverrides: { country: string; fee: number }[];
}

export const defaultShippingConfig: ShippingConfig = {
  baseFee: 15,
  expressFee: 35,
  freeShippingThreshold: 300,
  currency: "USD",
  countryOverrides: [
    { country: "United States", fee: 12 },
    { country: "United Kingdom", fee: 10 },
    { country: "France", fee: 8 },
    { country: "Germany", fee: 9 },
    { country: "Canada", fee: 14 },
  ],
};

const SHIPPING_KEY = "nocteum-shipping-config";

export function loadShippingConfig(): ShippingConfig {
  try {
    const raw = localStorage.getItem(SHIPPING_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { ...defaultShippingConfig };
}

export function saveShippingConfig(config: ShippingConfig) {
  localStorage.setItem(SHIPPING_KEY, JSON.stringify(config));
}

export function calculateShipping(
  totalPrice: number,
  country?: string,
): { fee: number; isFree: boolean } {
  const config = loadShippingConfig();
  if (totalPrice >= config.freeShippingThreshold) {
    return { fee: 0, isFree: true };
  }
  if (country) {
    const override = config.countryOverrides.find((o) => o.country === country);
    if (override) {
      return { fee: override.fee, isFree: false };
    }
  }
  return { fee: config.baseFee, isFree: false };
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  supportPhone: string;
  maintenanceMode: boolean;
}

export const defaultSiteSettings: SiteSettings = {
  siteName: "NOCTĒUM",
  contactEmail: "hello@nocteum.com",
  supportPhone: "+33 1 42 60 00 00",
  maintenanceMode: false,
};

const SETTINGS_KEY = "nocteum-site-settings";

export function loadSiteSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { ...defaultSiteSettings };
}

export function saveSiteSettings(settings: SiteSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  ordersThisMonth: number;
  revenueThisMonth: number;
}
