import { JSONContent } from "@tiptap/react";
import SubModelTypes from "./../lib/subModelTypes";
import UpdateCommand from "./UpdateCommand";

export class ModelUpdateData<T, K extends keyof T> implements UpdateCommand {
  constructor(
    private instance: T,
    private key: K,
    private index?: number,
    private value?: string | boolean | number | JSONContent[],
    private sub_attribute_name?: string
  ) {}

  execute(): T {
    const accessor = new Accessor(this.instance, this.key);
    const data = accessor.getAttribute();

    // Case 1: Array with sub-attribute
    if (this.isUpdatableArray(data)) {
      data[this.index!][this.sub_attribute_name!] =
        this.value === "on" ? true : this.value;
      this.instance[this.key] = data as T[K];
      return this.instance;
    }

    // Case 2: Object with sub-attribute
    if (this.isUpdatableObject(this.instance[this.key])) {
      (this.instance[this.key] as Record<string, unknown>)[
        this.sub_attribute_name!
      ] = this.value;

      return this.instance;
    }

    // direct assignment
    this.instance[this.key] = this.value as T[K];
    return this.instance;
  }

  private isUpdatableArray(
    data: unknown
  ): data is Array<Record<string, unknown>> {
    return (
      Array.isArray(data) &&
      typeof this.index === "number" &&
      this.index >= 0 &&
      this.index < data.length &&
      this.sub_attribute_name !== undefined &&
      data[this.index] !== undefined
    );
  }

  private isUpdatableObject(value: unknown): value is Record<string, unknown> {
    return (
      typeof value === "object" &&
      value !== null &&
      this.sub_attribute_name !== undefined &&
      this.sub_attribute_name in value
    );
  }
}

class Accessor<T> {
  constructor(private instance: T, private attributeName: keyof T) {}

  public getAttribute(): SubModelTypes | string | number | boolean {
    return this.instance[this.attributeName] as
      | SubModelTypes
      | string
      | number
      | boolean;
  }
}
