import { useState } from "react";
import {
  loadSiteSettings,
  saveSiteSettings,
  defaultSiteSettings,
  type SiteSettings,
} from "@/mocks/admin";

export default function SettingsSection() {
  const [settings, setSettings] = useState<SiteSettings>(loadSiteSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveSiteSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings({ ...defaultSiteSettings });
    saveSiteSettings(defaultSiteSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Site Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure your store name, contact details, and operational modes.
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Settings saved successfully.
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5 max-w-xl">
        <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
          General
        </h3>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Site Name
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) =>
              setSettings((s) => ({ ...s, siteName: e.target.value }))
            }
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Contact Email
          </label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) =>
              setSettings((s) => ({ ...s, contactEmail: e.target.value }))
            }
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Support Phone
          </label>
          <input
            type="tel"
            value={settings.supportPhone}
            onChange={(e) =>
              setSettings((s) => ({ ...s, supportPhone: e.target.value }))
            }
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5 max-w-xl">
        <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
          Operations
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Maintenance Mode
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              When enabled, the storefront displays a maintenance message.
            </p>
          </div>
          <button
            onClick={() =>
              setSettings((s) => ({
                ...s,
                maintenanceMode: !s.maintenanceMode,
              }))
            }
            className={`relative w-11 h-6 rounded-full transition-colors ${settings.maintenanceMode ? "bg-amber-600" : "bg-gray-300"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${settings.maintenanceMode ? "translate-x-5" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
