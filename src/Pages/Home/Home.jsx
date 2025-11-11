import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner";
import { ModelCard } from "../../components/ModelCard";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const data = useLoaderData();
  const { user } = useAuth();

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Banner />
      
     
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-950 dark:via-cyan-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            Featured AI Models
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((model, index) => (
              <div
                key={model._id}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ModelCard model={model} showCreator={false} />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-blue-800 dark:via-gray-800 dark:to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            About AI Models
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              AI models are mathematical representations trained on data to perform tasks like prediction and classification. They power applications from recommendation systems to autonomous vehicles. Understanding and managing these models is key to advancing AI.
            </p>
            <p className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Use cases include chatbots powered by natural language processing (NLP) models and image recognition systems using convolutional neural networks (CNNs). This inventory manager helps you catalog and collaborate on these essential tools.
            </p>
          </div>
        </div>
      </section>

   
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-700 dark:via-indigo-700 dark:to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent animate-fade-in">
            Get Started
          </h2>
          <p className="text-lg mb-8 text-gray-100 dark:text-gray-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Join our community and start managing your AI models today!
          </p>
          <Link
            to={user ? "/add-model" : "/auth/register"}
            className="inline-block btn btn-lg rounded-full text-red-950 bg-gradient-to-r from-white to-gray-200 text-blue hover:from-blue-600 hover:to-blue-400 shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {user ? "Add Your First Model" : "Sign Up Now"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;