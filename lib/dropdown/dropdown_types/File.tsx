import DropdownTypes from "./DropdownType";

export default class FileLink extends DropdownTypes {
  public string_to_ckeck: string;
  public type: string = "file";
  constructor(string_to_ckeck: string) {
    super();
    this.string_to_ckeck = string_to_ckeck;
  }

  public check_type() {
    let is_external_link = false;
    if (
      typeof this.string_to_ckeck === "string" &&
      /.pdf/.test(
        String(this.string_to_ckeck).substring(
          String(this.string_to_ckeck).length - 4
        )
      )
    ) {
      is_external_link = true;
    }
    return is_external_link;
  }

  public get_type() {
    return this.type;
  }
}
