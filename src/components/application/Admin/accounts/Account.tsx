import { api } from "@/utils/api";
import formatAdminRole from "../../../../utils/format-admin-role";
import { AdminSession, AdminUser } from "@prisma/client";
import clsx from "clsx";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/use-toast";

type Account = AdminUser & {
  activeSessions: AdminSession[];
};

interface Props {
  account: Account;
}

const Account = ({ account }: Props) => {
  const { toast } = useToast();
  const ctx = api.useContext();
  const me = api.admin.data.me.useQuery();
  const deleteAccount = api.admin.accounts.deleteAccount.useMutation({
    onSuccess: () => {
      ctx.admin.accounts.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  return (
    <div
      className="bg-neutral-50 p-4 rounded-md h-fit"
      style={{
        width: "min(400px, 100%)",
      }}
    >
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-lg font-semibold text-neutral-800">{account.name}</p>
          <p className="text-sm font-semibold text-neutral-600">{account.id}</p>
        </div>
        <p
          className={clsx(
            "font-semibold text-sm px-6 py-2 bg-green-100 text-green-900 rounded-full"
          )}
        >
          {formatAdminRole(account.role)}
        </p>
      </div>
      <div className="font-semibold flex w-full items-center justify-between flex-wrap my-1">
        <p className="text-sm text-neutral-600">{account.passwordType} password</p>
        <p>{account.password}</p>
      </div>
      <p className="font-semibold text-sm text-blue-500 mt-2">
        {account.activeSessions.length} Active Session
        {account.activeSessions.length === 1 ? "" : "s"}
      </p>
      {me.data?.adminUser.id !== account.id && (
        <Button
          onClick={() => {
            if (!confirm("Are you sure you want to delete this account?")) return;

            deleteAccount.mutate({
              id: account.id,
            });
          }}
          variant="danger"
          className="w-full mt-2"
          loading={deleteAccount.isLoading}
          right={<FontAwesomeIcon icon={faTrash} />}
        >
          Delete account
        </Button>
      )}
      {me.data?.adminUser.id === account.id && (
        <p className="w-full text-center text-sm text-neutral-600 mt-2 font-semibold">You</p>
      )}
    </div>
  );
};

export default Account;
