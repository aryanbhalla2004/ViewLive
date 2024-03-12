import {useContext, useEffect} from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import Loading from '../../../../common/Components/pre-loader/Loading';
const Logout = () => {
  const {global} = useParams();
  const navigate = useNavigate();
  const {logout} = useContext(AccountContext);

  useEffect(() => {
    const leave = async () => {
      try {
        await logout(global === "true");
        navigate("/auth");
        //! we are manually reloading the page because there is an error that if we don't it makes u login in twice.
        window.location.reload();
        toast.success("Logged out!", {toastId: "LOGOUT_TOAST"});
      } catch (e: any) {
        console.log(e);
      }
    }

    leave();
  }, [global, logout, navigate]);

  
  return (
    <Loading/>
  )
}

export default Logout;