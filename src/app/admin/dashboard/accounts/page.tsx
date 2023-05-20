import AddAccountModal from "@/components/application/Admin/accounts/AddAccountModal";
import AccountList from "@/components/application/Admin/accounts/List";

const Accounts = () => {
  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold text-neutral-900">Accounts</h1>
          <AddAccountModal />
        </div>
        <hr />
      </div>
      <AccountList />
    </div>
  );
};

export default Accounts;
