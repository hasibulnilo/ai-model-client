import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";
import ModelDetails from "../ModelDetails/ModelDetails";

const MyPurchases = () => {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);

  const fetchPurchases = useCallback(async (signal) => {
    if (!user?.email || !user?.accessToken) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const res = await fetch(
        `https://ai-model-server.vercel.app/my-purchases?email=${encodeURIComponent(user.email)}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
          signal,
        }
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setPurchases(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load purchases");
      }
    } finally {
      setLoading(false);
    }
  }, [user?.email, user?.accessToken]);

  useEffect(() => {
    const controller = new AbortController();
    fetchPurchases(controller.signal);
    return () => controller.abort();
  }, [fetchPurchases]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    fetchPurchases(controller.signal);
  };

  const openModal = (modelId) => {
    setSelectedModelId(modelId);
  };

  const closeModal = () => {
    setSelectedModelId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mr-2"></div>
        <span>Loading your purchases...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-blue-500 mb-4 bg-red-50 p-3 rounded">Error: {error}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No purchases yet.</p>
        <p className="text-sm mt-2">Start purchasing models from the marketplace!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {purchases.map((purchase, index) => (
          <div
            key={purchase._id || purchase.modelId || index}
            className="cursor-pointer hover:shadow-md transition-shadow rounded"
            onClick={() => openModal(purchase.modelId)}
          >
            <ModelCard
              model={purchase}
              showCreator
              showPurchasedBy
            />
          </div>
        ))}
      </div>

      {selectedModelId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <ModelDetails
              id={selectedModelId}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPurchases;