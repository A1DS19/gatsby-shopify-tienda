import React from 'react';
import { Layout, CartContent, SEO } from 'components';

export default function CartPage() {
  return (
    <Layout>
      <SEO title="Carrito" description="Mi carrito de compras" />
      <CartContent />
    </Layout>
  );
}
