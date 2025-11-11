import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from '../../firebase/firebase.config'; // Add this import

const UpdateModel = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const model = data.result;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      framework: e.target.framework.value,
      useCase: e.target.useCase.value,
      dataset: e.target.dataset.value,
      description: e.target.description.value,
      image: e.target.image.value,
    };

    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in—please log in again");
      navigate("/auth/login");
      return;
    }

    try {
      const token = await user.getIdToken(true); // Refresh token
      localStorage.setItem('token', token);
      console.log('Token refreshed:', token ? 'YES' : 'NO');

      const res = await fetch(`https://ai-model-server.vercel.app/models/${model._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log('Update response:', data);
      if (data.success) {
        toast.success("Successfully updated!");
        navigate(`/model-details/${model._id}`);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.log('Update Error:', err);
      toast.error("Failed to update");
    }
  };


  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Update Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              defaultValue={model.name}
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          {/* Framework Dropdown */}
          <div>
            <label className="label font-medium">Framework</label>
            <select
              defaultValue={model.framework}
              name="framework"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select framework
              </option>
              <option value="TensorFlow">TensorFlow</option>
              <option value="PyTorch">PyTorch</option>
              <option value="Scikit-learn">Scikit-learn</option>
              <option value="Keras">Keras</option>
              <option value="Hugging Face">Hugging Face</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Use Case Dropdown */}
          <div>
            <label className="label font-medium">Use Case</label>
            <select
              defaultValue={model.useCase}
              name="useCase"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select use case
              </option>
              <option value="NLP">NLP</option>
              <option value="Computer Vision">Computer Vision</option>
              <option value="Reinforcement Learning">Reinforcement Learning</option>
              <option value="Generative AI">Generative AI</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Dataset Input */}
          <div>
            <label className="label font-medium">Dataset</label>
            <input
              type="text"
              defaultValue={model.dataset}
              name="dataset"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="e.g., ImageNet"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              defaultValue={model.description}
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="label font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              defaultValue={model.image}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Update Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;