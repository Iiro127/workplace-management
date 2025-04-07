// MinimalKeycloakTest.js
import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";

const MinimalKeycloakTest = () => {
  const [message, setMessage] = useState("Initializing...");

  useEffect(() => {
    const keycloak = new Keycloak({
      url: "http://localhost:8081/",
      realm: "time-management-realm",
      clientId: "time-management-client",
    });

    keycloak
      .init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
        //flow: "standard",
      })
      .then((authenticated) => {
        console.log("Authenticated?", authenticated);
        setMessage(authenticated ? "Authenticated ✅" : "Not Authenticated ❌");
        if (!authenticated) keycloak.login();
      })
      .catch((err) => {
        console.error("🔥 Init Failed with error:", err);
        setMessage("Init failed 💀");
      });
  }, []);

  return <div>{message}</div>;
};

export default MinimalKeycloakTest;
