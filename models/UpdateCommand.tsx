import ComponentTypes from "./../lib/types";

interface UpdateCommand {
  execute(target: ComponentTypes): void;
}
export default UpdateCommand;
