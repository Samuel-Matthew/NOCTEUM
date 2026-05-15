import { useState } from "react";
import { loadShippingConfig, calculateShipping } from "@/mocks/admin";
import type { ShippingConfig } from "@/mocks/admin";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Canada",
  "Australia",
  "Japan",
  "Netherlands",
  "Switzerland",
  "Belgium",
];

export default function ShippingSection() {
  const [config, setConfig] = useState<ShippingConfig>(loadShippingConfig);
  const [saved, setSaved] = useState(false);
  const [previewCountry, setPreviewCountry] = useState("France");
  const [previewTotal, setPreviewTotal] = useState(250);

  const handleSave = () => {
    localStorage.setItem("nocteum-shipping-config", JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addCountryOverride = () => {
    setConfig((prev) => ({
      ...prev,
      countryOverrides: [
        ...prev.countryOverrides,
        { country: COUNTRIES[0], fee: 10 },
      ],
    }));
  };

  const removeCountryOverride = (idx: number) => {
    setConfig((prev) => ({
      ...prev,
      countryOverrides: prev.countryOverrides.filter((_, i) => i !== idx),
    }));
  };

  const updateOverride = (
    idx: number,
    field: "country" | "fee",
    value: string | number,
  ) => {
    setConfig((prev) => ({
      ...prev,
      countryOverrides: prev.countryOverrides.map((o, i) =>
        i === idx ? { ...o, [field]: value } : o,
      ),
    }));
  };

  const previewResult = calculateShipping(previewTotal, previewCountry);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Shipping Configuration
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage delivery fees, free shipping thresholds, and regional rates.
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
          Shipping settings saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
            General Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Base Shipping Fee
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={config.baseFee}
                  onChange={(e) =>
                    setConfig((p) => ({
                      ...p,
                      baseFee: Number(e.target.value),
                    }))
                  }
                  className="w-full pl-7 pr-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Applied to all orders below the free shipping threshold.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Express Shipping Fee
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={config.expressFee}
                  onChange={(e) =>
                    setConfig((p) => ({
                      ...p,
                      expressFee: Number(e.target.value),
                    }))
                  }
                  className="w-full pl-7 pr-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Free Shipping Threshold
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={config.freeShippingThreshold}
                  onChange={(e) =>
                    setConfig((p) => ({
                      ...p,
                      freeShippingThreshold: Number(e.target.value),
                    }))
                  }
                  className="w-full pl-7 pr-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Orders above this amount ship free.
              </p>
            </div>
          </div>
        </div>

        {/* Preview Calculator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
            Fee Preview
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Order Total
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={previewTotal}
                  onChange={(e) => setPreviewTotal(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Destination Country
              </label>
              <select
                value={previewCountry}
                onChange={(e) => setPreviewCountry(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${previewTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span
                  className={`font-medium ${previewResult.isFree ? "text-emerald-600" : "text-gray-900"}`}
                >
                  {previewResult.isFree
                    ? "Complimentary"
                    : `$${previewResult.fee.toFixed(2)}`}
                </span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-semibold text-gray-900">
                  ${(previewTotal + previewResult.fee).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Overrides */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
            Country-Specific Rates
          </h3>
          <button
            onClick={addCountryOverride}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded-md hover:bg-amber-700 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Country
          </button>
        </div>

        {config.countryOverrides.length === 0 ? (
          <p className="text-sm text-gray-400 italic">
            No country-specific rates set. All countries use the base fee.
          </p>
        ) : (
          <div className="space-y-3">
            {config.countryOverrides.map((override, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <select
                  value={override.country}
                  onChange={(e) =>
                    updateOverride(idx, "country", e.target.value)
                  }
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="relative w-32">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={override.fee}
                    onChange={(e) =>
                      updateOverride(idx, "fee", Number(e.target.value))
                    }
                    className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <button
                  onClick={() => removeCountryOverride(idx)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={() => setConfig(loadShippingConfig())}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
