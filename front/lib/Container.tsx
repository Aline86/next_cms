// Classe adaptée à tous les types de blocs
// Permet de gérer tous les calls api grâce à une structure d'url liée aux noms
// d'attributs (logique qui sera suivie sur le même principe pour les méthodes api)
// Logique basée sur le fait que les noms de colonnes en bdd sont identiques au attributs des classes enfants

import { redirect } from "next/navigation";

export default abstract class Container {
  id: number;
  title: string;
  type: string;
  // à mettre dans un process .env
  BASE_URL: string =
    process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
    "/api/index.php?method=";

  constructor(id: number = -1, title: string = "", type: string = "") {
    this.id = id;
    this.title = title;
    this.type = type;
  }
  /**
   *
   * @param bloc any child component
   * @returns a form with the data to send to the API
   */
  private _create_form(bloc: this): FormData {
    const formdata = new FormData();
    const class_properties = Object.keys(this);

    class_properties.forEach((property: string) => {
      if (typeof this[property as keyof this] !== "function") {
        try {
          if (property in bloc) {
            formdata.append(
              property,
              JSON.stringify(bloc[property as keyof typeof bloc])
            );
          }
        } catch {
          if (property in bloc) {
            formdata.append(
              property,
              encodeURIComponent(bloc[property as keyof typeof bloc] as string)
            );
          }
        }
      }
    });
    return formdata;
  }

  /**
   *
   * @param bloc child Class
   * @param action add or update
   * @returns string with promise status to say if data has been correctly sent
   */
  public async save_bloc(): Promise<this> {
    const action = this.id > -1 ? "update" : "add";

    const data_to_send = this._create_form(this);

    await fetch(
      this.BASE_URL + action + "_" + this._get_class_api_call_parameters(),
      {
        method: "POST",

        mode: "cors",

        credentials: "include",
        body: data_to_send,
      }
    )
      .then((response) => {
        if (!response.ok || response.status === 403) {
          if (typeof window !== "undefined") {

            redirect("/admin/login");

          }
        }
        try {
        } catch {}
      })
      .then(() => {
        return this;
      })
      .catch((error: unknown) => {
        console.error(error);
        redirect("/admin/login");
      });

    return this;
  }

  /**
   *
   * @param id
   * @returns the full instance for each child type (the parent knows which child we are talking about)
   */
  public async get_blocs(): Promise<Array<this>> {
    let new_bloc: Array<this> = [];

    try {
      const response = await fetch(
        this.BASE_URL + "all_" + this._get_class_api_call_parameters(),
        {
          mode: "cors",
          headers: {
            Accept: "application/json",
            // Any other headers needed for the request
          },

          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      try {
        const json_object = await response.json();
        new_bloc = json_object;
      } catch {}
    } catch (error) {
      if (error instanceof Error) {
      } else {
        console.error("An unknown error occurred:", error);
      }
    }

    return new_bloc;
  }

  /**
   *
   * @param id
   * @returns the full instance for each child type (the parent knows which child we are talking about)
   */
  public async get_blocs_for_component(): Promise<Array<this>> {
    let new_bloc: Array<this> = [];
    try {
      const response = await fetch(
        this.BASE_URL + "all_" + this._get_class_api_call_parameters(),
        {
          mode: "cors",
          headers: {
            Accept: "application/json",
            // Any other headers needed for the request
          },
          next: { revalidate: 0 },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      try {
        const json_object = await response.json();
        new_bloc = json_object;
      } catch {}
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }

    return new_bloc;
  }
  /**
   *
   * @returns the full instance for each child type (the parent knows which child we are talking about)
   */
  public async get_bloc(): Promise<this> {
    const new_bloc = Object.assign(this, this);

    try {
      const response = await fetch(
        this.BASE_URL + "get_" + this._get_class_api_call_parameters(),
        {
          referrerPolicy: "strict-origin-when-cross-origin", // n
          mode: "cors",
          headers: {
            Accept: "application/json",
            // Any other headers needed for the request
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      try {
        const json_object = await response.json();

        if (json_object.length >= 1) {
          const property_list: Record<string, unknown> = {};
          const class_properties: Array<string> = Object.keys(this);
          class_properties.forEach((key_exists: string) => {
            if (key_exists !== "parameters" && key_exists !== "BASE_URL") {
              property_list[key_exists] = [];
            }
          });

          json_object.forEach((value: this) => {
            Object.entries(value).forEach(([property, data]) => {
              property_list[property] = data;
            });
          });

          this._property_call(property_list);
        }
      } catch {}
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }

    return new_bloc;
  }
  public async delete_bloc(): Promise<void | this> {
    try {
      const response = await fetch(
        this.BASE_URL + this._get_class_api_call_parameters(),
        {
          mode: "cors",
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        redirect("/admin/login");
      }
    } catch {
      redirect("/admin/login");
    }
  }

  public set_id(value: number) {
    this.id = value;
  }
  public _title(): string {
    return this.title;
  }
  public set_title(value: string) {
    this.title = value;
  }

  public _type(): string {
    return this.type;
  }
  public set_type(value: string) {
    this.type = value;
  }
  /**
   *
   * @param property_list list of keys in json object received from api call
   */
  _property_call(property_list: Record<string, unknown>) {
    for (const property in property_list) {
      this.setProperty(this, property, property_list[property] as string);
    }
  }
  setProperty(instance: this, propName: string, value: string) {
    const name: string = "set_" + propName;
    if (
      typeof (instance as unknown as Record<string, unknown>)[name] ===
      "function"
    ) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value;
      }

      // Call the setter as a method
      (instance as unknown as Record<string, (value: unknown) => void>)[name](
        value
      );
    }
  }

  public async classToPlainObject() {
    const obj: Record<string, unknown> = await this.convert_to_object_answer();
    if (obj !== undefined) {
      return obj;
    }
    return this;
  }
  async convert_to_object_answer() {
    const obj: Record<string, unknown> = {};
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (
          typeof (this[key] as unknown) === "object" &&
          this[key] !== null &&
          "classToPlainObject" in (this[key] as object) &&
          typeof (this[key] as { classToPlainObject?: () => unknown })
            .classToPlainObject === "function"
        ) {
          obj[key] = await (
            this[key] as { classToPlainObject: () => unknown }
          ).classToPlainObject();
        } else {
          obj[key] = this[key];
        }
      }
    }
    return obj;
  }

  abstract _get_class_api_call_parameters(): string;
}
