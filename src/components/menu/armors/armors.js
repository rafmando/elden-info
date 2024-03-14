import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { fetchArmorsApi } from "../../../api/api";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
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
  selectPreviousArmorResults,
  selectIsArmorSearch,
  setIsArmorSearch,
  setPreviousArmorResults,
} from "../../../reducers/eldenSearch/eldenSearchSlice";

export default function Armors() {
  const [armors, setArmors] = useState({});
  const [isNewArmorSearch, setIsNewArmorSearch] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSearch = useAppSelector(selectIsArmorSearch);
  const previousArmorSearch = useAppSelector(selectPreviousArmorResults);
  const dispatch = useAppDispatch();

  const toggler = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const fetchArmors = async (query) => {
    const armorsData = await fetchArmorsApi(query);
    const armorsSearchObj = {
      searchTerm: query,
      armorsData,
    };
    setArmors(armorsSearchObj);
    dispatch(setPreviousArmorResults(armorsSearchObj));
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (previousArmorSearch.searchTerm !== searchTerm) {
      setIsNewArmorSearch(true);
      fetchArmors(searchTerm);
    } else {
      setIsNewArmorSearch(false);
    }
    dispatch(setIsArmorSearch(true));
  };

  const renderArmor = (currentArmors) => {
    return currentArmors.map((armor) => {
      const { dmgNegation, resistance } = armor;
      return (
        <EldenItem key={armor.id}>
          <EldenItemTitle>{armor.name}</EldenItemTitle>
          <EldenItemStatsAndImg>
            <img src={armor.image} alt="img" />
            <EldenItemInfo>
              {dmgNegation.map((damageNeg, index) => {
                return (
                  <li key={index}>
                    {damageNeg.name}:{damageNeg.amount}
                  </li>
                );
              })}
            </EldenItemInfo>
            <EldenItemInfo>
              {resistance.map((resist, index) => {
                return (
                  <li key={index}>
                    {resist.name}: {resist.amount}
                  </li>
                );
              })}
            </EldenItemInfo>
          </EldenItemStatsAndImg>
        </EldenItem>
      );
    });
  };

  const renderArmors = () => {
    if (isNewArmorSearch && armors && armors.armorsData?.length > 0) {
      return renderArmor(armors.armorsData);
    } else if (
      !isNewArmorSearch &&
      previousArmorSearch &&
      previousArmorSearch.armorsData?.length > 0
    ) {
      return renderArmor(previousArmorSearch.armorsData);
    }
  };

  return (
    <MenuItem>
      <MenuItemHeadingContainer>
        <h1>Armors</h1>
        {toggleDropdown ? (
          <FaMinus data-testid="toggle-minus" onClick={() => toggler()} />
        ) : (
          <FaPlus data-testid="toggle-plus" onClick={() => toggler()} />
        )}
      </MenuItemHeadingContainer>
      {toggleDropdown ? (
        <>
          <FormInputContainer
            data-testid="armor-form"
            onSubmit={(e) => submitSearch(e)}
          >
            <input
              type="search"
              id="search"
              data-testid="armor-search"
              placeholder="Search for armors"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormInputContainer>
          <EldenItemsContainer>
            {isSearch ? renderArmors() : null}
          </EldenItemsContainer>
        </>
      ) : null}
    </MenuItem>
  );
}
