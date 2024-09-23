import Link from "next/link";
import React from "react";
import { useAppContext } from "../context/AppContext";
import { logoutUser } from "@/utils/api";

const Header = () => {
  const { isAuthenticated, user } = useAppContext();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Learning
        </Link>

        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <span className="text-gray-300">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
