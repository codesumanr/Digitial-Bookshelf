import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found.");
          navigate("/login");
          return;
        }

        const res = await axios.get("https://digitial-bookshelf-2.onrender.com/api/v1/get-user-cart", { headers });
        setCart(res.data.data);
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    if (isLoggedIn) {
      fetchCart();
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (Cart.length > 0) {
      const total = Cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    }
  }, [Cart]);

  const deleteItem = async (id) => {
    try {
      const res = await axios.put(`https://digitial-bookshelf-2.onrender.com/api/v1/remove-from-cart/${id}`, {}, { headers });
      alert(res.data.message);
      setCart(Cart.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post("https://digitial-bookshelf-2.onrender.com/api/v1/place-order", { order: Cart }, { headers });
      alert(res.data.message);
      navigate("/profile/orderHistory");
    } catch (err) {
      console.error("Order error:", err);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8">
      {!Cart.length ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Empty Cart</h1>
          <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
          {Cart.map((item, i) => (
            <div key={item._id} className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center">
              <img src={item.url} alt="book" className="h-[20vh] md:h-[10vh] object-cover" />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold mt-2 md:mt-0">{item.title}</h1>
                <p className="text-normal text-zinc-300 mt-2">{item.desc.slice(0, 100)}...</p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold">$ {item.price}</h2>
                <button onClick={() => deleteItem(item._id)} className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12">
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{Cart.length} books</h2>
                <h2>${Total}</h2>
              </div>
              <button onClick={placeOrder} className="bg-zinc-100 rounded px-4 py-2 mt-3 w-full font-semibold hover:bg-zinc-200">
                Place your order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
