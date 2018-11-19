import auth0 from "auth0-js";
import config from "config";

class Auth0 {
  auth0 = new auth0.WebAuth({
    ...config.auth.auth0,
    responseType: "token id_token",
    scope: "openid profile",
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () =>
    new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) reject(err);
        resolve(this.generateSession(authResult));
      });
    });

  getProfile = accessToken =>
    new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) reject(err);
        resolve(profile);
      });
    });

  generateSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );

    return { ...authResult, expiresAt };
  }

  checkSession(callback) {
    this.auth0.checkSession({}, callback);
  }
}

export default Auth0;
