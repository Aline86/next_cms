"use server";
import { useState } from "react";
import "./../../pages/global.css";

import User from "../../models/User";
import router from "next/router";
import { Label } from "@radix-ui/react-label";
import { Button, Input } from "@headlessui/react";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleSubmitEvent = async (e: { preventDefault: () => void }) => {
    "use server";
    e.preventDefault();

    if (input.email !== "" && input.password !== "") {
      /*await fetch("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        credentials: "include",
      });*/
      const user = new User(input.email, input.password, "");
      const formdata = user.loginAction() as FormData;

      if (formdata) {
        await fetch("/api/user", {
          referrerPolicy: "strict-origin-when-cross-origin", // n
          mode: "cors",
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            router.push("/admin/login");
          }

          router.push("/admin/pages");
        });
      }
    }
  };
  const handleInput = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return input !== undefined ? (
    <div className="w-[50vw] ml-[24%] mt-[10%] p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmitEvent}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Se connecter
        </h5>

        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label className="text-slate-500 " htmlFor="email">
              Email
            </Label>
            <Input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => handleInput(e)}
              value={input.email}
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-slate-500 " htmlFor="email">
              Mot de passe
            </Label>
            <Input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              name="password"
              id="password"
              type="password"
              required
              value={input.password}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <h5 className="flex mt-8 items-center justify-center text-xl font-medium text-gray-900 dark:text-white">
            <Button
              type="submit"
              className="border border-gray-300  w-[120px] block leading-1 bg-slate-800 text-slate-50 cursor-pointer rounded h-[50px] mt-8"
            >
              Login
            </Button>
          </h5>
        </div>
      </form>
    </div>
  ) : (
    <></>
  );
}
