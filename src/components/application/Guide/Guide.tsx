"use client";

import Button from "@/components/Button";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Guide = () => {
  type DialogueData = {
    activeStep: number;
    steps: {
      text: string;
      action: {
        buttonVariant: "danger" | "ghost" | "primary";
        buttonText: string;
        actions: ("next" | "removeKnife" | "previous")[];
      } | null;
    }[];
  };

  type DialogueKeys = keyof {
    home: "home";
    default: "default";
  };

  const defaultDialogue: DialogueData = {
    activeStep: 0,
    steps: [
      {
        text: "For now I don't have anything to tell you, try navigating the website!",
        action: null,
      },
    ],
  };

  const path = usePathname();
  const [activeDialogueKey, setActiveDialogueKey] = useState<DialogueKeys>("default");
  const [activeDialogue, setActiveDialogue] = useState<DialogueData>(defaultDialogue);
  const [isHoldingKnife, setHoldingKnife] = useState(false);

  const dialogues: {
    [key in DialogueKeys]: DialogueData;
  } = {
    home: {
      activeStep: 0,
      steps: [
        {
          text: "Hi there, my name is Mike Oxlong and I will guide you through this website!",
          action: {
            buttonVariant: "primary",
            buttonText: "Awesome!",
            actions: ["next"],
          },
        },
        {
          text: "Next step!",
          action: null,
        },
      ],
    },
    default: {
      ...defaultDialogue,
    },
  };

  const routeDialogues: {
    [key: string]: {
      key: DialogueKeys;
      data: DialogueData;
    };
  } = {
    "/": {
      key: "home",
      data: dialogues.home,
    },
  };

  const next = () => {
    dialogues[activeDialogueKey].activeStep = activeDialogue.activeStep + 1;
    setActiveDialogue(dialogues[activeDialogueKey]);
  };

  const removeKnife = () => {
    setHoldingKnife(false);
  };

  const getActiveDialogue = () => {
    const dialogue = activeDialogue.steps[activeDialogue.activeStep];

    return {
      ...dialogue,
    };
  };

  useEffect(() => {
    if (!path) {
      setActiveDialogue(defaultDialogue);
      setActiveDialogueKey("default");
      return;
    }

    type RouteDialogueKey = keyof typeof routeDialogues;
    const dialogue = routeDialogues[path as RouteDialogueKey];

    setActiveDialogue(dialogue.data);
    setActiveDialogueKey(dialogue.key);
  }, [path]);

  if (!activeDialogue) {
    return null;
  }

  return (
    <div
      className="flex flex-col items-start fixed bottom-6 right-6 z-40"
      style={{
        width: "min(300px, 100%)",
      }}
    >
      <div>
        <img src="/Mascot.svg" alt="Mike Oxlong" className="h-[65px] w-auto relative" />
        <img
          src="/Knife_Group.svg"
          alt="Mike Oxlong"
          className={clsx(
            "absolute h-[65px] w-auto -top-1 transition-all duration-700",
            isHoldingKnife ? "left-[30px] opacity-100" : "opacity-0 left-[50px]"
          )}
        />
      </div>
      <div className="px-3 py-3 w-full border-[1px] border-black rounded-lg font-semibold flex flex-col gap-2 text-sm bg-white">
        <div className="flex flex-col w-full gap-1">
          <div className="flex justify-between items-center w-full">
            <p>Mike Oxlong</p>
            <p className="text-neutral-600">your guide</p>
          </div>
          <hr />
        </div>

        <p>{getActiveDialogue()?.text}</p>
        {getActiveDialogue()?.action !== null && (
          <Button
            className="w-full"
            variant={getActiveDialogue()?.action?.buttonVariant || "primary"}
            onClick={() => {
              getActiveDialogue()?.action?.actions.map((action) => {
                switch (action) {
                  case "next":
                    return next();

                  case "removeKnife":
                    return removeKnife();

                  case "previous":
                    return null;

                  default:
                    return null;
                }
              });
            }}
          >
            {getActiveDialogue()?.action?.buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Guide;
