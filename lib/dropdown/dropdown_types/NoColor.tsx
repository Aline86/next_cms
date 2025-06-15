import DropdownTypes from "./DropdownType";

export default class NoColor extends DropdownTypes {
  public string_to_ckeck: string;
  public type: string = "no_color";
  constructor(string_to_ckeck: string) {
    super();
    this.string_to_ckeck = string_to_ckeck;
  }

  public check_type() {
    let is_type = false;
    if (
      typeof this.string_to_ckeck === "string" &&
      this.string_to_ckeck === ""
    ) {
      is_type = true;
    }
    return is_type;
  }

  public get_type() {
    return this.type;
  }
}
