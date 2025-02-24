import { Navigate } from "react-router-dom";

function PrivateRoute({children, store})
{
    return(
        <div>
            {
                store.trim() !== "" ? children : <Navigate to="/" /> 
            }
        </div>
    );
}

export default PrivateRoute;