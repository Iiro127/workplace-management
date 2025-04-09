// 📦 External Imports
import React, { useState, useEffect, useCallback } from 'react';
import Keycloak from 'keycloak-js';
import { useAtom, useSetAtom } from "jotai";
import { authAtom, userProfileAtom } from "./atoms/authAtom.tsx";

// 👑 Global Singleton Instance
let keycloakInstance;

// ⚙️ Keycloak Getter
function getKeycloak() {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: "http://localhost:8081/",
      realm: "time-management-realm",
      clientId: "time-management-client",
    });
  }
  return keycloakInstance;
}

// 🔍 User Info Fetcher
export async function loadUserInfo(keycloakInstance) {
  if (!keycloakInstance || !keycloakInstance.authenticated) {
    throw new Error("Keycloak is not initialized or user not authenticated.");
  }

  try {
    const userInfo = await keycloakInstance.loadUserInfo();
    console.log(JSON.stringify(userInfo, null, 2));
    return userInfo;
  } catch (error) {
    console.error("Error loading user info:", error);
    throw error;
  }
}

const SecuredRoute = ({ children }) => {
  const [keycloak, setKeycloak] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useAtom(authAtom);
  const setUserProfile = useSetAtom(userProfileAtom);

  useEffect(() => {
    const kc = getKeycloak();

    kc.onAuthError = (errorData) => {
      console.error("Auth Error:", errorData);
    };

    kc.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      checkLoginIframe: true,
      enableLogging: true
    })
    .then(async (authenticated) => {
      console.log("Authenticated:", authenticated);
      setKeycloak(kc);
      setAuthenticated(authenticated);
    
      const userInfo = await loadUserInfo(kc);
    
      const isAdmin = kc.tokenParsed?.preferred_username === "admin";
    
      setAuth({
        token: kc?.tokenParsed,
        tokenRaw: kc?.token,
        logout: () => kc?.logout({ redirectUri: window.location.origin }),
        isAdmin,
      });
    
      setUserProfile(userInfo);
    })
    
    .catch((err) => {
      console.error("Keycloak init failed", err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated && keycloak) {
    keycloak.login();
    return <div>Redirecting to login...</div>;
  }

  if (!isAuthenticated) return <div>Auth error.</div>;

  return children;
};

export default SecuredRoute;
