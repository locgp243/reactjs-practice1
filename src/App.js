import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./compoments/Header";
// import TableUsers from "./compoments/TableUsers";
// import Home from "./compoments/Home";
// import Login from "./compoments/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user, loginContext } = useContext(UserContext);
  useEffect(() => {
    if(localStorage.getItem("token")){
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  }, [])
  console.log("Hôkeslcoe")
  console.log(">>> check: ", user);

  return (
    
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />

          </Routes> */}

        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
