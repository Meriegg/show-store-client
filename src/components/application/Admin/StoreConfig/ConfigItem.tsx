import clsx from "clsx";
import Button from "@/components/Button";
import { api } from "@/utils/api";
import { faEye, faEyeSlash, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import type { StoreConfig } from "@prisma/client";

interface Props {
  config: StoreConfig;
  data: StoreConfig[];
}

const ConfigItem = ({ config, data }: Props) => {
  const [showHomeItems, setShowHomeItems] = useState(false);
  const ctx = api.useContext();
  const makeActive = api.admin.storeConfig.setStoreConfigAsActive.useMutation({
    onSuccess: () => {
      ctx.admin.storeConfig.invalidate();
      ctx.storeConfig.invalidate();
    },
  });
  const deleteConfig = api.admin.storeConfig.deleteConfig.useMutation({
    onSuccess: () => {
      ctx.admin.storeConfig.invalidate();
      ctx.storeConfig.invalidate();
    },
  });

  return (
    <div
      style={{
        width: "min(400px, 100%)",
      }}
      className="p-4 bg-neutral-50 border-1 border-neutral-200 rounded-lg font-semibold justify-between flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between w-full items-center">
          <p className="text-lg font-semibold text-neutral-900">{config.name || "Unnamed"}</p>
          <p
            className={clsx(
              "text-sm px-4 py-1 rounded-full",
              config.isActive ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"
            )}
          >
            {config.isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm text-neutral-500">Shipping price:</p>
          <p className="text-base text-neutral-900">{config.shippingPrice}$</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-neutral-500 text-sm mt-2">Home explore list items</p>
          {!!config.homeHorizontalListItems.length && (
            <button onClick={() => setShowHomeItems(!showHomeItems)} className="text-sm gap-2">
              {showHomeItems ? "Hide" : "Show"}{" "}
              <FontAwesomeIcon icon={showHomeItems ? faEyeSlash : faEye} />
            </button>
          )}
          {!config.homeHorizontalListItems.length && (
            <p className="text-sm font-semibold text-neutral-900">No items</p>
          )}
        </div>
        {showHomeItems && (
          <div className="flex flex-wrap w-full font-semibold gap-2 justify-center">
            {config.homeHorizontalListItems.map((item, idx) => (
              <p key={idx} className="text-sm px-4 py-1 rounded-full bg-blue-100 text-blue-900">
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center w-full gap-2">
        {!config.isActive && (
          <Button
            loading={makeActive.isLoading}
            onClick={() => {
              if (!confirm("Are you sure you want to set this config as active?")) return;
              makeActive.mutate({ id: config.id });
            }}
            className="w-full"
          >
            Set active
          </Button>
        )}
        <Button
          className="w-full"
          variant="danger"
          loading={deleteConfig.isLoading}
          onClick={() => {
            if (!confirm("Are you sure you want to delete this config?")) return;
            deleteConfig.mutate({ id: config.id });
          }}
          disabled={data.length <= 1}
          right={<FontAwesomeIcon icon={faTrash} />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ConfigItem;
