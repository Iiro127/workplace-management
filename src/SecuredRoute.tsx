import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

let keycloakInstance;

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

const SecuredRoute = ({ children }) => {
  const [keycloak, setKeycloak] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kc = getKeycloak();

    kc.onAuthError = (errorData) => {
      console.error("🔥 Auth Error:", errorData);
    };

    kc.onReady = (authenticated) => {
      console.log("🟢 Keycloak Ready:", authenticated);
    };

    kc.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      checkLoginIframe: true,
      enableLogging: true
    })
    .then((authenticated) => {
      console.log("✅ Authenticated:", authenticated);
      setKeycloak(kc);
      setAuthenticated(authenticated);
    })
    .catch((err) => {
      console.error("❌ Keycloak init failed", err);
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

  if (!isAuthenticated) return <div>Keycloak error; you are not authenticated.</div>;

  return children;
};

export default SecuredRoute;
