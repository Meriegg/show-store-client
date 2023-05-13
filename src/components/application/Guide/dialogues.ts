import type { Dialogue } from "./Guide";

export const InitializationDialogue: Dialogue = {
  name: "InitializationDialogue",
  steps: [
    {
      content: "Hi there, my name is Mike Oxlong and I will guide you through this site!",
      actions: {
        events: ['next'],
        buttonContent: 'Awesome!'
      },
    },
    {
      content: "Remember this is only a demo site and doesn't actually sell any real products, so don't enter you real information!",
      actions: {
        events: ['next', 'holdKnife'],
        buttonContent: 'I understand!'
      },
    },
    {
      content: 'I will be watching every one of your moves',
      actions: {
        events: ['next', 'dropKnife'],
        buttonContent: 'OKAY!'
      },
    },
    {
      content: 'I will go to sleep now, if you need any help with any page just wake me up by pressing the `!` button on the bottom right part of the screen!',
      actions: {
        events: ['finish'],
        buttonContent: 'Okay'
      },
    },
  ]
}

export const HomeDialogue: Dialogue = {
  name: "HomeDialogue",
  steps: [
    {
      content: "Step 1",
      actions: {
        events: ['next']
      }
    },
    {
      content: "Step 2, will hold knife on next step",
      actions: {
        events: ['next', 'holdKnife']
      }
    },
    {
      content: "Step 3, will drop knife on next step",
      actions: {
        buttonType: 'danger',
        buttonContent: "OKAY!",
        events: ['next', 'dropKnife']
      }
    },
    {
      content: "Finish step",
      actions: {
        events: ['finish']
      }
    },
  ]
}