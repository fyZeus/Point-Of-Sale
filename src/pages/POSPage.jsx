import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from 'react-toastify';
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";

function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOption = {
    autoClose: 400,
    pauseOnHover: true,

  }

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("products");
    setProducts(result.data);
    setIsLoading(false);
  };

  const addProductToCart = (product) => {
    const findProductInCart = cart.find((item) => item.id === product.id);

    if (findProductInCart) {
      const newCart = cart.map((cartItem) =>
        cartItem.id === product.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalAmount: cartItem.price * (cartItem.quantity + 1),
            }
          : cartItem
      );
      setCart(newCart);
      toast (`Added ${findProductInCart.name} to cart`, toastOption)
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast (`Added ${product.name} to cart`, toastOption)

    }
  };

  const removeProductFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    toast("Removed product from cart", toastOption);
  };

  const componentRef = useRef()

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handlePrint = () => {
    handleReactToPrint()
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          {isLoading ? (
            "Loading"
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex-1 gap-4">
              {products.map((product, key) => (
                <div
                  key={key}
                  className="border mt-4 p-4 text-center cursor-pointer hover:bg-blue-600 rounded"
                  onClick={() => addProductToCart(product)}
                >
                  <p className="font-bold mb-2">{product.name}</p>
                  <img
                    className="w-full h-48 object-cover mb-2"
                    src={product.image}
                    alt={product.name}
                  />
                  <p className="text-lg font-semibold">${product.price}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 lg:mt-0 lg:ml-8 w-full lg:w-1/3 overflow-x-auto">
          <div style={{display: "none"}}>
            <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>

          </div>
            <div className="bg-black p-3 mt-4 rounded">
              <table className="text-white w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-2 py-2">#</th>
                    <th className="px-2 py-2">Name</th>
                    <th className="px-2 py-2">Price</th>
                    <th className="px-2 py-2">Qty</th>
                    <th className="px-2 py-2">Total</th>
                    <th className="px-2 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    cart.map((cartProduct, key) => (
                      <tr key={key}>
                        <td className="border px-2 py-2">{key + 1}</td>
                        <td className="border px-2 py-2">{cartProduct.name}</td>
                        <td className="border px-2 py-2">
                          ${cartProduct.price}
                        </td>
                        <td className="border px-2 py-2">
                          {cartProduct.quantity}
                        </td>
                        <td className="border px-2 py-2">
                          ${cartProduct.totalAmount}
                        </td>
                        <td className="border px-2 py-2">
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() =>
                              removeProductFromCart(cartProduct.id)
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-2 py-2 text-center" colSpan="6">
                        No Items in Cart
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <h2 className="text-white">Total Amount : ${totalAmount}</h2>
            </div>
            <div>
                {totalAmount !== 0 ? <div>
                    <button onClick={handlePrint} className="bg-blue-600 p-1 px-4 mt-3 rounded text-white">
                        Pay now
                    </button>
                </div> : 'Please add a product to cart'}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
