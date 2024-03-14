import React from "react";
import { MenuContainer } from "./menu.styles";
import Ammos from "./ammos/ammos";
import Armors from "./armors/armors";
import AshesOfWar from "./ashes-of-war/ashes-of-war";
import Bosses from "./bosses/bosses";
import Classes from "./classes/classes";
import Creatures from "./creatures/creatures";
import Incantations from "./incantations/incantations";

export default function Menu() {
  const renderMenuItems = () => {
    return (
      <>
        <Ammos />
        <Armors />
        <AshesOfWar />
        <Bosses />
        <Classes />
        <Creatures />
        <Incantations />
      </>
    );
  };

  return <MenuContainer>{renderMenuItems()}</MenuContainer>;
}
