'use client';

import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error("Cannot fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-t-4 border-blue-600 rounded-full"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center min-h-screen flex justify-center items-center">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Product Catalog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="h-64 flex justify-center items-center bg-gray-100">
              <img
                src={p.image}
                alt={p.title}
                className="object-contain max-h-60"
              />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {p.description}
              </p>
              <p className="font-bold text-lg">${p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
