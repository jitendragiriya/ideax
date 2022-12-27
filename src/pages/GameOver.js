import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PLAY_HISTORY } from "../constants";
import { HOME_URL } from "../constants/urls";
import { getLocalData } from "../hooks/localStorage";

const GameOver = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  //navigate to home/ play game screen
  const navigateToHome = () => {
    navigate(HOME_URL);
  };

  //get history
  const getHistory = async () => {
    const data = await getLocalData(PLAY_HISTORY);
    if (data && data.length) setHistory(data);
  };
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center relative flex-col">
        <div className="bg-gray-200 rounded-md border border-gray-200 over-hidden w-[300px] max-w-full p-8">
          <h2 className="font-semibold text-3xl text-center">You are Lost!</h2>
          <div className="flex justify-center mt-8">
            <button
              className="w-40 rounded-md border-gray-300 shadow-md p-3 font-semibold"
              onClick={navigateToHome}
            >
              Play again
            </button>
          </div>
        </div>
        <div className="bg-green-200 rounded-md border border-gray-200  w-[500px] max-w-full p-8 mt-8 max-w-full">
          <h2 className="font-semibold text-3xl text-center">game history</h2>
          <div className="w-full relative mt-4">
            <div className="flex items-center justify-between uppercase text-sm font-semibold bg-green-600 px-4 py-2">
              <div>score</div>
              <div>status</div>
              <div>difference</div>
            </div>
            {history && history.length
              ? history.map((data, index) => (
                  <div
                    className="flex items-center justify-between py-1 bg-cyan-300 px-4"
                    key={index}
                  >
                    <div>{data.score}</div>
                    <div>{data.status}</div>
                    <div>{data.difference}</div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOver;
