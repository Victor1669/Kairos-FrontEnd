import { useEffect, useState } from "react";

import { refreshTokenApi } from "@Auth/AuthServices";

import { ACCESS_TOKEN_KAIROS, REFRESH_TOKEN_KAIROS } from "@Utils/Storage";
import { useAuthContext } from "@Auth/useAuthContext";

export function useRefreshToken() {
  const { logout } = useAuthContext();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function validateSession() {
      const storedRefreshToken = await REFRESH_TOKEN_KAIROS.get();

      if (!storedRefreshToken) {
        if (isMounted) {
          logout();
          setIsChecking(false);
        }
        return;
      }

      const { success, responseData } = await refreshTokenApi({
        refreshToken: String(storedRefreshToken),
      });

      if (!isMounted) return;

      if (
        !success ||
        !responseData?.accessToken ||
        !responseData?.refreshToken
      ) {
        logout();
        setIsChecking(false);
        return;
      }

      await ACCESS_TOKEN_KAIROS.set(responseData.accessToken);
      await REFRESH_TOKEN_KAIROS.set(responseData.refreshToken);
      setIsChecking(false);
    }

    validateSession();

    return () => {
      isMounted = false;
    };
  }, [logout]);

  return { isChecking };
}
