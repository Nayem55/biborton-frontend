import StatCard from "./StatCard";
import IconBtn from "./IconBtn";
import Badge from "./Badge";
import { FiShoppingBag, FiPackage } from "react-icons/fi";

const ITEMS_PER_PAGE = 20;

const OrdersTab = ({
  loadingOrders,
  affiliateOrders,
  orderSearch,
  setOrderSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  firstDayOfMonth,
  lastDayOfMonth,
  orderPagination,
  orderPage,
  setOrderPage,
  earningsSummary,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Commission" value={`৳${earningsSummary.total.toLocaleString()}`} icon={FiShoppingBag} tone="indigo" />
        <StatCard title="Paid Amount" value={`৳${earningsSummary.paid.toLocaleString()}`} icon={FiPackage} tone="green" />
        <StatCard title="Pending Amount" value={`৳${earningsSummary.pending.toLocaleString()}`} icon={FiPackage} tone="orange" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search customer</label>
            <input type="text" placeholder="Customer name..." value={orderSearch} onChange={e => setOrderSearch(e.target.value)} className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Start date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">End date</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        {loadingOrders ? (
          <div className="p-12 text-center text-gray-500">Loading orders...</div>
        ) : affiliateOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {orderSearch || startDate !== firstDayOfMonth || endDate !== lastDayOfMonth
              ? "No orders match your filters."
              : "No affiliate orders yet."}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {["Order ID", "Date", "Customer", "Subtotal", "Commission", "Status", "Payment"].map(h => (
                      <th key={h} className="text-left px-6 py-4 font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {affiliateOrders.map(order => {
                    const commission = Math.round(Number(order.subtotal || 0) * 0.1);
                    const isPaid = order.reseller_payment === true;
                    const statusTone = order.order_status === "Completed" ? "green" : order.order_status === "Processing" ? "yellow" : "gray";

                    return (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 font-extrabold">#{order.id}</td>
                        <td className="px-6 py-4">{new Date(order.order_date).toLocaleDateString("en-GB")}</td>
                        <td className="px-6 py-4">{order.billing?.first_name} {order.billing?.last_name}</td>
                        <td className="px-6 py-4 font-semibold">৳{order.subtotal}</td>
                        <td className="px-6 py-4 font-extrabold text-green-700">৳{commission}</td>
                        <td className="px-6 py-4"><Badge tone={statusTone}>{order.order_status}</Badge></td>
                        <td className="px-6 py-4"><Badge tone={isPaid ? "green" : "orange"}>{isPaid ? "Paid" : "Pending"}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y">
              {affiliateOrders.map(order => {
                const commission = Math.round(Number(order.subtotal || 0) * 0.1);
                const isPaid = order.reseller_payment === true;
                const statusTone = order.order_status === "Completed" ? "green" : order.order_status === "Processing" ? "yellow" : "gray";

                return (
                  <div key={order.id} className="p-5">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <p className="font-extrabold text-lg">#{order.id}</p>
                        <p className="text-sm text-gray-600">{new Date(order.order_date).toLocaleDateString("en-GB")}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge tone={statusTone}>{order.order_status}</Badge>
                        <Badge tone={isPaid ? "green" : "orange"}>{isPaid ? "Paid" : "Pending"}</Badge>
                      </div>
                    </div>
                    <div className="mt-4 text-sm space-y-2">
                      <p><span className="font-semibold">Customer:</span> {order.billing?.first_name} {order.billing?.last_name}</p>
                      <p><span className="font-semibold">Subtotal:</span> <span className="font-extrabold">৳{order.subtotal}</span></p>
                      <p><span className="font-semibold">Commission:</span> <span className="font-extrabold text-green-700">৳{commission}</span></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {orderPagination.totalPages > 1 && (
          <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing {(orderPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(orderPage * ITEMS_PER_PAGE, orderPagination.totalOrders)} of {orderPagination.totalOrders} orders
            </p>
            <div className="flex gap-3">
              <IconBtn onClick={() => setOrderPage(p => Math.max(p - 1, 1))} disabled={orderPage === 1}>Previous</IconBtn>
              <span className="px-4 py-2 font-semibold text-gray-700">{orderPage} / {orderPagination.totalPages}</span>
              <IconBtn onClick={() => setOrderPage(p => Math.min(p + 1, orderPagination.totalPages))} disabled={orderPage === orderPagination.totalPages}>Next</IconBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTab;