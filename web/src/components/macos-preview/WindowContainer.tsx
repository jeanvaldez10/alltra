"use client";

import React from "react"
import PreviewNav from "./PreviewNav";

const WindowContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPreviewPage, setCurrentPreviewPage] = React.useState<"home" | "about" | "contact" | "services">("home"); // Use a union type
  return (
    <div className=" h-[900px] w-full mx-auto rounded-lg justify-center items-center flex">

      <div
        className={` h-full max-h-[90%] w-full max-w-7xl rounded-xl border border-neutral-800/80 background-main-preview   bg-gradient-to-br`}
      >{children}
        <PreviewNav setCurrentPage={setCurrentPreviewPage} />
      </div></div>
  )
}

export default WindowContainer;