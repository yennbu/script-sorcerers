import React, { useState, useEffect } from 'react';
import './dashboard.css';

interface OrderItem {
    prodId: string;
    name: string;
    price: number;
    quantity: number;
}

interface OrderData {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
}

const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);

    const [doneOrders, setDoneOrders] = useState<Record<string, boolean>>({});
    const [confirmedOrders, setConfirmedOrders] = useState<Record<string, boolean>>({});
    const [cancelledOrders, setCancelledOrders] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://script-sorcerers.onrender.com/api/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'superhemlignyckel123'
                    }
                });

                const data = await response.json();

                const mappedOrders: OrderData[] = data.orders.map((order: any) => ({
                    id: order.orderId,
                    userId: order.userId,
                    items: order.items.map((item: any) => ({
                        prodId: item.prodId,
                        name: item.title,
                        price: item.price,
                        quantity: item.qty
                    })),
                    total: order.price
                }));

                setOrders(mappedOrders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const toggleDone = (orderId: string) => {
        setDoneOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    const confirmOrder = (orderId: string) => {
        setConfirmedOrders(prev => ({
            ...prev,
            [orderId]: true
        }));
    };

    const cancelOrder = (orderId: string) => {
        setCancelledOrders(prev => ({
            ...prev,
            [orderId]: true
        }));
    };

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className='dashboard-container'>
            <h1 className='dashboard-title'>Admin Dashboard</h1>

            <h2>Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className='dashboard-orders'>
                    {orders.map(order => {
                        const isDone = doneOrders[order.id];
                        const isConfirmed = confirmedOrders[order.id];
                        const isCancelled = cancelledOrders[order.id];

                        return (
                            <li className='dashboard-orders__items' key={order.id}>
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>User ID:</strong> {order.userId}</p>

                                <ul className='dashboard-orders__menu-items'>
                                    {order.items.map(item => (
                                        <li key={item.prodId}>
                                            {item.name} – {item.quantity} x {item.price} SEK
                                        </li>
                                    ))}
                                </ul>

                                <div className='dashboard-orders__total'>
                                    <p><strong>Total:</strong> {order.total} SEK</p>

                                    <button
                                        className={`dashboard-orders__confirm-btn ${isConfirmed || isCancelled ? 'grey' : ''}`}
                                        disabled={isConfirmed || isCancelled}
                                        onClick={() => confirmOrder(order.id)}
                                    >
                                        {isConfirmed ? 'Confirmed ✔' : 'Confirm Order'}
                                    </button>

                                    <button
                                        className={`dashboard-orders__cancel-btn ${isCancelled ? 'red' : isConfirmed ? 'grey' : ''}`}
                                        disabled={isCancelled}
                                        onClick={() => cancelOrder(order.id)}
                                    >
                                        {isCancelled ? 'Cancelled' : 'Cancel Order'}
                                    </button>

                                    <button
                                        className={`dashboard-orders__done-btn ${ !isConfirmed ? 'grey' : isDone ? 'green' : isCancelled ? 'grey' : ''}`}
                                        disabled={!isConfirmed || isCancelled}
                                        onClick={() => toggleDone(order.id)}
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
