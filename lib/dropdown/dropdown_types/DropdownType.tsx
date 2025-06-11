export default abstract class DropdownTypes {
  abstract type: string | undefined | number;
  abstract check_type(): boolean | Promise<boolean>;
}
