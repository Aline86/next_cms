import DropdownTypes from "./DropdownType";

export default class UnifiedColor extends DropdownTypes {
  public string_to_ckeck: string;
  public type: string = "unified_color";
  constructor(string_to_ckeck: string) {
    super();
    this.string_to_ckeck = string_to_ckeck;
  }

  public check_type() {
    let is_type = false;
    console.log("this.string_to_ckeck", this.string_to_ckeck);
    if (
      typeof this.string_to_ckeck === "string" &&
      this.string_to_ckeck !== "" &&
      (/[0-9A-Fa-f]{6}/g.test(this.string_to_ckeck) ||
        /[0-9A-Fa-f]{8}/g.test(this.string_to_ckeck))
    ) {
      is_type = true;
    }
    return is_type;
  }

  public get_type() {
    return this.type;
  }
}
