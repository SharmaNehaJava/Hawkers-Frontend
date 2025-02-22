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
        // console.log("Razorpay key: ", data);
      } catch (error) {
        console.error('Error fetching Razorpay key:', error);
      }
    };

    fetchRazorpayKey();
  }, []);

  useEffect(() => {
    // console.log('Order:', order);
    if (razorpayKey && order.razorpayOrder) {
      // Ensure Razorpay script is loaded
      if (typeof window.Razorpay === 'undefined') {
        // console.error('Razorpay script not loaded');
        return;
      }

      // Initialize Razorpay payment options
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
      // Clear cart and navigate to order confirmation page
      clearCart();
      navigate("/");
    } catch (error) {
      console.error('Payment success handling error:', error);
    }
  };

  return (
    <div className="payment-page">
      <h2 className="text-2xl font-bold text-center">Verifying....</h2>
    </div>
  );
};

export default PaymentPage;