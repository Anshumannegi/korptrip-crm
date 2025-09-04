import { FaPlane } from "react-icons/fa";
import { PiPath } from "react-icons/pi";
import { TbSkiJumping } from "react-icons/tb";
import { Link } from "react-router-dom";

const Home = () => {
  const handleScroll = () => {
    document.getElementById("explore-places").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="bg-black text-white font-[Montserrat] ">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-screen bg-black bg-opacity-50 bg-cover bg-center p-4"
        style={{ backgroundImage: "url('header-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold uppercase p-2 mb-6">
            Travel The World
          </h1>
          <p className="text-base md:text-lg p-2 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <button
            className="mt-5 px-6 md:px-6 py-3 md:py-4 bg-white text-red-500 rounded-full text-lg md:text-xl font-bold"
            onClick={handleScroll}
          >
            Explore Places
          </button>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="bg-gray-300 py-16 px-4" id="explore-places">
        <div className="container mx-auto space-y-10">
          {/* Location 1 */}
          <div className="flex flex-col md:flex-row bg-white shadow-xl w-full md:w-3/4 mx-auto rounded-lg overflow-hidden">
            <img
              src="/showcase-photo1.jpg"
              alt="UK"
              className="w-full md:w-1/2 h-64 md:h-auto object-cover"
            />
            <div className="p-6 md:p-10 w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-black font-mono">
                Deganvy, U.K
              </h2>
              <p className="text-gray-600 mt-4 text-base md:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit. Quia
                temporibus similique mollitia, voluptate eveniet labore quos
                sapiente laudantium fugiat possimus quod! Fuga itaque ut
                doloribus obcaecati voluptate quasi vitae. Tempore.
              </p>
              <Link
                to="/about"
                className="inline-block mt-5 px-6 py-2 bg-red-500 text-white font-semibold rounded-full text-lg"
              >
                More
              </Link>
            </div>
          </div>

          {/* Location 2 */}
          <div className="flex flex-col md:flex-row-reverse bg-white shadow-xl w-full md:w-3/4 mx-auto rounded-lg overflow-hidden">
            <img
              src="/travel-image1.jpg"
              alt="Egypt"
              className="w-full md:w-1/2 h-64 md:h-auto object-cover"
            />
            <div className="p-6 md:p-10 w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-black font-mono">
                Desert, Egypt
              </h2>
              <p className="text-gray-600 mt-4 text-base md:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Cum
                blanditiis repellat sint minus! Asperiores ratione, provident
                inventore necessitatibus voluptatem adipisci, molestias
                excepturi, a dolor labore doloribus dolorem quod ducimus
                obcaecati?
              </p>
              <Link
                to="/about"
                className="inline-block mt-5 px-6 py-2 bg-red-500 text-white font-semibold rounded-full text-lg"
              >
                More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 shadow-xl p-6 md:p-10 bg-gray-200 text-center gap-6">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-700 text-white rounded-lg">
              <i className="fas fa-route text-red-500 text-3xl md:text-4xl flex justify-center">
                <PiPath />
              </i>
              <h2 className="text-xl md:text-2xl font-bold mt-4">Adventure</h2>
              <p className="text-gray-300 mt-3 text-sm md:text-lg">
                Explore new places with great experiences. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Dolorem veniam perspiciatis
                dolore laudantium labore at quas soluta neque. Voluptatum sint
                ipsam nostrum natus ullam error deserunt ex similique laudantium
                numquam!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg">
              <i className="fas fa-tags text-3xl md:text-4xl flex justify-center">
                <FaPlane />
              </i>
              <h2 className="text-xl md:text-2xl font-bold mt-4">Less Price</h2>
              <p className="mt-3 text-sm md:text-lg">
                Affordable prices for everyone. Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Ut odit impedit distinctio nam at
                labore itaque perspiciatis esse cum sapiente deserunt optio odio
                maiores, dicta obcaecati voluptates? Minus, unde iure?
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gray-700 text-white rounded-lg">
              <i className="fas fa-user-check text-red-500 text-3xl md:text-4xl flex justify-center">
                <TbSkiJumping />
              </i>
              <h2 className="text-xl md:text-2xl font-bold mt-4">Experience</h2>
              <p className="text-gray-300 mt-3 text-sm md:text-lg">
                Unforgettable experiences await. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consequuntur, officiis! Reiciendis
                sequi quam cupiditate rem culpa quia architecto numquam illo
                iusto? Quos doloribus deserunt ullam pariatur qui corrupti ex
                beatae!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
