import Button from "@/components/Button";
import { api } from "@/utils/api";

const LogoutButton = () => {
  const ctx = api.useContext();
  const logout = api.admin.auth.logout.useMutation({
    onSuccess: () => {
      ctx.admin.data.me.invalidate();
    },
  });

  return (
    <Button loading={logout.isLoading} onClick={() => logout.mutate()}>
      Log out
    </Button>
  );
};
export default LogoutButton;
