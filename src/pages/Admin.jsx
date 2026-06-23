import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Clock, MapPin, Phone, Package, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders?_sort=createdAt&_order=desc');
      const data = await response.json();
      // Ensure orders are sorted by newest first
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedData);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await fetch(`http://localhost:5000/orders/${id}`, { method: 'DELETE' });
        setOrders(orders.filter(order => order.id !== id));
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-10 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-text dark:text-white mb-2">Order Management</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage all incoming cake orders.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl px-6 py-3 flex items-center gap-4">
              <ShoppingBag className="text-primary" size={24} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Orders</p>
                <p className="text-xl font-bold text-text dark:text-white">{orders.length}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl px-6 py-3 flex items-center gap-4">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Revenue</p>
                <p className="text-xl font-bold text-text dark:text-white">
                  ₹{orders.reduce((sum, order) => sum + order.total, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              <p>No orders found yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                    <th className="p-6 font-medium">Order ID</th>
                    <th className="p-6 font-medium">Customer</th>
                    <th className="p-6 font-medium">Contact</th>
                    <th className="p-6 font-medium">Items Ordered</th>
                    <th className="p-6 font-medium">Amount</th>
                    <th className="p-6 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {orders.map((order) => (
                    <motion.tr 
                      key={order.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                      <td className="p-6">
                        <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                          #{order.orderId}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                          <Clock size={14} />
                          {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="font-bold text-text dark:text-white">{order.customer.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{order.paymentMethod}</div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-1">
                          <Phone size={14} className="text-gray-400" />
                          {order.customer.phone}
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2 max-w-[200px]">{order.customer.address}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-8 h-8 rounded-md object-cover" />
                              <span className="text-sm font-medium text-text dark:text-white">
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="font-bold text-lg text-text dark:text-white">₹{order.total}</span>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
