import { useContext } from "react";
import ProtaskContext from "../context/ProtaskProvider";


const useProtask = () => {
    return useContext(ProtaskContext)
}

export default useProtask