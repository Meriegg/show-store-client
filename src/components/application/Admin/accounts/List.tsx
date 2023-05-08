"use client";

import LoadingText from "@/components/LoadingText";
import Account from "./Account";
import { api } from "@/utils/api";

const AccountList = () => {
  const { isLoading, data, error } = api.admin.accounts.getAccounts.useQuery();

  return (
    <div className="mt-2 flex flex-wrap gap-4 justify-evenly">
      {isLoading && <LoadingText customLabel="Loading accounts" />}
      {!isLoading && !error && data.map((account, idx) => <Account account={account} key={idx} />)}
    </div>
  );
};

export default AccountList;
