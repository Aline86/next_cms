import DropdownTypes from "./DropdownType";

export default class Picture extends DropdownTypes {
  public string_to_ckeck: string;
  public type: string = "picture";
  constructor(string_to_ckeck: string) {
    super();
    this.string_to_ckeck = string_to_ckeck;
  }

  public check_type() {
    let is_type = false;
    if (
      typeof this.string_to_ckeck === "string" &&
      /\.(jpe?g|png|gif|webp)$/i.test(this.string_to_ckeck)
    ) {
      is_type = true;
    }
    return is_type;
  }

  public get_type() {
    return this.type;
  }
}
