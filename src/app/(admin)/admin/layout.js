import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
  title: "Admin Dashboard - Biborton| collections |",
  description: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
