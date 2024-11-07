import { addToCart } from "@/redux/cartSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch data only once after the component mounts
    axios
      .get("/api/v1/product/get")
      .then((res) => setProducts(res.data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // console.log('products is ',products);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (auth.currentUser) {
      dispatch(addToCart(product));
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div
      id="product-list"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-blue-200  "
    >
      {products.map((product) => (
        <div
          key={product._id}
          className="border p-4 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg hover:border-blue-500 active:scale-100 active:shadow-md"
        >
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image[0]}
              alt={product.productname}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold mt-4">{product.productname}</h2>
            <p className="text-gray-700">Price: RS {product.price}</p>
            <p className="text-sm text-gray-500">{product.description}</p>

            <div className="mt-2">
              <span
                className={`text-sm ${
                  product.stock <= 0
                    ? "text-red-500"
                    : product.stock < product.lowStockThreshold
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                {product.stock <= 0
                  ? "Out of Stock"
                  : product.stock < product.lowStockThreshold
                  ? "Low Stock"
                  : "In Stock"}
              </span>
              <p className="text-sm">
                {product.stock <= 0
                  ? "Product Out of Stock"
                  : product.stock < product.lowStockThreshold
                  ? `${product.stock} only left`
                  : ""}
              </p>
            </div>

            {product.offer && (
              <div className="text-blue-500 text-sm mt-2">
                Offer: {product.offer}
              </div>
            )}
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
