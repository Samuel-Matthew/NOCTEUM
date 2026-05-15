import { useState, useEffect } from "react";
import { products } from "@/mocks/products";
import { loadOrders } from "@/mocks/orders";
import type { Order } from "@/mocks/orders";

interface StoredUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  memberSince: string;
  tier: string;
  phone?: string;
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem("nocteum-users");
    if (raw) {
      const users = JSON.parse(raw);
      return users.map((u: Record<string, unknown>) => ({
        id: u.id as string,
        email: u.email as string,
        firstName: u.firstName as string,
        lastName: u.lastName as string,
        memberSince: u.memberSince as string,
        tier: u.tier as string,
        phone: u.phone as string | undefined,
      }));
    }
  } catch {
    // ignore
  }
  return [];
}

export default function OverviewSection() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: products.length,
    ordersThisMonth: 0,
    revenueThisMonth: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const orders = loadOrders();
    const users = loadUsers();
    const totalRevenue = orders.reduce(
      (sum: number, o: Order) => sum + o.total,
      0,
    );
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const ordersThisMonth = orders.filter(
      (o: Order) => new Date(o.date) >= monthStart,
    ).length;
    const revenueThisMonth = orders
      .filter((o: Order) => new Date(o.date) >= monthStart)
      .reduce((sum: number, o: Order) => sum + o.total, 0);

    setStats({
      totalRevenue,
      totalOrders: orders.length,
      totalUsers: users.length,
      totalProducts: products.length,
      ordersThisMonth,
      revenueThisMonth,
    });
    setRecentOrders(orders.slice(0, 5));
  }, []);

  const statusBreakdown = {
    processing: loadOrders().filter((o: Order) => o.status === "processing")
      .length,
    shipped: loadOrders().filter((o: Order) => o.status === "shipped").length,
    delivered: loadOrders().filter((o: Order) => o.status === "delivered")
      .length,
    cancelled: loadOrders().filter((o: Order) => o.status === "cancelled")
      .length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Dashboard Overview
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Key metrics and recent activity for your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Total Revenue
          </p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            ${stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
            All time
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Total Orders
          </p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {stats.totalOrders}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {stats.ordersThisMonth} this month
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Customers
          </p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {stats.totalUsers}
          </p>
          <p className="text-xs text-gray-400 mt-1">Registered accounts</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Products
          </p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {stats.totalProducts}
          </p>
          <p className="text-xs text-gray-400 mt-1">In catalog</p>
        </div>
      </div>

      {/* Monthly Revenue + Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider mb-4">
            This Month
          </h3>
          <div className="flex items-end gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Revenue</p>
              <p className="text-3xl font-semibold text-gray-900">
                ${stats.revenueThisMonth.toLocaleString()}
              </p>
            </div>
            <div className="mb-1">
              <p className="text-xs text-gray-500 mb-1">Orders</p>
              <p className="text-xl font-semibold text-gray-900">
                {stats.ordersThisMonth}
              </p>
            </div>
          </div>
          <div className="mt-5 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((stats.revenueThisMonth / 3000) * 100, 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ${stats.revenueThisMonth.toLocaleString()} of $3,000 monthly goal
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider mb-4">
            Order Status Breakdown
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Delivered",
                count: statusBreakdown.delivered,
                color: "#10B981",
              },
              {
                label: "In Transit",
                count: statusBreakdown.shipped,
                color: "#D4A853",
              },
              {
                label: "Processing",
                count: statusBreakdown.processing,
                color: "#6B7280",
              },
              {
                label: "Cancelled",
                count: statusBreakdown.cancelled,
                color: "#EF4444",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 flex-1">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.count}
                </span>
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: item.color,
                      width: `${stats.totalOrders > 0 ? (item.count / stats.totalOrders) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
            Recent Orders
          </h3>
          <span className="text-xs text-gray-400">Last 5 orders</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-medium text-gray-900">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                      style={{
                        backgroundColor: `${getStatusColor(order.status)}15`,
                        color: getStatusColor(order.status),
                      }}
                    >
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-400 text-sm"
                  >
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    delivered: "#10B981",
    shipped: "#D4A853",
    out_for_delivery: "#F59E0B",
    processing: "#6B7280",
    cancelled: "#EF4444",
  };
  return colors[status] || "#6B7280";
}
