import React from 'react';
import CheckoutBaseline from './CheckoutBaseline';
import CheckoutNext from './CheckoutNext';

function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '/');

  if (normalizedPath.endsWith('/checkout/next/')) {
    return <CheckoutNext />;
  }

  return <CheckoutBaseline />;
}

export default App;
