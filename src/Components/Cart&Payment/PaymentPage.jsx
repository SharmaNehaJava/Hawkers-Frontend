import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/apiInstances';
import CartContext from '../../context/cartContext';

const PaymentPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state;
  const [razorpayKey, setRazorpayKey] = useState('');

  useEffect(() => {
    // Fetch Razorpay key from backend
    const fetchRazorpayKey = async () => {
      try {
        const { data } = await axiosInstance.get('/api/users/getKey');
        setRazorpayKey(data);
      } catch (error) {
        console.error('Error fetching Razorpay key:', error);
      }
    };

    fetchRazorpayKey();
  }, []);

  useEffect(() => {
    if (razorpayKey && order.razorpayOrder) {
      if (typeof window.Razorpay === 'undefined') {
        return;
      }

      const options = {
        key: razorpayKey,
        amount: order.razorpayOrder.amount,
        currency: 'INR',
        name: 'Hawkers',
        description: 'Pay for your order',
        order_id: order.razorpayOrder.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
        notes: {
          address: order.orders[0].address,
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: handlePaymentFailure,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  }, [razorpayKey, order]);

  const handlePaymentSuccess = async (response) => {
    try {
      const { data } = await axiosInstance.post('/api/users/payment/success', {
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        address: order.orders[0].address,
        cart: order.cartItems,
      });
      clearCart();
      navigate('/order-confirmation', { state: { orders: data.orders } });
    } catch (error) {
      console.error('Payment success handling error:', error);
    }
  };

  const handlePaymentFailure = async () => {
    try {
      await axiosInstance.post('/api/users/payment/failure', {
        orderId: order.razorpayOrder.id,
      });
      navigate('/order-failed');
    } catch (error) {
      console.error('Payment failure handling error:', error);
    }
  };

  return (
    <div className="payment-page mt-12">
      <h2 className="text-2xl font-bold text-center">Opening Payment Dashboard...</h2>
    </div>
  );
};

export default PaymentPage;