import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";
const MyModels = () => {
    const {user} = useContext(AuthContext)
    const [models, setModels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {

        fetch(`https://ai-model-server.vercel.app/my-models?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res=> res.json())
        .then(data=> {
            
            setModels(data)
            setLoading(false)
        })

    }, [user])


    if(loading) {
        return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                     {models.map(model => <ModelCard key={model._id} model={model} showCreator={true}/>)}
                  </div>
            
        </div>
    );
};

export default MyModels;   