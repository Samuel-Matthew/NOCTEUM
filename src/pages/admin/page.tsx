import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import OverviewSection from "./components/OverviewSection";
import ProductsSection from "./components/ProductsSection";
import OrdersSection from "./components/OrdersSection";
import UsersSection from "./components/UsersSection";
import ShippingSection from "./components/ShippingSection";
import SettingsSection from "./components/SettingsSection";

const SECTIONS: Record<string, React.ReactNode> = {
  overview: <OverviewSection />,
  products: <ProductsSection />,
  orders: <OrdersSection />,
  users: <UsersSection />,
  shipping: <ShippingSection />,
  settings: <SettingsSection />,
};

export default function AdminPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "overview",
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && SECTIONS[tab]) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 lg:ml-0 min-h-screen pt-16 lg:pt-0">
          <div className="p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
            {SECTIONS[activeTab] || <OverviewSection />}
          </div>
        </main>
      </div>
    </div>
  );
}
