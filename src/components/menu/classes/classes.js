import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { fetchClassesApi } from "../../../api/api";
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
  selectPreviousClassResults,
  selectIsClassSearch,
  setIsClassSearch,
  setPreviousClassResults,
} from "../../../reducers/eldenSearch/eldenSearchSlice";

export default function Classes() {
  const [classes, setClasses] = useState({});
  const [isNewClassesSearch, setIsNewClassesSearch] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSearch = useAppSelector(selectIsClassSearch);
  const previousClassesSearch = useAppSelector(selectPreviousClassResults);
  const dispatch = useAppDispatch();

  const toggler = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const fetchClasses = async (query) => {
    const classesData = await fetchClassesApi(query);
    const classSearchObj = {
      searchTerm: query,
      classesData,
    };
    setClasses(classSearchObj);
    dispatch(setPreviousClassResults(classSearchObj));
  };

  const submitSearch = (e) => {
    e.preventDefault();

    if (previousClassesSearch.searchTerm !== searchTerm) {
      setIsNewClassesSearch(true);
      fetchClasses(searchTerm);
    } else {
      setIsNewClassesSearch(false);
    }
    dispatch(setIsClassSearch(true));
  };

  const renderClass = (currentClasses) => {
    return currentClasses.map((eldenClass) => {
      const stats = eldenClass.stats;
      return (
        <EldenItem key={eldenClass.id}>
          <EldenItemTitle>{eldenClass.name}</EldenItemTitle>
          <EldenItemStatsAndImg>
            <img src={eldenClass.image} alt="img" />
            <EldenItemInfo>
              <li>Arcane:{stats.arcane}</li>
              <li>Dexterity:{stats.dexterity}</li>
              <li>Endurance:{stats.endurance}</li>
              <li>Faith:{stats.faith}</li>
              <li>Intelligence:{stats.intelligence}</li>
              <li>Level:{stats.level}</li>
              <li>Mind:{stats.mind}</li>
              <li>Strength:{stats.strength}</li>
              <li>Vigor:{stats.vigor}</li>
            </EldenItemInfo>
          </EldenItemStatsAndImg>
        </EldenItem>
      );
    });
  };

  const renderClasses = () => {
    if (isNewClassesSearch && classes && classes.classesData?.length > 0) {
      return renderClass(classes.classesData);
    } else if (
      !isNewClassesSearch &&
      previousClassesSearch &&
      previousClassesSearch.classesData?.length > 0
    ) {
      return renderClass(previousClassesSearch.classesData);
    }
  };

  return (
    <MenuItem>
      <MenuItemHeadingContainer>
        <h1>Classes</h1>
        {toggleDropdown ? (
          <FaMinus data-testid="toggle-minus" onClick={() => toggler()} />
        ) : (
          <FaPlus data-testid="toggle-plus" onClick={() => toggler()} />
        )}
      </MenuItemHeadingContainer>
      {toggleDropdown ? (
        <>
          <FormInputContainer
            data-testid="classes-form"
            onSubmit={(e) => submitSearch(e)}
          >
            <input
              type="search"
              id="search"
              data-testid="classes-search"
              placeholder="Search for classes"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormInputContainer>
          <EldenItemsContainer>
            {isSearch ? renderClasses() : null}
          </EldenItemsContainer>
        </>
      ) : null}
    </MenuItem>
  );
}
