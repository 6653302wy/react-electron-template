import { FC, useCallback, useState } from "react";

export const App: FC = () => {
  const [hellotext, setHellotext] = useState(
    " Welcome 👋 !!! This is a template for react-electron app!"
  );
  const [showBtn, setShowBtn] = useState(true);

  const sendmessage = useCallback(async () => {
    const message = await window.electron.sayhello();
    setHellotext(message);
    setShowBtn(false);
  }, []);

  return (
    <div className=" w-screen h-screen flex flex-col items-center justify-center">
      <p className="text-[24px] mb-6">{hellotext}</p>
      {showBtn && (
        <button
          className="bg-[#3b82f6] text-[#fff] p-2 rounded"
          onClick={sendmessage}
        >
          send message to main process
        </button>
      )}
    </div>
  );
};
App.displayName = "App";
