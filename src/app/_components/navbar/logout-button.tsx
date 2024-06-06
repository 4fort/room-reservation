import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { logoutAction } from "./logoutAction";

export function LogoutButton() {
  return (
    <DropdownMenuItem onClick={() => logoutAction()}>Logout</DropdownMenuItem>
  );
}
