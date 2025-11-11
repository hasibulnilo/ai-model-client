import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ModelDetails = ({ id: propId, purchaseId, onClose, onRefreshPurchases }) => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const modelId = propId || paramId; // Use prop first for modal
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [refetch, setRefetch] = useState(false);

  // Fetch model data
  useEffect(() => {
    if (!modelId || !user?.accessToken) return;

    setLoading(true);
    fetch(`https://ai-model-server.vercel.app/models/${modelId}`, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setModel(data.result);
        else {
          toast.error(data.message || "Model not found");
          if (!propId) navigate("/models");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load model");
        if (!propId) navigate("/models");
      })
      .finally(() => setLoading(false));
  }, [user?.accessToken, modelId, refetch, navigate, propId]);

  // Delete model (for creator)
  const handleDeleteModel = () => {
    if (model?.createdBy !== user?.email) {
      toast.error("You are not authorized to delete this model");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ai-model-server.vercel.app/models/${model._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Your model has been deleted.", "success");
              if (onClose) onClose();
              else navigate("/models");
            } else toast.error(data.message);
          })
          .catch(() => toast.error("Failed to delete"));
      }
    });
  };

  // Delete purchased model (for MyPurchases)
  const handleDeletePurchase = () => {
    if (!purchaseId) return toast.error("Purchase ID not found");

    Swal.fire({
      title: "Delete this purchase?",
      text: "This will remove it from your purchases.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ai-model-server.vercel.app/purchases/${purchaseId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Purchase removed successfully.", "success");
              if (onRefreshPurchases) onRefreshPurchases(); // refresh modal list
              onClose?.();
            } else toast.error(data.message);
          })
          .catch(() => toast.error("Failed to delete purchase"));
      }
    });
  };

  const handlePurchase = () => {
    if (!user?.email) return toast.error("Please login first");

    const finalModel = {
      name: model.name,
      framework: model.framework,
      useCase: model.useCase,
      dataset: model.dataset,
      description: model.description,
      image: model.image,
      createdBy: model.createdBy,
      modelId: model._id,
      purchasedBy: user.email,
      purchasedAt: new Date(),
    };

    fetch(`https://ai-model-server.vercel.app/purchases/${model._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(finalModel),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Successfully purchased!");
          setRefetch(!refetch);
          if (onRefreshPurchases) onRefreshPurchases();
        } else toast.error(data.message);
      })
      .catch(() => toast.error("Failed to purchase model"));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!model)
    return <div className="p-4 text-center text-gray-500">Model not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={model.image}
              alt={model.name}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800">{model.name}</h1>
            <div className="flex gap-3 flex-wrap">
              <div className="badge badge-lg badge-outline text-blue-600 border-blue-600 font-medium">
                {model.framework}
              </div>
              <div className="badge badge-lg badge-outline text-blue-600 border-blue-600 font-medium">
                {model.useCase}
              </div>
            </div>
            <div className="text-blue-600">
              <strong>Dataset:</strong> {model.dataset}
            </div>
            <p className="text-blue-600 leading-relaxed text-base md:text-lg">{model.description}</p>
            <div className="badge badge-lg badge-outline text-blue-600 border-blue-600 font-medium">
              Purchased: {model.purchased || 0} times
            </div>
            <div className="flex gap-3 mt-6 flex-wrap">
              {model.createdBy === user?.email && (
                <>
                  <Link
                    to={`/update-model/${model._id}`}
                    className="btn btn-primary rounded-full bg-gradient-to-r from-blue-500 to-blue-600  text-white border-0 hover:from-blue-600 hover:to-blue-700"
                  >
                    Edit Model
                  </Link>
                  <button
                    onClick={handleDeleteModel}
                    className="btn btn-outline rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  >
                    Delete Model
                  </button>
                </>
              )}
              {purchaseId && (
                <button
                  onClick={handleDeletePurchase}
                  className="btn btn-warning rounded-full"
                >
                  Delete Purchase
                </button>
              )}
              {!purchaseId && (
                <button
                  onClick={handlePurchase}
                  className="btn bg-gradient-to-r from-blue-500 to-blue-600  rounded-full"
                >
                  Purchase Model
                </button>
              )}
            </div>
            {onClose && (
              <button onClick={onClose} className="btn mt-4 btn-outline rounded-full">
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
