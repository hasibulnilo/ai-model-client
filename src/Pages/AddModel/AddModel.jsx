import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddModel = () => {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name: e.target.name.value,
      framework: e.target.framework.value,
      useCase: e.target.useCase.value,
      dataset: e.target.dataset.value,
      description: e.target.description.value,
      image: e.target.image.value,
      createdAt: new Date(),
      purchased: 0,
      createdBy: user.email
    }

    fetch('https://ai-model-server.vercel.app/models', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data=> {
      if (data.success) {
        toast.success("Successfully added!")
        // console.log(data)
        navigate("/models");
      } else {
        toast.error(data.message);
      }
    })
    .catch(err => {
      console.log(err)
      toast.error("Failed to add model");
    })
   

  }


  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New AI Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="e.g., BERT"
            />
          </div>

      
          <div>
            <label className="label font-medium">Framework</label>
            <select
              defaultValue={""}
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

     
          <div>
            <label className="label font-medium">Use Case</label>
            <select
              defaultValue={""}
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

       
          <div>
            <label className="label font-medium">Dataset</label>
            <input
              type="text"
              name="dataset"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="e.g., ImageNet"
            />
          </div>

        
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
             className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Brief description of the model's purpose"
            ></textarea>
          </div>

         
          <div>
            <label className="label font-medium">Image URL (ImgBB)</label>
            <input
              type="url"
              name="image"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://i.ibb.co/sample-image.jpg"
            />
          </div>

         
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            Add Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModel;