import { ImportRecord } from "../models/import-record.model";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export interface GlobalStateInterface {
    records: ImportRecord[];
    ignoredCategories: string[];
}

const GlobalStateContext = createContext({
    state: {} as GlobalStateInterface,
    setState: {} as Dispatch<SetStateAction<GlobalStateInterface>>
});

const GlobalStateProvider = ({
    children,
    value = {
        records: [],
        ignoredCategories: []
    } as GlobalStateInterface
}: {
    children: React.ReactNode;
    value?: GlobalStateInterface;
}) => {
    const [state, setState] = useState(value);
    return (
        <GlobalStateContext.Provider value={{ state, setState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

const useGlobalState = () => {
    const context = useContext(GlobalStateContext)
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateContext")
    }
    return context;
}

export { GlobalStateProvider, useGlobalState }