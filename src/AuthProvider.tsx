import { authAtom, userProfileAtom } from "./atoms/authAtom.tsx";
import { useAtom, useSetAtom } from "jotai";
import Keycloak from "keycloak-js";
import React, { type ReactNode, useCallback, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const keycloakConfig = {
    url: "http://localhost:8081/",
    realm: "time-management-realm",
    clientId: "time-management-client",
  };

const keycloak = new Keycloak(keycloakConfig);

/**
 * Provides Keycloak authentication functions, such as login and logout
 */
const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useAtom(authAtom);
  const setUserProfile = useSetAtom(userProfileAtom);

  const updateAuthData = useCallback(() => {
    setAuth({
      token: keycloak?.tokenParsed,
      tokenRaw: keycloak?.token,
      logout: () => keycloak?.logout({ redirectUri: window.location.origin })
    });

    setUserProfile(keycloak.profile);
  }, [auth]);

  const clearAuthData = useCallback(() => {
    setAuth(undefined);
    setUserProfile(undefined);
  }, [auth]);

  const initAuth = useCallback(async (): Promise<void> => {
    try {
        console.log("Attempting Keycloak init with config:", keycloakConfig);

      const authenticated = await keycloak.init({
        onLoad: "check-sso",
        checkLoginIframe: true, // enable this unless you *really* don't want iframe login check
        pkceMethod: "S256",     // if you're using public clients
        //flow: "standard",
      });
  
      console.log("Keycloak initialized:", authenticated);

      if (authenticated) {
        await keycloak.loadUserProfile();
        console.log("User Profile:", keycloak.profile);
        updateAuthData();
      } else {
        console.log("User not authenticated. Redirecting to login...");
        await keycloak.login();
      }
      
    } catch (error) {
        console.error("❌ Keycloak init failed:");
        console.error("Error type:", typeof error);
        console.dir(error);
      }
      
  }, []);
  
  

  /**
   * Initializes authentication when component mounts
   */
  useEffect(() => {
    initAuth();
  }, []);
  

  if (!auth) return <div>Loading...</div>;

  console.log(keycloak)

  return children;
};

export default AuthProvider;
