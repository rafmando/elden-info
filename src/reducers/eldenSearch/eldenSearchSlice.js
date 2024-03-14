import { createSlice } from "@reduxjs/toolkit";

const eldenSearch = createSlice({
  name: "eldenSearch",
  initialState: {
    // set searches to true or false
    isAmmoSearch: false,
    isArmorSearch: false,
    isAshOfWarSearch: false,
    isBossSearch: false,
    isClassSearch: false,
    isCreatureSearch: false,
    isIncantationSearch: false,
    // storing a previous result
    previousAmmoResult: {},
    previousArmorResult: {},
    previousAshOfWarResult: {},
    previousBossResult: {},
    previousClassResult: {},
    previousCreatureResult: {},
    previousIncantationResult: {},
  },
  reducers: {
    setPreviousAmmoResults: (state, action) => {
      state.previousAmmoResult = action.payload;
    },
    setPreviousArmorResults: (state, action) => {
      state.previousArmorResult = action.payload;
    },
    setPreviousAshOfWarResults: (state, action) => {
      state.previousAshOfWarResult = action.payload;
    },
    setPreviousBossResults: (state, action) => {
      state.previousBossResult = action.payload;
    },
    setPreviousClassResults: (state, action) => {
      state.previousClassResult = action.payload;
    },
    setPreviousCreatureResults: (state, action) => {
      state.previousCreatureResult = action.payload;
    },
    setPreviousIncantationResults: (state, action) => {
      state.previousIncantationResult = action.payload;
    },

    setIsAmmoSearch: (state, action) => {
      state.isAmmoSearch = action.payload;
    },
    setIsArmorSearch: (state, action) => {
      state.isArmorSearch = action.payload;
    },
    setIsAshOfWarSearch: (state, action) => {
      state.isAshOfWarSearch = action.payload;
    },
    setIsBossSearch: (state, action) => {
      state.isBossSearch = action.payload;
    },
    setIsClassSearch: (state, action) => {
      state.isClassSearch = action.payload;
    },
    setIsCreatureSearch: (state, action) => {
      state.isCreatureSearch = action.payload;
    },
    setIsIncantationSearch: (state, action) => {
      state.isIncantationSearch = action.payload;
    },
  },
});

export const selectPreviousAmmoResults = (state) =>
  state.eldenSearch.previousAmmoResult;

export const selectPreviousArmorResults = (state) =>
  state.eldenSearch.previousArmorResult;

export const selectPreviousAshOfWarResults = (state) =>
  state.eldenSearch.previousAshOfWarResult;

export const selectPreviousBossResults = (state) =>
  state.eldenSearch.previousBossResult;

export const selectPreviousClassResults = (state) =>
  state.eldenSearch.previousClassResult;

export const selectPreviousCreatureResults = (state) =>
  state.eldenSearch.previousCreatureResult;

export const selectPreviousIncantationResults = (state) =>
  state.eldenSearch.previousIncantationResult;

export const selectIsAmmoSearch = (state) => state.eldenSearch.isAmmoSearch;
export const selectIsArmorSearch = (state) => state.eldenSearch.isArmorSearch;
export const selectIsAshOfWarSearch = (state) =>
  state.eldenSearch.isAshOfWarSearch;
export const selectIsBossSearch = (state) => state.eldenSearch.isBossSearch;
export const selectIsClassSearch = (state) => state.eldenSearch.isClassSearch;
export const selectIsCreatureSearch = (state) =>
  state.eldenSearch.isCreatureSearch;
export const selectIsIncantationSearch = (state) =>
  state.eldenSearch.isIncantationSearch;

export const {
  setPreviousAmmoResults,
  setPreviousArmorResults,
  setPreviousAshOfWarResults,
  setPreviousBossResults,
  setPreviousClassResults,
  setPreviousCreatureResults,
  setPreviousIncantationResults,
  setIsAmmoSearch,
  setIsArmorSearch,
  setIsAshOfWarSearch,
  setIsBossSearch,
  setIsClassSearch,
  setIsCreatureSearch,
  setIsIncantationSearch,
} = eldenSearch.actions;
export default eldenSearch.reducer;
