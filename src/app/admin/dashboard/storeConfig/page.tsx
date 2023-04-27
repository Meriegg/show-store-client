"use client";

import LoadingText from "@/components/LoadingText";
import AddConfigModal from "@/components/application/Admin/storeConfig/addConfigModal";
import ConfigItem from "@/components/application/Admin/storeConfig/ConfigItem";
import { api } from "@/utils/api";

const StoreValues = () => {
  const { isLoading, data, error, isError } = api.admin.storeConfig.getAllConfigs.useQuery();

  if (isLoading) {
    return <LoadingText customLabel="Loading configs" />;
  }

  if (isError) {
    return <p className="w-full mt-4 text-center font-semibold text-red-600">{error.message}</p>;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold text-neutral-900">Store configurations</h1>
          <AddConfigModal />
        </div>
        <hr />

        <div className="flex gap-2 flex-wrap">
          {data.map((config, idx) => (
            <ConfigItem data={data} config={config} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
};

export default StoreValues;
