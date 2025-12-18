import React, { useState, useEffect } from 'react';
import './dashboard.css';

interface OrderItem {
    prodId: string;
    name: string;
    price: number;
    quantity: number;
}

type OrderStatus = 'pending' | 'confirmed' | 'cancelled' | 'done';

interface OrderData {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
}

const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    'https://script-sorcerers.onrender.com/api/orders',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': 'superhemlignyckel123',
                        },
                        credentials: 'include',
                    }
                );

                const data = await response.json();

                const mappedOrders: OrderData[] = data.orders.map((order: any) => ({
                    id: order.orderId,
                    userId: order.userId,
                    items: order.items.map((item: any) => ({
                        prodId: item.prodId,
                        name: item.title,
                        price: item.price,
                        quantity: item.qty,
                    })),
                    total: order.price,
                    status: order.status,
                }));

                setOrders(mappedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/orders/${orderId}/status`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'superhemlignyckel123',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ status }),
                }
            );

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Failed to update order status');
            }

            const data = await response.json();

            setOrders(prev =>
                prev.map(order =>
                    order.id === orderId ? data.order : order
                )
            );
        } catch (error) {
            console.error(error);
            alert((error as Error).message); // Kolla på att ändra detta!!
        }
    };

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Admin Dashboard</h1>

            <h2>Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="dashboard-orders">
                    {orders.map(order => {
                        const isPending = order.status === 'pending';
                        const isConfirmed = order.status === 'confirmed';
                        const isCancelled = order.status === 'cancelled';
                        const isDone = order.status === 'done';

                        return (
                            <li className="dashboard-orders__items" key={order.id}>
                                <p>
                                    <strong>Order ID:</strong> {order.id}
                                </p>
                                <p>
                                    <strong>User ID:</strong> {order.userId}
                                </p>

                                <ul className="dashboard-orders__menu-items">
                                    {order.items.map(item => (
                                        <li key={item.prodId}>
                                            {item.name} – {item.quantity} x {item.price} SEK
                                        </li>
                                    ))}
                                </ul>

                                <div className="dashboard-orders__total">
                                    <p>
                                        <strong>Total:</strong> {order.total} SEK
                                    </p>

                                    <button
                                        className={`dashboard-orders__confirm-btn ${
                                            !isPending ? 'grey' : ''
                                        }`}
                                        disabled={!isPending}
                                        onClick={() =>
                                            updateOrderStatus(order.id, 'confirmed')
                                        }
                                    >
                                        {isConfirmed ? 'Confirmed ✔' : 'Confirm Order'}
                                    </button>

                                    <button
                                        className={`dashboard-orders__cancel-btn ${
                                            isCancelled
                                                ? 'red'
                                                : !isPending
                                                ? 'grey'
                                                : ''
                                        }`}
                                        disabled={!isPending}
                                        onClick={() =>
                                            updateOrderStatus(order.id, 'cancelled')
                                        }
                                    >
                                        {isCancelled ? 'Cancelled' : 'Cancel Order'}
                                    </button>

                                    <button
                                        className={`dashboard-orders__done-btn ${
                                            isDone
                                                ? 'green'
                                                : !isConfirmed
                                                ? 'grey'
                                                : ''
                                        }`}
                                        disabled={!isConfirmed}
                                        onClick={() =>
                                            updateOrderStatus(order.id, 'done')
                                        }
                                    >
                                        {isDone ? 'Done ✔' : 'Mark as done'}
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
