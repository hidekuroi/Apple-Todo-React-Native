import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../reducers/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector