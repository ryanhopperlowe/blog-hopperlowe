import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <main className="h-screen bg-base-100 pt-10">
      <div className="h-full container mx-auto">
        <Outlet />
      </div>
    </main>
  );
}