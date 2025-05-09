import { cookies } from "next/dist/server/request/cookies";
import { decrypt } from "./../app/lib/session";

export default class User {
  email: string;
  password: string;
  token: string;
  BASE_URL_SITE: string;
  constructor(email: string, password: string, token: string) {
    this.email = email;
    this.password = password;
    this.token = token;
    this.BASE_URL_SITE =
      process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL || "";
  }
  public loginAction() {
    const formdata = new FormData();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Test de l'input avec la regex
    if (emailRegex.test(this.email)) {
      formdata.append("email", this.email);
    } else {
      return false;
    }
    if (passwordRegex.test(this.password)) {
      formdata.append("password", this.password);
    } else {
      return false;
    }
    return formdata;
    /* const response = await fetch(
      this.BASE_URL_SITE + "/api/user.php?method=connexion",
      {
        referrerPolicy: "strict-origin-when-cross-origin", // n
        mode: "cors",
        method: "POST",
        credentials: "include",
        body: formdata,
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    });*/
  }
  async logOut() {
    const response = await fetch(
      this.BASE_URL_SITE + "/api/user.php?method=delete_connexion",
      {
        referrerPolicy: "strict-origin-when-cross-origin", // n
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    });
    return response;
  }
  async check_token(): Promise<boolean | undefined> {
    const cookie = (await cookies()).get("session")?.value;
    if (cookie !== undefined) {
      const session = await decrypt(cookie);
      const response = await fetch(
        this.BASE_URL_SITE + "/api/user.php?method=check_token",
        {
          referrerPolicy: "strict-origin-when-cross-origin", // n
          mode: "cors",
          method: "GET",
          credentials: "include",

          headers: {
            Authorization: `${session}`, // notice the Bearer before your token
          },
        }
      ).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        try {
          return await response.json();
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.log("e", e.message);
          } else {
            console.log("An unknown error occurred");
          }
        }
      });

      return response;
    }
  }
  set_auth_token(token: string) {
    this.token = token;
  }
}
