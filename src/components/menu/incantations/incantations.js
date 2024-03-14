import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { fetchIncantationsApi } from "../../../api/api";
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
  selectIsIncantationSearch,
  selectPreviousIncantationResults,
  setPreviousIncantationResults,
  setIsIncantationSearch,
} from "../../../reducers/eldenSearch/eldenSearchSlice";

export default function Incantations() {
  const [incantations, setIncantations] = useState({});
  const [isNewIncantationsSearch, setIsNewIncantationsSearch] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSearch = useAppSelector(selectIsIncantationSearch);
  const previousIncantationsSearch = useAppSelector(
    selectPreviousIncantationResults
  );
  const dispatch = useAppDispatch();

  const toggler = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const fetchIncantations = async (query) => {
    const incantationsData = await fetchIncantationsApi(query);
    const incantationsSearchObj = {
      searchTerm: query,
      incantationsData,
    };
    setIncantations(incantationsSearchObj);
    dispatch(setPreviousIncantationResults(incantationsSearchObj));
  };

  const submitSearch = (e) => {
    e.preventDefault();

    if (previousIncantationsSearch.searchTerm !== searchTerm) {
      setIsNewIncantationsSearch(true);
      fetchIncantations(searchTerm);
    } else {
      setIsNewIncantationsSearch(false);
    }
    dispatch(setIsIncantationSearch(true));
  };

  const renderIncantation = (currentIncantations) => {
    return currentIncantations.map((incantation) => {
      return (
        <EldenItem key={incantation.id}>
          <EldenItemTitle>{incantation.name}</EldenItemTitle>
          <EldenItemStatsAndImg>
            <img src={incantation.image} alt="img" />
            <EldenItemInfo>
              <li>Description:{incantation.description}</li>
              <li>Effects:{incantation.effects}</li>
            </EldenItemInfo>
          </EldenItemStatsAndImg>
        </EldenItem>
      );
    });
  };

  const renderIncantations = () => {
    if (
      isNewIncantationsSearch &&
      incantations &&
      incantations.incantationsData?.length > 0
    ) {
      return renderIncantation(incantations.incantationsData);
    } else if (
      !isNewIncantationsSearch &&
      previousIncantationsSearch &&
      previousIncantationsSearch.incantationsData?.length > 0
    ) {
      return renderIncantation(previousIncantationsSearch.incantationsData);
    }
  };

  return (
    <MenuItem>
      <MenuItemHeadingContainer>
        <h1>Incantations</h1>
        {toggleDropdown ? (
          <FaMinus data-testid="toggle-minus" onClick={() => toggler()} />
        ) : (
          <FaPlus data-testid="toggle-plus" onClick={() => toggler()} />
        )}
      </MenuItemHeadingContainer>
      {toggleDropdown ? (
        <>
          <FormInputContainer
            data-testid="incantations-form"
            onSubmit={(e) => submitSearch(e)}
          >
            <input
              type="search"
              id="search"
              data-testid="incantations-search"
              placeholder="Search for incantations"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormInputContainer>
          <EldenItemsContainer>
            {isSearch ? renderIncantations() : null}
          </EldenItemsContainer>
        </>
      ) : null}
    </MenuItem>
  );
}
