const Hero = () => {
  const handleScrollToProducts = () => {
    document
      .getElementById("product-list")
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="bg-blue-200 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center lg:gap-8">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src="../../../public/local image/papa vector-02.png" // Replace with your image URL
            alt="Hero Image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-blue-900">
            Welcome to Our Store
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-xl text-blue-700">
            Discover the latest trends, shop exclusive collections, and enjoy a
            seamless shopping experience.
          </p>
          <button
            onClick={handleScrollToProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
