import React from "react";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
} from "react-icons/ai";
import { validAuthDetails } from "../../constants/validations";

const AuthPasswordInput = ({ password, setPassword }) => {
  const [passwordEye, setPasswordEye] = useState(false);

  return (
    <>
      <div className="w-full mb-5 relative">
        <span className="absolute top-4 left-6 ">
          <AiOutlineLock />
        </span>
        <input
          type={passwordEye ? "text" : "password"}
          className="w-full outline-none border border-gray-300 py-3 px-14 focus:border-base-primary rounded-3xl"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          maxLength={validAuthDetails.passwordMax}
        />
        <span
          className="absolute top-4 px-2 select-none cursor-pointer text-black right-2"
          onClick={() => setPasswordEye(!passwordEye)}
        >
          {passwordEye ? (
            <AiOutlineEye style={{ fontSize: "1.3rem" }} />
          ) : (
            <AiOutlineEyeInvisible style={{ fontSize: "1.3rem" }} />
          )}
        </span>
      </div>
    </>
  );
};

export default AuthPasswordInput;
