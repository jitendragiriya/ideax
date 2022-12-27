import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PLAY_HISTORY } from "../../constants";
import { GAME_OVER_URL } from "../../constants/urls";
import { getLocalData, setLocalData } from "../../hooks/localStorage";
import Coin from "./Coin";

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(21);
  const [userValue, setUserValue] = useState(0);
  const [userDone, setUserDone] = useState(false);
  const [userCtn, setUserCtn] = useState(0);

  useEffect(() => {
    if (userCtn >= 4) {
      setUserDone(true);
    }
  }, [userCtn]);

  useEffect(() => {
    if (userValue) setUserCtn(userCtn + 1);
  }, [userValue]);

  //done
  const gameDoneHere = async () => {
    if (userDone) {
      const history = await getLocalData(PLAY_HISTORY);
      const num = Math.floor(Math.random() * 2) + 1;
      if (history && history.length) {
        setLocalData(PLAY_HISTORY, [
          ...history,
          { status: "lost", score: userValue, difference: num },
        ]);
      } else {
        setLocalData(PLAY_HISTORY, [
          { status: "lost", score: userValue, difference: num },
        ]);
      }

      setTimeout(() => {
        navigate(GAME_OVER_URL);
      }, 3000);
    }
  };
  useEffect(() => {
    gameDoneHere();
  }, [userDone]);

  return (
    <div className="w-full h-screen min-h-screen flex items-center justify-center">
      <div className="w-[600px] max-w-[90%] rounded-md border border-gray-200 bg-green-500 p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="uppercase font-semibold text-maroon-400 w-[100px] text-sm sm:text-base">
            {!userDone ? <>your turn</> : null}
          </div>
          <h1 className="font-semibold text-center uppercase text-2xl text-cyan-600 sm:text-3xl">
            play game
          </h1>
          <div className="uppercase font-semibold text-maroon-400 w-[70px] text-sm sm:text-base">
            {userDone ? <>ai turn</> : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center">
          {data &&
            [...Array(data)].map((val, index) => (
              <Coin
                index={index}
                key={index}
                value={userValue}
                setValue={setUserValue}
                done={userDone}
              />
            ))}
        </div>
        {!userDone ? (
          <button
            className="w-28 rounded-md border-gray-300 bg-gray-100 shadow-md p-2 font-semibold uppercase mt-4"
            onClick={() => setUserDone(true)}
            disabled={!userCtn}
          >
            done
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
