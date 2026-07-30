import React from 'react';
import CheckoutBaseline from './CheckoutBaseline';
import CheckoutNext from './CheckoutNext';
import CheckoutPayment from './CheckoutPayment';

function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '/');

  if (normalizedPath.endsWith('/checkout/next/')) {
    return <CheckoutNext />;
  }

  if (normalizedPath.endsWith('/checkout/payment/')) {
    return <CheckoutPayment />;
  }

  return <CheckoutBaseline />;
}

export default App;
