import { ReactNode } from 'react';
import { create } from 'zustand';

interface Dialogue {
  activeStep: number;
  name: string;
  activePath?: string;
  isFinished: boolean;
  replies: {
    content: ReactNode | string;
    actions: {
      buttonType?: "danger" | "primary";
      events: ("next" | "previous" | "holdKnife" | "dropKnife" | "finish")[]
    }
  }[];
  isGlobal: boolean;
}

interface UseGuide {
  dialogues: Dialogue[];
  nextStep: () => void;
  loadDialogue: () => Dialogue;
  setAsFinished: () => Dialogue;
}

export const useGuide = create<UseGuide>((set) => ({
  dialogues: [
    {
      activeStep: 0,
      isFinished: false,
      isGlobal: true,
      name: "Initialization",
      replies: [
        {
          content: "Initialization test",
          actions: {
            events: ['next']
          }
        },
        {
          content: "Initialization test 2",
          actions: {
            events: ['next']
          }
        },
        {
          content: "Initialization test 3",
          actions: {
            events: ['next', "holdKnife"]
          }
        },
        {
          content: "Initialization test 4",
          actions: {
            events: ['next', "dropKnife"],
            buttonType: 'danger'
          }
        },
        {
          content: "Initialization test 5",
          actions: {
            events: ['finish']
          }
        }
      ]
    }
  ],

}))