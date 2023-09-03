import * as React from "react";
import { SESSION_ITEMS, URL_PATHS } from "../constants";
import { useHistory } from "react-router-dom";
import SignUpForm from "../components/form/SignUpForm";

/**
 * 
 * @returns Sign Up Page
 */
export default function SignUp() {
  const history = useHistory();

  React.useEffect(() => {
    if (sessionStorage.getItem(SESSION_ITEMS.USER)) {
      history.push(URL_PATHS.HOME);
    }
  });

  return <SignUpForm />;
}
