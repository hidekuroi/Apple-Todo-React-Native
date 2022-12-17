import { useDispatch } from "react-redux";
// import { AppDispatch } from "../reducers/store";
import { AppDispatch } from "../app/store";

export const useAppDispatch: () => AppDispatch = useDispatch