import * as React from "react";
import { useState } from "react";
import { TSFixMe } from "../../types";

interface UserInfoType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface FileType {
  createdAt?: Date,
  filename: string,
  id: string,
  size?: number,
  type : "0" | "1",
  updatedAt?: Date
}
interface DirectoryType {
  counts: number,
  createdAt: Date,
  dir_path: string,
  files: FileType[],
  name: string,
  sub_dirs: DirectoryType[]
  updatedAt : Date
}

interface defaultContextType {
  currDir: string;
  setCurrDir: React.Dispatch<React.SetStateAction<string>>;
  files: FileType[];
  setFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  directories: DirectoryType[];
  setDirectories: React.Dispatch<React.SetStateAction<DirectoryType[]>>;
  breadcrumbsList: string[];
  setBreadcrumbsList: React.Dispatch<React.SetStateAction<string[]>>;
  user: UserInfoType;
  setUser: React.Dispatch<React.SetStateAction<UserInfoType>>;
}

//@ts-ignore
const DefaultContext: React.Context<defaultContextType> = React.createContext();
export function DefaultContextProvider({ children }: TSFixMe) {
  const [directories, setDirectories] = useState<DirectoryType[]>([]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [currDir, setCurrDir] = useState("/");
  const [breadcrumbsList, setBreadcrumbsList] = useState<string[]>(["Home"]);
  const [user, setUser] = useState<UserInfoType>(
    JSON.parse(window.sessionStorage.getItem("user") as string)
  );

  const defaultContext: defaultContextType = {
    currDir: currDir,
    setCurrDir: setCurrDir,
    files: files,
    setFiles: setFiles,
    directories: directories,
    setDirectories: setDirectories,
    breadcrumbsList: breadcrumbsList,
    setBreadcrumbsList: setBreadcrumbsList,
    user: user,
    setUser: setUser,
  };

  return (
    <DefaultContext.Provider value={defaultContext}>
      {children}
    </DefaultContext.Provider>
  );
}

export function useDefaultContext() {
  return React.useContext(DefaultContext);
}
