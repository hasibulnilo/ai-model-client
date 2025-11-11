import { useLoaderData } from "react-router-dom";
import { ModelCard } from "../../components/ModelCard";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AllModels = () => {
  const data = useLoaderData();
  const [models, setModels] = useState(data);
  const [loading, setLoading] = useState(false);
  const [frameworkFilter, setFrameworkFilter] = useState("");

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
    if (frameworkFilter) {
      url += `&framework=${frameworkFilter}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="text-2xl text-center font-bold">All AI Models</div>
      <p className="text-center">Explore AI models.</p>
      <form onSubmit={handleSearch} className="mt-5 mb-10 flex gap-2 justify-center items-end">
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
        <button className="btn rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 text-white" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {models.map((model) => (
            <ModelCard key={model._id} model={model} showCreator={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllModels;