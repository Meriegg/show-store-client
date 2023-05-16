import CardNumber from "./CardNumber";
import HighlightText from "./HighlightText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dialogue } from "./Guide";
import {
  faCheck,
  faEdit,
  faExclamation,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { StripeTestCards } from "@/constants";

export const InitializationDialogue: Dialogue = {
  name: "InitializationDialogue",
  steps: [
    {
      content: "Hi there, my name is Mike Oxlong and I will guide you through this site!",
      actions: {
        events: ["next"],
        buttonContent: "Awesome!",
      },
    },
    {
      content:
        "Remember this is only a demo site and doesn't actually sell any real products, so don't enter you real information!",
      actions: {
        events: ["next", "holdKnife"],
        buttonContent: "I understand!",
      },
    },
    {
      content: "I will be watching every one of your moves",
      actions: {
        events: ["next", "dropKnife"],
        buttonContent: "OKAY!",
        buttonType: "danger",
      },
    },
    {
      content: (
        <div className="flex flex-col gap-2">
          <p>
            I will go to sleep now, if you need help with any page just wake me up by clicking on
            the following button
          </p>
          <button className="transition-all duration-300 cursor-pointer hover:shadow-md shadow-neutral-200 hover:text-neutral-900 hover:bg-neutral-200 z-50 w-[50px] h-[50px] bg-neutral-100 rounded-full text-lg text-neutral-700">
            <FontAwesomeIcon icon={faExclamation} />
          </button>
          <p>situated on the bottom right part of the screen.</p>
        </div>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Yep",
      },
    },
  ],
};

export const HomeDialogue: Dialogue = {
  name: "HomeDialogue",
  steps: [
    {
      content: "Welcome to the Home page! There are a few cool things in here you can try out",
      actions: {
        events: ["next"],
      },
    },
    {
      content: (
        <>
          <p className="flex flex-col gap-2">
            You probably noticed some buttons with an edit icon inside
            <button className="bg-neutral-800 w-fit transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-2 py-2 flex items-center justify-center">
              <FontAwesomeIcon icon={faEdit} />
            </button>{" "}
            If you click it you will be able to modify the text content of that specific element.
            Your changes will be saved locally and will be available even after you refresh the
            page.
          </p>
        </>
      ),
      actions: {
        events: ["next"],
      },
    },
    {
      content: (
        <>
          <p className="flex flex-col gap-2">
            If you want to remove your changes and revert to the original text you can press this
            button
            <button
              title="Delete changes"
              className="bg-neutral-800 w-fit transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-3 py-2 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            or if you want to get rid of your current changes you can press this button
            <button
              title="Discard changes"
              className="bg-neutral-800 w-fit transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-3 py-2 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </p>
        </>
      ),
      actions: {
        events: ["next"],
      },
    },
    {
      content: (
        <p className="flex flex-col gap-2">
          Finally, to save your changes you can press this button
          <button
            title="Save changes"
            className="bg-neutral-800 w-fit transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-3 py-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          Try it out!
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay!",
      },
    },
  ],
};

export const StoreDialogue: Dialogue = {
  name: "StoreDialogue",
  steps: [
    {
      content: (
        <p>
          This is just an ordinary online store page, you can filter by type and by price. You can
          add new product types through the Admin dashboard!
        </p>
      ),
      actions: {
        events: ["next"],
      },
    },
    {
      content: (
        <p>
          Now add a product to your cart either by pressing on the product image or the black button
          located in the bottom right corner of the card.
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay!",
      },
    },
  ],
};

// This is not used yet
export const ProductPageDialogue: Dialogue = {
  name: "ProductDialogue",
  steps: [
    {
      content: <p>Remember this is not a real product!</p>,
      actions: {
        events: ["finish"],
        buttonContent: "Okay!",
      },
    },
  ],
};

export const CheckoutDialogue: Dialogue = {
  name: "CheckoutDialogue",
  steps: [
    {
      content: (
        <p>Remember that this is only a demo website and to not enter you real information!</p>
      ),
      actions: {
        events: ["next"],
        buttonContent: "I understand!",
      },
    },
    {
      content: (
        <div className="flex flex-col gap-2">
          <p>
            The online payment option runs in a stripe test environment,{" "}
            <span className="font-extrabold italic">
              do not enter your real card information because it will produce an error!
            </span>
          </p>
          <p>Here are some test cards you can use:</p>

          <div className="flex flex-col gap-2">
            {StripeTestCards.map((card, idx) => (
              <CardNumber key={idx} card={card} />
            ))}
          </div>
        </div>
      ),
      actions: {
        events: ["next"],
      },
    },
    {
      content: (
        <p>
          After you place your order you can go into the Admin dashboard and view your order
          information. To do that you can press on the settings button on the bottom left part of
          the screen and select Go to admin dashboard
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay!",
      },
    },
  ],
};

export const AdminLoginDialogue: Dialogue = {
  name: "AdminLogin",
  steps: [
    {
      content: (
        <p>
          Press <HighlightText>Use a Preview account</HighlightText>
          to continue!
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay",
      },
    },
  ],
};

export const AdminOrdersDialogue: Dialogue = {
  name: "AdminOrders",
  steps: [
    {
      content: (
        <p>
          Here you can view all orders. Try to find yours or just press on a random one and explore!
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay",
      },
    },
  ],
};

export const AdminProductTypesDialogue: Dialogue = {
  name: "AdminProductTypes",
  steps: [
    {
      content: (
        <p>
          Here you can view all product types displayed on products and on the store filter. You can
          add one by pressing <HighlightText>Add type</HighlightText>. Keep in mind that you are not
          authorized to modify store values, you can only see the UI.
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay",
      },
    },
  ],
};

export const AdminProductsDialogue: Dialogue = {
  name: "AdminProducts",
  steps: [
    {
      content: (
        <p>
          Here you can view all live products, you can add a new product by pressing{" "}
          <HighlightText>Add product</HighlightText> or you can edit a product. Try it out!
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay!",
      },
    },
  ],
};

export const AdminAddProductDialogue: Dialogue = {
  name: "AdminAddProduct",
  steps: [
    {
      content: (
        <p>
          Here you can add a new product. Keep in mind that you can only view the UI and not make
          modifications to the live website in order to avoid inappropriate content!
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay",
      },
    },
  ],
};

export const AdminStoreConfigsDialogue: Dialogue = {
  name: "AdminStoreConfigs",
  steps: [
    {
      content: (
        <p>
          Here you can view all store configurations. Store configurations currently control only
          the items display on the home page's horizontal list and the shipping price. To add one
          you can press <HighlightText>Add a configuration</HighlightText>, keep in mind that you
          can only view the UI!
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay",
      },
    },
  ],
};

export const AdminAccountsDialogue: Dialogue = {
  name: "AdminAccounts",
  steps: [
    {
      content: (
        <p>
          Here you can view and manage all authorized accounts. To add a new account you can press{" "}
          <HighlightText>Add account</HighlightText>. Accounts can have 2 password types, a public
          password only used for preview accounts and a hashed password typically used for owner
          (admin) accounts. Keep in mind that you can only view and interact with the UI!
        </p>
      ),
      actions: {
        events: ["finish"],
        buttonContent: "Okay",
      },
    },
  ],
};
