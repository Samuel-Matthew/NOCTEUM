import { useState } from "react";
import {
  loadOrders,
  formatDate,
  getStatusLabel,
  getStatusColor,
  type Order,
  type TrackingEvent,
  type OrderItem,
} from "@/mocks/orders";

const ALL_STATUSES = [
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const;

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [saved, setSaved] = useState(false);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.firstName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      o.shippingAddress.lastName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (orderId: string, newStatus: Order["status"]) => {
    const updated = orders.map((o) => {
      if (o.id !== orderId) return o;
      const updatedEvents = o.trackingEvents.map(
        (e: TrackingEvent, idx: number) => {
          if (newStatus === "delivered") return { ...e, completed: true };
          if (newStatus === "shipped") return { ...e, completed: idx < 3 };
          if (newStatus === "processing") return { ...e, completed: idx < 2 };
          if (newStatus === "out_for_delivery")
            return { ...e, completed: idx < 4 };
          if (newStatus === "cancelled")
            return { ...e, completed: e.completed };
          return e;
        },
      );
      return { ...o, status: newStatus, trackingEvents: updatedEvents };
    });
    setOrders(updated);
    localStorage.setItem("nocteum-orders", JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const statusCounts = ALL_STATUSES.reduce(
    (acc, s) => {
      acc[s] = orders.filter((o) => o.status === s).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all customer orders.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {ALL_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() =>
              setStatusFilter(statusFilter === status ? "all" : status)
            }
            className={`p-3 rounded-lg border text-left transition-colors ${
              statusFilter === status
                ? "border-amber-500 bg-amber-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <p className="text-xs text-gray-500 capitalize">
              {getStatusLabel(status)}
            </p>
            <p
              className="text-xl font-semibold text-gray-900 mt-1"
              style={{
                color:
                  statusFilter === status ? "var(--admin-accent)" : undefined,
              }}
            >
              {statusCounts[status]}
            </p>
          </button>
        ))}
        <div className="p-3 rounded-lg border border-gray-200 bg-white">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
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
          Order status updated.
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by order number or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
        >
          <option value="all">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {getStatusLabel(s)}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Date
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
                <th className="text-right px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-medium text-gray-900">
                      {order.orderNumber}
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">
                      {order.shippingAddress.firstName}{" "}
                      {order.shippingAddress.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order.id,
                          e.target.value as Order["status"],
                        )
                      }
                      className="text-xs px-2 py-1 rounded-md border font-medium capitalize"
                      style={{
                        borderColor: getStatusColor(order.status),
                        color: getStatusColor(order.status),
                        backgroundColor: `${getStatusColor(order.status)}10`,
                      }}
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {getStatusLabel(s)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-400 text-sm"
                  >
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Order {selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatDate(selectedOrder.date)}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </h4>
                {selectedOrder.items.map((item: OrderItem) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-3"
                  >
                    <div className="w-12 h-14 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.size} × {item.quantity}
                      </p>
                      <p className="text-xs font-mono text-amber-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${selectedOrder.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {selectedOrder.shipping === 0
                      ? "Complimentary"
                      : `$${selectedOrder.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Shipping Address
                </h4>
                <div className="text-sm text-gray-700 space-y-0.5">
                  <p className="font-medium">
                    {selectedOrder.shippingAddress.firstName}{" "}
                    {selectedOrder.shippingAddress.lastName}
                  </p>
                  <p>{selectedOrder.shippingAddress.street}</p>
                  {selectedOrder.shippingAddress.apartment && (
                    <p>{selectedOrder.shippingAddress.apartment}</p>
                  )}
                  <p>
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.postalCode}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>

              {/* Tracking */}
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Tracking
                </h4>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{selectedOrder.carrier}</span> —{" "}
                  {selectedOrder.trackingNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
