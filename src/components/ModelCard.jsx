

import { Link } from "react-router-dom";

export const ModelCard = ({model, showCreator = false, showPurchasedBy = false}) => {
    const {name, image, framework, useCase, description, _id, createdBy, purchasedBy, modelId} = model
    const linkId = modelId || _id;
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="flex gap-2">
          <div className="badge text-xs  badge-secondary rounded-full bg-gradient-to-r from-pink-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">{framework}</div>
          <div className="badge text-xs  badge-secondary rounded-full bg-gradient-to-r from-pink-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">{useCase}</div>
        </div>
        {showCreator && <div className="text-xs text-blue-600">Created by: {createdBy}</div>}
        {showPurchasedBy && <div className="text-xs text-blue-600">Purchased by: {purchasedBy}</div>}
        <p className="line-clamp-1">
            {description}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <Link to={`/model-details/${linkId}`} className="btn rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white w-full btn-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
};
