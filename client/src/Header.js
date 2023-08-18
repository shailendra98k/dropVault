import MenuIcon from "@mui/icons-material/Menu";
import {useActionListContext} from "./context/ActionListContext";

export const Header = () => {
  const { isActionListOpen, setIsActionListOpen} = useActionListContext();
  return (
    <div style={{ padding: "20px" }}>
      <span
        id="hamburger"
        onClick={() => {
          setIsActionListOpen(true);
        }}
      >
        <MenuIcon /> &nbsp; &nbsp;
      </span>
      <span>Your DropBox</span>
    </div>
  );
};
