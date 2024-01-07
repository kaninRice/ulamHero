import { createContext } from "react";

const UserContext = createContext({
    userToken: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUserToken: (_userToken: string) => {}
})

export default UserContext;