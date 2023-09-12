import React from "react";
import {
  usePokemonDataContext,
  usePokemonDataDispatchContext,
} from "../providers/pokeProvider";
import NormalIcon from "./NormalIcon";

const NormalButton = () => {
    const state = usePokemonDataContext();
    const dispatch = usePokemonDataDispatchContext();

    return (
        <div>
            <p>O</p>
        </div>
    )
}

export default NormalButton;