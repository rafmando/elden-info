import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { fetchAshesOfWarApi } from "../../../api/api";
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
  selectPreviousAshOfWarResults,
  selectIsAshOfWarSearch,
  setIsAshOfWarSearch,
  setPreviousAshOfWarResults,
} from "../../../reducers/eldenSearch/eldenSearchSlice";

export default function AshesOfWar() {
  const [ashes, setAshes] = useState({});
  const [isNewAshesSearch, setIsNewAshesSearch] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSearch = useAppSelector(selectIsAshOfWarSearch);
  const previousAshesSearch = useAppSelector(selectPreviousAshOfWarResults);
  const dispatch = useAppDispatch();

  const toggler = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const fetchAshes = async (query) => {
    const ashesData = await fetchAshesOfWarApi(query);
    const ashSearchObj = {
      searchTerm: query,
      ashesData,
    };
    setAshes(ashSearchObj);
    dispatch(setPreviousAshOfWarResults(ashSearchObj));
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (previousAshesSearch.searchTerm !== searchTerm) {
      setIsNewAshesSearch(true);
      fetchAshes(searchTerm);
    } else {
      setIsNewAshesSearch(false);
    }
    dispatch(setIsAshOfWarSearch(true));
  };

  const renderAsh = (currentAshes) => {
    return currentAshes.map((ash) => {
      return (
        <EldenItem key={ash.id}>
          <EldenItemTitle>{ash.name}</EldenItemTitle>
          <EldenItemStatsAndImg>
            <img src={ash.image} alt="img" />
            <EldenItemInfo>
              <li>Affinity:{ash.affinity}</li>
              <li>Skill:{ash.skill}</li>
            </EldenItemInfo>
          </EldenItemStatsAndImg>
        </EldenItem>
      );
    });
  };

  const renderAshes = () => {
    if (isNewAshesSearch && ashes && ashes.ashesData?.length > 0) {
      return renderAsh(ashes.ashesData);
    } else if (
      !isNewAshesSearch &&
      previousAshesSearch &&
      previousAshesSearch.ashesData?.length > 0
    ) {
      return renderAsh(previousAshesSearch.ashesData);
    }
  };

  return (
    <MenuItem>
      <MenuItemHeadingContainer>
        <h1>Ashes Of War</h1>
        {toggleDropdown ? (
          <FaMinus data-testid="toggle-minus" onClick={() => toggler()} />
        ) : (
          <FaPlus data-testid="toggle-plus" onClick={() => toggler()} />
        )}
      </MenuItemHeadingContainer>
      {toggleDropdown ? (
        <>
          <FormInputContainer
            data-testid="ashes-form"
            onSubmit={(e) => submitSearch(e)}
          >
            <input
              type="search"
              id="search"
              data-testid="ashes-search"
              placeholder="Search for ashes of war"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormInputContainer>
          <EldenItemsContainer>
            {isSearch ? renderAshes() : null}
          </EldenItemsContainer>
        </>
      ) : null}
    </MenuItem>
  );
}
