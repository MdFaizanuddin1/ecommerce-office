// ProductDetails.js
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";

const ProductDetails = () => {
  const { productId } = useParams();

  const navigate = useNavigate();
  const auth = useSelector((state) => state.user);

  //   console.log(productId);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/product/getSingle?productId=${productId}`
        );
        // console.log(response.data.data);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`/api/v1/product/get`);
        // console.log("similar", response.data.data);
        setSimilarProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchProductDetails();
    fetchSimilarProducts();
  }, [productId]);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (auth.currentUser) {
      dispatch(addToCart(product));
    } else {
      navigate("/sign-in");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {/* Product Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-1/3 w-full">
          <img
            src={product.image[0]}
            alt={product.productname}
            className="w-full h-80 object-cover rounded-md"
          />
        </div>

        {/* Product Details Section */}
        <div className="lg:w-2/3 w-full lg:ml-6 mt-4 lg:mt-0">
          <h1 className="text-2xl font-bold">{product.productname}</h1>
          <p className="text-gray-700 mt-2">RS {product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Buttons Section */}
          <div className="flex flex-col gap-4 my-3">
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-1/2">
              Add To Cart
            </button>
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-1/2">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="border p-4 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg hover:border-blue-500 active:scale-100 active:shadow-md"
            >
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

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
