import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { fetchBossesApi } from "../../../api/api";
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
  selectPreviousBossResults,
  selectIsBossSearch,
  setIsBossSearch,
  setPreviousBossResults,
} from "../../../reducers/eldenSearch/eldenSearchSlice";

export default function Bosses() {
  const [bosses, setBosses] = useState({});
  const [isNewBossesSearch, setIsNewBossesSearch] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSearch = useAppSelector(selectIsBossSearch);
  const previousBossesSearch = useAppSelector(selectPreviousBossResults);
  const dispatch = useAppDispatch();

  const toggler = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const fetchBosses = async (query) => {
    const bossesData = await fetchBossesApi(query);
    const bossSearchObj = {
      searchTerm: query,
      bossesData,
    };
    setBosses(bossSearchObj);
    dispatch(setPreviousBossResults(bossSearchObj));
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (previousBossesSearch.searchTerm !== searchTerm) {
      setIsNewBossesSearch(true);
      fetchBosses(searchTerm);
    } else {
      setIsNewBossesSearch(false);
    }
    dispatch(setIsBossSearch(true));
  };

  const renderBoss = (currentBosses) => {
    return currentBosses.map((boss) => {
      return (
        <EldenItem key={boss.id}>
          <EldenItemTitle>{boss.name}</EldenItemTitle>
          <EldenItemStatsAndImg>
            <img src={boss.image} alt="img" />
            <EldenItemInfo>
              <li>Health Points:{boss.healthPoints}</li>
              <li>Location:{boss.location}</li>
            </EldenItemInfo>
          </EldenItemStatsAndImg>
        </EldenItem>
      );
    });
  };

  const renderBosses = () => {
    if (isNewBossesSearch && bosses && bosses.bossesData?.length > 0) {
      return renderBoss(bosses.bossesData);
    } else if (
      !isNewBossesSearch &&
      previousBossesSearch &&
      previousBossesSearch.bossesData?.length > 0
    ) {
      return renderBoss(previousBossesSearch.bossesData);
    }
  };

  return (
    <MenuItem>
      <MenuItemHeadingContainer>
        <h1>Bosses</h1>
        {toggleDropdown ? (
          <FaMinus data-testid="toggle-minus" onClick={() => toggler()} />
        ) : (
          <FaPlus data-testid="toggle-plus" onClick={() => toggler()} />
        )}
      </MenuItemHeadingContainer>
      {toggleDropdown ? (
        <>
          <FormInputContainer
            data-testid="bosses-form"
            onSubmit={(e) => submitSearch(e)}
          >
            <input
              type="search"
              id="search"
              data-testid="bosses-search"
              placeholder="Search for bosses"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormInputContainer>
          <EldenItemsContainer>
            {isSearch ? renderBosses() : null}
          </EldenItemsContainer>
        </>
      ) : null}
    </MenuItem>
  );
}
