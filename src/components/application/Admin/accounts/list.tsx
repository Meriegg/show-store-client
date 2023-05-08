"use client";

import LoadingText from "@/components/LoadingText";
import { api } from "@/utils/api";

const AccountList = () => {
  const { isLoading, data, error } = api.admin.accounts.getAccounts.useQuery();

  return (
    <div>
      {isLoading && <LoadingText customLabel="Loading accounts" />}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AccountList;
