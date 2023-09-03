import * as React from "react";
import { useHistory } from "react-router-dom";
import SignInForm from "../components/form/SignInForm";
import { SESSION_ITEMS, URL_PATHS } from "../constants";

/**
 * 
 * @returns Sign In Page
 */
export default function SignIn() {
  const history = useHistory();

  React.useEffect(() => {
    if (sessionStorage.getItem(SESSION_ITEMS.USER)) {
      history.push(URL_PATHS.HOME);
    }
  });

  return <SignInForm />;
}
