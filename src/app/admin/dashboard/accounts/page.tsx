import Button from "@/components/Button";
import AccountList from "@/components/application/Admin/accounts/list";

export default () => {
  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold text-neutral-900">Accounts</h1>
          <Button size="small">Add account</Button>
        </div>
        <hr />
      </div>
      <AccountList />
    </div>
  );
};
