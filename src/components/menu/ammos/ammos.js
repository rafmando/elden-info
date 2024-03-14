import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { fetchAmmosApi } from "../../../api/api";
import {
  MenuItem,
  EldenItem,
  FormInputContainer,
  EldenItemsContainer,
  EldenItemStatsAndImg,
  MenuItemHeadingContainer,
  EldenItemTitle,
  EldenItemInfo,
} from "../menu.styles";
import {
  selectPreviousAmmoResults,
  setPreviousAmmoResults,
  selectIsAmmoSearch,
  setIsAmmoSearch,
} from "../../../reducers/eldenSearch/eldenSearchSlice";

export default function Ammos() {
  const [ammos, setAmmos] = useState({});
  const [isNewAmmoSearch, setIsNewAmmoSearch] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSearch = useAppSelector(selectIsAmmoSearch);
  const previousAmmoSearch = useAppSelector(selectPreviousAmmoResults);
  const dispatch = useAppDispatch();

  const toggler = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const fetchAmmos = async (query) => {
    const ammosData = await fetchAmmosApi(query);
    const ammoSearchObj = {
      searchTerm: query,
      ammosData,
    };
    setAmmos(ammoSearchObj);
    dispatch(setPreviousAmmoResults(ammoSearchObj));
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (previousAmmoSearch.searchTerm !== searchTerm) {
      setIsNewAmmoSearch(true);
      fetchAmmos(searchTerm);
    } else {
      setIsNewAmmoSearch(false);
    }
    dispatch(setIsAmmoSearch(true));
  };

  const renderAmmo = (currentAmmos) => {
    return currentAmmos.map((ammo) => {
      const ammoAttackPower = ammo.attackPower;
      return (
        <EldenItem key={ammo.id}>
          <EldenItemTitle>{ammo.name}</EldenItemTitle>
          <EldenItemStatsAndImg>
            <img src={ammo.image} alt="img" />
            <EldenItemInfo>
              {ammoAttackPower.map((atkPower, index) => {
                return (
                  <li key={index}>
                    {atkPower.name}:{atkPower.amount}
                  </li>
                );
              })}
            </EldenItemInfo>
          </EldenItemStatsAndImg>
        </EldenItem>
      );
    });
  };

  const renderAmmos = () => {
    if (isNewAmmoSearch && ammos && ammos.ammosData?.length > 0) {
      return renderAmmo(ammos.ammosData);
    } else if (
      !isNewAmmoSearch &&
      previousAmmoSearch &&
      previousAmmoSearch.ammosData?.length > 0
    ) {
      return renderAmmo(previousAmmoSearch.ammosData);
    }
  };

  return (
    <MenuItem>
      <MenuItemHeadingContainer>
        <h1>Ammos</h1>
        {toggleDropdown ? (
          <FaMinus data-testid="toggle-minus" onClick={() => toggler()} />
        ) : (
          <FaPlus data-testid="toggle-plus" onClick={() => toggler()} />
        )}
      </MenuItemHeadingContainer>
      {toggleDropdown ? (
        <>
          <FormInputContainer
            data-testid="ammo-form"
            onSubmit={(e) => submitSearch(e)}
          >
            <input
              type="search"
              id="search"
              data-testid="ammo-search"
              placeholder="Search for ammo"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormInputContainer>
          <EldenItemsContainer>
            {isSearch ? renderAmmos() : null}
          </EldenItemsContainer>
        </>
      ) : null}
    </MenuItem>
  );
}
