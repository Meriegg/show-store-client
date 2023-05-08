"use client";

import Button from "@/components/Button";
import { api } from "@/utils/api";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const LogOutBtn = () => {
  const router = useRouter();
  const logOut = api.admin.auth.logout.useMutation({
    onSuccess: () => {
      router.push("/admin");
    },
  });

  return (
    <Button
      loading={logOut.isLoading}
      onClick={() => logOut.mutate()}
      variant="danger"
      right={<FontAwesomeIcon icon={faSignOut} />}
    >
      Log out
    </Button>
  );
};

export default LogOutBtn;
