import { useEffect, useState, useContext } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [loadingAPI, setLoadingAPI] = useState(false);

  const {loginContext} = useContext(UserContext);

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if(token){
  //     navigate('/');
  //   }
  // }, [])

  const handlePressEnter = async (event) => {
    if(event && event.key === 'Enter'){
      await handleLogin();
    }
    
  }

  const handleGoBack = () => {
    navigate('/');
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và password");
      return;
    }

    setLoadingAPI(true);
    let res = await loginApi(email.trim(), password);
    console.log(res);
    if (res && res.token) {
      // localStorage.setItem("token", res.token);
      loginContext(email, res.token)
      navigate('/');
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingAPI(false)
  };
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Log in</div>
      <div className="text">Email or Username (eve.holt@reqres.in  )</div>
      <input
        type="text"
        placeholder="email or username..."
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="wrap-password">
        <input
          type={isShowPassword === true ? "text" : "password"}
          placeholder="password..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => handlePressEnter(event)}
          
        />
        <i
          className={
            isShowPassword === true
              ? "fa-solid fa-eye"
              : "fa-solid fa-eye-slash"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
        
      >
        {loadingAPI && <i class="fas fa-spinner fa-spin"></i>}
        &nbsp; Login
      </button>
      <div className="back">
        <i className="fa-solid fa-arrow-rotate-left"></i>
        {/* <Link to='/'>Go Back</Link> */}
        <span onClick={() => handleGoBack()}>&nbsp;Go Back</span>
      </div>
    </div>
  );
};

export default Login;
