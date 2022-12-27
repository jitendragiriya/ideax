import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ISAUTHENTICATED } from "../constants";
import { LOGIN_URL } from "../constants/urls";
import { getLocalData } from "../hooks/localStorage";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  //check is user is authenticated or not
  const redirect = async () => {
    const isAuth = await getLocalData(ISAUTHENTICATED);
    if (!isAuth) {
      navigate(LOGIN_URL);
    }
  };
  useEffect(() => {
    redirect();
  }, [navigate]);

  return (
    <>
      <div className={`relative w-full duration-300`}>
        <Outlet />
        {/* <BottomBar /> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(ProtectedRoutes);
