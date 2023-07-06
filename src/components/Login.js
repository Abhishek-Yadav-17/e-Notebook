import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let negative = useNavigate();

  const handleSub = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success === true) {
      // save the auth-token and redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("Loged in Successfully", "success");
      negative("/home");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ bordeRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login to use <br /> e-Notebook
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSub}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label htmlFor="email" className="form-label">
                              Email address
                            </label>
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="email"
                              value={credentials.email}
                              onChange={onChange}
                              aria-describedby="emailHelp"
                            />
                            <div id="emailHelp" className="form-text">
                              We'll never share your email with anyone else.
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label htmlFor="Password" className="form-label">
                              Password
                            </label>
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="Password"
                              value={credentials.password}
                              onChange={onChange}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-info">
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://img.freepik.com/free-vector/prototyping-process-concept-illustration_114360-1636.jpg?t=st=1670741240~exp=1670741840~hmac=54d0265fadfe0dfd88189c96118a9bc2e53bcfb4312dccf34a14c0b07d7808fe"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
