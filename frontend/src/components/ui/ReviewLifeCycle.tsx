import React from "react";
import { ArrowLeftRight, CloudOff, ClockFadingIcon } from "lucide-react";
import LifecycleAnimation from "./LifecycleAnimation";
const ReviewLifeCycle = () => {
  return (
    <>
      <div className="bg-zinc-800 h-px w-full mt-24"></div>
      <div className="flex items-center justify-between mt-16">
        <div className="space-y-4">
          <h1 className="text-2xl font-roboto text-zinc-50">
            Review Lifecycle
          </h1>
          <p className="text-sm font-poppins text-zinc-400 my-2">
            A transparent look at how code travels from your repository to our
            analysis engine and back again
          </p>
          <ul className="text-zinc-300 text-xs mt-4 space-y-1">
            <li className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-purple-400" />
              Replacebale LLM Providers
            </li>
            <li className="flex items-center gap-2">
              <CloudOff className="w-4 h-4 text-purple-400" />
              Failure-aware-offline mode
            </li>
            <li className="flex items-center gap-2">
              <ClockFadingIcon className="w-4 h-4 text-purple-400" />
              Versioned Policy Snapshots
            </li>
          </ul>
        </div>
        <LifecycleAnimation />
      </div>
    </>
  );
};

export default ReviewLifeCycle;
