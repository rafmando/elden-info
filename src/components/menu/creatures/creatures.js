import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { fetchCreaturesApi } from "../../../api/api";
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
  selectPreviousCreatureResults,
  selectIsCreatureSearch,
  setIsCreatureSearch,
  setPreviousCreatureResults,
} from "../../../reducers/eldenSearch/eldenSearchSlice";

export default function Creatures() {
  const [creatures, setCreatures] = useState({});
  const [isNewCreaturesSearch, setIsNewCreaturesSearch] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSearch = useAppSelector(selectIsCreatureSearch);
  const previousCreaturesSearch = useAppSelector(selectPreviousCreatureResults);
  const dispatch = useAppDispatch();

  const toggler = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const fetchCreatures = async (query) => {
    const creaturesData = await fetchCreaturesApi(query);
    const creaturesSearchObj = {
      searchTerm: query,
      creaturesData,
    };
    setCreatures(creaturesSearchObj);
    dispatch(setPreviousCreatureResults(creaturesSearchObj));
  };

  const submitSearch = (e) => {
    e.preventDefault();

    if (previousCreaturesSearch.searchTerm !== searchTerm) {
      setIsNewCreaturesSearch(true);
      fetchCreatures(searchTerm);
    } else {
      setIsNewCreaturesSearch(false);
    }
    dispatch(setIsCreatureSearch(true));
  };

  const renderCreature = (currentCreatures) => {
    return currentCreatures.map((creature) => {
      return (
        <EldenItem key={creature.id}>
          <EldenItemTitle>{creature.name}</EldenItemTitle>
          <EldenItemStatsAndImg>
            <img src={creature.image} alt="img" />
            <EldenItemInfo>
              <li>Description:{creature.description}</li>
            </EldenItemInfo>
          </EldenItemStatsAndImg>
        </EldenItem>
      );
    });
  };

  const renderCreatures = () => {
    if (
      isNewCreaturesSearch &&
      creatures &&
      creatures.creaturesData?.length > 0
    ) {
      return renderCreature(creatures.creaturesData);
    } else if (
      !isNewCreaturesSearch &&
      previousCreaturesSearch &&
      previousCreaturesSearch.creaturesData?.length > 0
    ) {
      return renderCreature(previousCreaturesSearch.creaturesData);
    }
  };

  return (
    <MenuItem>
      <MenuItemHeadingContainer>
        <h1>Creatures</h1>
        {toggleDropdown ? (
          <FaMinus data-testid="toggle-minus" onClick={() => toggler()} />
        ) : (
          <FaPlus data-testid="toggle-plus" onClick={() => toggler()} />
        )}
      </MenuItemHeadingContainer>
      {toggleDropdown ? (
        <>
          <FormInputContainer
            data-testid="creatures-form"
            onSubmit={(e) => submitSearch(e)}
          >
            <input
              type="search"
              id="search"
              data-testid="creatures-search"
              placeholder="Search for creatures"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormInputContainer>
          <EldenItemsContainer>
            {isSearch ? renderCreatures() : null}
          </EldenItemsContainer>
        </>
      ) : null}
    </MenuItem>
  );
}
