import { faLock, faUnlock, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import api from "../../api/client";

const Users = () => {
  const limit = 10;

  const [skip, setSkip] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const input = useRef("");

  const fetchUsers = async (newSkip = skip, append = false) => {
    try {
      setLoading(true);

      const res = await api.get(`/users?limit=${limit}&skip=${newSkip}`);

      setUsers((prev) => (append ? [...prev, ...res.data] : res.data));

      if (newSkip != 0) {
        setSkip(newSkip);
      }
    } catch (err) {
      console.log("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(0, false);
    window.scrollTo(0, 0);
  }, []);

  const filteredUsers = users.filter((u) =>
    u.userName?.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleStatus = async (id) => {
    try {
      await api.put(`/users/disable/${id}`);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, lockoutEnabled: !u.lockoutEnabled } : u,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = () => {
    fetchUsers(skip + limit, true);
  };

  const changeRole = async (id, role) => {
    await api.put(`/users/change-role/${id}?role=${role}`);

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, roles: [role] } : u)),
    );
  };

  return (
    <article className="flex flex-col gap-5">
      <div className="flex gap-3">
        <input
          ref={input}
          onKeyDown={(e) =>
            e.key == "Enter" ? setSearch(input.current.value) : null
          }
          placeholder="Search users..."
          className="w-full bg-gray-200 rounded-lg h-10 px-3"
        />

        <button
          className="px-3 bg-gray-200 rounded-lg"
          onClick={() => setSearch(input.current.value)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <TailSpin height={60} width={60} color="#0A9ACF" />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="app-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Lockout</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="user-cell">
                  <img
                    src={user.profilePic || "/placeholder-avatar.jpg"}
                    className="h-8 w-8 rounded-full object-cover"
                  />

                  <div>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      @{user.userName} | ID: {user.id}
                    </p>
                  </div>
                </td>

                <td className="email-cell">{user.email}</td>

                <td>
                  <select
                    value={user.roles?.[0] || "User"}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    className="bg-transparent text-gray-700 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>

                <td className="px-6 py-2">
                  <span
                    className={`inline-flex items-center text-xs font-medium ${
                      user.lockoutEnabled ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        user.lockoutEnabled ? "bg-red-500" : "bg-emerald-500"
                      }`}
                    />
                    {user.lockoutEnabled ? "Disabled" : "Locked"}
                  </span>
                </td>

                <td className="actions-cell">
                  <div>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className="action-btn"
                    >
                      <FontAwesomeIcon
                        icon={user.lockoutEnabled ? faUnlock : faLock}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length >= limit && (
        <button
          onClick={() => {
            setSkip(skip + limit);
          }}
          className="self-center px-4 py-2 bg-gray-300 rounded-lg"
        >
          Load More
        </button>
      )}
    </article>
  );
};

export default Users;
