"use client";

import Button from "@/components/Button";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";
import {
  AdminAccountsDialogue,
  AdminAddProductDialogue,
  AdminLoginDialogue,
  AdminOrdersDialogue,
  AdminProductTypesDialogue,
  AdminProductsDialogue,
  AdminStoreConfigsDialogue,
  CheckoutDialogue,
  HomeDialogue,
  InitializationDialogue,
  StoreDialogue,
} from "./dialogues";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export type DialogueName =
  | "InitializationDialogue"
  | "HomeDialogue"
  | "StoreDialogue"
  | "CheckoutDialogue"
  | "ProductDialogue"
  | "AdminLogin"
  | "AdminOrders"
  | "AdminProductTypes"
  | "AdminProducts"
  | "AdminAccounts"
  | "AdminStoreConfigs"
  | "AdminAddProduct";
export type DialogueEvent = "next" | "prev" | "holdKnife" | "dropKnife" | "finish";

export interface Dialogue {
  name: DialogueName;
  steps: {
    content: ReactNode | string;
    actions: {
      buttonType?: "primary" | "danger";
      buttonContent?: ReactNode | string;
      events: DialogueEvent[];
    };
  }[];
}

const Guide = () => {
  const path = usePathname();
  const [componentMounted, setComponentMounted] = useState(false);
  const [isHoldingKnife, setHoldingKnife] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [activeDialogue, setActiveDialogue] = useState<Dialogue | null>(null);

  // same as `isSleeping`
  const [isFinished, setFinished] = useState(false);

  // Storage Utils

  const saveStepToStorage = (step: number, name: DialogueName) => {
    localStorage.setItem(`${name}_step`, step.toString());

    return step;
  };

  const saveFinishedToStorage = (name: DialogueName) => {
    localStorage.setItem(`${name}_finished`, "true");

    return true;
  };

  const saveUnfinishedToStorage = (name: DialogueName) => {
    localStorage.removeItem(`${name}_finished`);

    return true;
  };

  const getStepFromStorage = (name: DialogueName) => {
    const step = parseInt(localStorage.getItem(`${name}_step`) || "0");

    return step;
  };

  const getFinishedFromStorage = (name: DialogueName) => {
    const isFinished = JSON.parse(localStorage.getItem(`${name}_finished`) || "false");

    return isFinished;
  };

  // Dialogue management

  const dialogues = {
    "/": HomeDialogue,
    "/store": StoreDialogue,
    "/checkout": CheckoutDialogue,
    "/admin/login": AdminLoginDialogue,
    "/admin/dashboard/orders": AdminOrdersDialogue,
    "/admin/dashboard/producttypes": AdminProductTypesDialogue,
    "/admin/addProduct": AdminAddProductDialogue,
    "/admin/dashboard/accounts": AdminAccountsDialogue,
    "/admin/dashboard/storeConfig": AdminStoreConfigsDialogue,
    "/admin/dashboard/products": AdminProductsDialogue,
  };

  const checkForInitialization = () => {
    const initializationName: DialogueName = "InitializationDialogue";
    const didFinishInitialization = getFinishedFromStorage(initializationName);
    const initializationDialogueStep = getStepFromStorage(initializationName);
    if (!didFinishInitialization) {
      setActiveDialogue(InitializationDialogue);
      setActiveStep(initializationDialogueStep);

      return {
        finished: false,
      };
    }

    return {
      finished: true,
    };
  };

  const load = () => {
    const { finished } = checkForInitialization();
    if (!finished || !path) return;

    type PageDialoguesKey = keyof typeof dialogues;
    const pathDialogue = dialogues[path as PageDialoguesKey];

    if (!pathDialogue) {
      setActiveDialogue(null);
      setActiveStep(0);
      return;
    }

    const isDialogueFinished = getFinishedFromStorage(pathDialogue.name);
    const activeStep = getStepFromStorage(pathDialogue.name);

    if (isFinished !== true) {
      setFinished(isDialogueFinished);
    }
    setActiveDialogue(pathDialogue);
    setActiveStep(activeStep);
  };

  const handleHelpRestart = () => {
    if (!activeDialogue) return;

    setFinished(false);

    const isDialogueFinished = getFinishedFromStorage(activeDialogue.name);

    // If the dialogue is already finished and the user want to go through it again
    // reset every parameter
    if (isDialogueFinished) {
      setActiveStep(0);
      saveStepToStorage(0, activeDialogue.name);
      saveUnfinishedToStorage(activeDialogue.name);
      return;
    }
  };

  // Dialogue events / actions

  const next = () => {
    if (!activeDialogue) return;
    if (activeStep >= activeDialogue.steps.length - 1) return;

    setActiveStep(activeStep + 1);
    saveStepToStorage(activeStep + 1, activeDialogue.name);
  };

  const holdKnife = () => {
    setHoldingKnife(true);
  };

  const dropKnife = () => {
    setHoldingKnife(false);
  };

  const finish = () => {
    if (!activeDialogue) return;
    setFinished(true);

    saveFinishedToStorage(activeDialogue.name);
  };

  useEffect(() => {
    // Solves next.js hydration error
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    load();
  }, [path, isFinished]);

  if (!componentMounted || !activeDialogue) {
    return null;
  }

  if (isFinished) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipContent>
            <p>Wake up your guide</p>
          </TooltipContent>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleHelpRestart()}
              className="fixed transition-all duration-300 cursor-pointer hover:shadow-md shadow-neutral-200 hover:text-neutral-900 hover:bg-neutral-200 z-50 bottom-4 right-4 w-[50px] h-[50px] bg-neutral-100 rounded-full text-lg text-neutral-700"
            >
              <FontAwesomeIcon icon={faExclamation} />
            </button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const currStepData = activeDialogue.steps[activeStep];

  return (
    <div
      className="flex flex-col items-start fixed bottom-6 right-6 md:bottom-0 md:right-0 z-40"
      style={{
        width: "min(400px, 100%)",
      }}
    >
      <div className="pl-2">
        <img
          src="/Mascot.svg"
          alt="Mike Oxlong"
          className="h-[65px] w-auto relative cursor-pointer"
          onClick={() => {
            setFinished(!isFinished);
          }}
        />
        <img
          src="/Knife_Group.svg"
          alt="Mike Oxlong"
          onClick={() => setHoldingKnife(false)}
          className={clsx(
            "absolute h-[65px] w-auto -top-1 transition-all duration-700 cursor-pointer",
            isHoldingKnife ? "left-[38px] opacity-100" : "opacity-0 left-[50px]"
          )}
        />
      </div>
      <div className="px-3 py-3 w-full border-[1px] border-black rounded-lg md:rounded-br-none md:rounded-bl-none md:rounded-tr-none font-semibold flex flex-col gap-2 text-sm bg-white">
        <div className="flex flex-col w-full gap-1">
          <div className="flex justify-between items-center w-full">
            <p>Mike Oxlong</p>
            <p className="text-neutral-600">your guide</p>
          </div>
          <hr />
        </div>

        {typeof currStepData.content === "string" ? (
          <p>{currStepData.content}</p>
        ) : (
          <>{currStepData.content}</>
        )}
        <Button
          className="w-full"
          variant={currStepData.actions.buttonType}
          onClick={() => {
            currStepData.actions.events.map((event) => {
              switch (event) {
                case "next":
                  return next();

                case "holdKnife":
                  return holdKnife();

                case "dropKnife":
                  return dropKnife();

                case "finish":
                  return finish();

                case "prev":
                  return null;

                default:
                  return null;
              }
            });
          }}
        >
          {currStepData.actions.buttonContent || "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Guide;
