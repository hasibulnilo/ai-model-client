import { useLoaderData } from "react-router-dom";
import { ModelCard } from "../../components/ModelCard";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import AOS from "aos";
import "aos/dist/aos.css";

const AllModels = () => {
  const data = useLoaderData();
  const [models, setModels] = useState(data);
  const [loading, setLoading] = useState(false);
  const [frameworkFilter, setFrameworkFilter] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    setLoading(true);

    let url = `https://ai-model-server.vercel.app/search?search=${search_text}`;
    if (frameworkFilter) url += `&framework=${frameworkFilter}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleFrameworkFilter = (e) => {
    const value = e.target.value;
    setFrameworkFilter(value);
    setLoading(true);
    let url = `https://ai-model-server.vercel.app/models?framework=${value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 bg-gradient-to-b from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-900 dark:via-blue-800 dark:to-blue-950">
      <div className="text-2xl text-center font-bold mb-2 text-blue-800 dark:text-blue-400">
        All AI Models
      </div>
      <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
        Explore AI models.
      </p>

      <form
        onSubmit={handleSearch}
        className="mt-5 mb-10 flex flex-col md:flex-row gap-2 justify-center items-end"
      >
        <label className="input rounded-full flex-1">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search by name" />
        </label>
        <select
          value={frameworkFilter}
          onChange={handleFrameworkFilter}
          className="select select-bordered rounded-full w-48"
          disabled={loading}
        >
          <option value="">All Frameworks</option>
          <option value="TensorFlow">TensorFlow</option>
          <option value="PyTorch">PyTorch</option>
          <option value="Scikit-learn">Scikit-learn</option>
          <option value="Keras">Keras</option>
          <option value="Hugging Face">Hugging Face</option>
          <option value="Other">Other</option>
        </select>
        <button
          className="btn rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 text-white"
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Search"}
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model, index) => (
            <div
              key={model._id}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg hover:shadow-blue-400/40 bg-white dark:bg-gray-800"
            >
              <ModelCard model={model} showCreator={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllModels;
