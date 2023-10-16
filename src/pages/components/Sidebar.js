import React from "react";
import * as EmailValidator from "email-validator";
function Sidebar() {
  const createChat = () => {
    const input = prompt("enter an email address for the user");

    if (!input) return null;
  };
  return (
    <>
      <div className="p-[10px] bg-[#f0eeee]">
        <div className="header flex items-center justify-between p-[15px]">
          <div className="w-[60px] rounded-[60px] h-[60px] bg-[red]"></div>
          <div className="flex gap-6">
            <div className="">Message</div>
            <div className="setting">Setting</div>
          </div>
        </div>
        <div className="form">
          <form>
            <input
              className="w-[100%] p-[5px]"
              type="chat"
              placeholder="search in chat"
            />
          </form>
        </div>
        <button
          onClick={createChat}
          className="p-[5px]  w-[100%] border-[1px] border-[#c9c8c8] mt-[15px] "
        >
          Start a new chat
        </button>
      </div>
    </>
  );
}

export default Sidebar;
