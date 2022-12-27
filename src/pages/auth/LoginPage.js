import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ISAUTHENTICATED } from "../../constants";
import { HOME_URL } from "../../constants/urls";
import { authDetails } from "../../database/auth";
import { getLocalData, setLocalData } from "../../hooks/localStorage";
import AuthPasswordInput from "./AuthPasswordInput";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) return;

    authDetails?.map((detail) => {
      if (detail.username === username && detail.password === password) {
        setLocalData(ISAUTHENTICATED, true);
        navigate(HOME_URL);
      }
    });
    setLoading(false);
  };

  //check is logged in or not
  const checklog = async () => {
    const istrue = await getLocalData(ISAUTHENTICATED);
    if (istrue) {
      setIsAuth(true);
      navigate(HOME_URL);
    } else setIsAuth(false);
  };
  useEffect(() => {
    checklog();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen p-4 relative bg-gradient-to-b">
        <div className="w-[450px] mx-auto max-w-full rounded flex flex-col shadow-md my-8 bg-white">
          <div className="w-full pt-6">
            <h1 className="text-3xl font-medium text-center text-green-500">
              Login
            </h1>
          </div>
          <form
            className="w-full p-8 grid grid-cols-1 gap-4"
            onSubmit={handleSubmit}
          >
            <div className="w-full mb-5 relative">
              <span className="absolute top-4 left-6">
                <AiOutlineMail />
              </span>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="username"
                className="w-full outline-none border border-gray-300 p-3 pl-14 focus:border-green-500 rounded-3xl"
                maxLength={30}
              />
            </div>
            <AuthPasswordInput password={password} setPassword={setPassword} />

            <button
              className="inline-block h-12 w-full bg-green-500 text-white rounded-3xl font-semibold disabled:bg-base-rgba_primary_7"
              disabled={!username || !password}
            >
              {loading ? <LoadingSpinner /> : <>Login</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  // user: state.Authenticate,
});

const mapDispatchToProps = (dispatch) => ({
  // login: (data) => dispatch(hotelOwnerLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
