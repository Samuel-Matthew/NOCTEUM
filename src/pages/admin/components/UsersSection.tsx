import { useState } from "react";

interface StoredUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  memberSince: string;
  tier: string;
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem("nocteum-users");
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.map((u: Record<string, unknown>) => ({
        id: u.id as string,
        email: u.email as string,
        firstName: u.firstName as string,
        lastName: u.lastName as string,
        phone: u.phone as string | undefined,
        memberSince: u.memberSince as string,
        tier: u.tier as string,
      }));
    }
  } catch {
    // ignore
  }
  return [];
}

const TIER_OPTIONS = ["silver", "gold", "platinum"];

export default function UsersSection() {
  const [users, setUsers] = useState<StoredUser[]>(loadUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()),
  );

  const updateTier = (userId: string, newTier: string) => {
    try {
      const raw = localStorage.getItem("nocteum-users");
      if (raw) {
        const all = JSON.parse(raw);
        const updated = all.map((u: Record<string, unknown>) =>
          u.id === userId ? { ...u, tier: newTier } : u,
        );
        localStorage.setItem("nocteum-users", JSON.stringify(updated));
        setUsers(loadUsers());
      }
    } catch {
      // ignore
    }
  };

  const tierCounts = TIER_OPTIONS.reduce(
    (acc, tier) => {
      acc[tier] = users.filter((u) => u.tier === tier).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Customers</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage registered accounts and membership tiers.
          </p>
        </div>
        <div className="flex gap-3">
          {TIER_OPTIONS.map((tier) => (
            <div
              key={tier}
              className="text-center px-3 py-2 bg-white rounded-lg border border-gray-200"
            >
              <p className="text-xs text-gray-500 capitalize">{tier}</p>
              <p className="text-lg font-semibold text-gray-900">
                {tierCounts[tier]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
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
          placeholder="Search customers by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Tier
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Member Since
                </th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-700">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.tier}
                      onChange={(e) => updateTier(user.id, e.target.value)}
                      className="text-xs px-2 py-1 rounded-md border capitalize"
                      style={{
                        borderColor: getTierColor(user.tier),
                        color: getTierColor(user.tier),
                        backgroundColor: `${getTierColor(user.tier)}10`,
                      }}
                    >
                      {TIER_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(user.memberSince).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedUser(user)}
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
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-400 text-sm"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Customer Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
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
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-lg font-medium text-amber-700">
                  {selectedUser.firstName[0]}
                  {selectedUser.lastName[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <span
                    className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize mt-1"
                    style={{
                      backgroundColor: `${getTierColor(selectedUser.tier)}15`,
                      color: getTierColor(selectedUser.tier),
                    }}
                  >
                    {selectedUser.tier} Member
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-gray-900">{selectedUser.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-gray-900">
                    {new Date(selectedUser.memberSince).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">User ID</p>
                  <p className="text-gray-900 font-mono text-xs">
                    {selectedUser.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getTierColor(tier: string): string {
  const colors: Record<string, string> = {
    silver: "#9CA3AF",
    gold: "#D4A853",
    platinum: "#6B7280",
  };
  return colors[tier] || "#9CA3AF";
}
