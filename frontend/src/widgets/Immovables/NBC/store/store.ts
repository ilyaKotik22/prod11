// src/store/filters/filtersSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface FiltersState {
  buyType?: string;
  bedrooms?: string;
  minPrice?: number;
  maxPrice?: number;
}

const initialState: FiltersState = {
  buyType: undefined,
  bedrooms: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setBuyType(state, action: PayloadAction<string | undefined>) {
      state.buyType = action.payload;
    },
    setBedrooms(state, action: PayloadAction<string | undefined>) {
      state.bedrooms = action.payload;
    },
    setPriceRange(state, action: PayloadAction<{ min?: number; max?: number }>) {
      if (action.payload.min !== undefined) state.minPrice = action.payload.min;
      if (action.payload.max !== undefined) state.maxPrice = action.payload.max;
    },
    resetFilters() {
      return initialState;
    },
    clearFilter(state, action: PayloadAction<keyof FiltersState>) {
      state[action.payload] = undefined;
    },
  },
});

export const { setBuyType, setBedrooms, setPriceRange, resetFilters, clearFilter } =
  filtersSlice.actions;

export default filtersSlice.reducer;