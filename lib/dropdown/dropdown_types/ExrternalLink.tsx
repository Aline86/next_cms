import DropdownTypes from "./DropdownType";

export default class ExternalLink extends DropdownTypes {
  public string_to_ckeck: string;
  public type: string = "external_link";
  constructor(string_to_ckeck: string) {
    super();
    this.string_to_ckeck = string_to_ckeck;
  }

  public check_type() {
    let is_external_link = false;
    if (
      typeof this.string_to_ckeck === "string" &&
      this.string_to_ckeck.startsWith("https://")
    ) {
      is_external_link = true;
    }
    return is_external_link;
  }

  public get_type() {
    return this.type;
  }
}
