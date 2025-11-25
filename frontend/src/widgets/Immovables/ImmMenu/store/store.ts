import { createSlice } from '@reduxjs/toolkit';

// ==========================
// Types
// ==========================
export interface Apartment {
  id: number;
  title: string;
  price: number;
  area: number;
  address: string;
}

export interface ApartmentsState {
  items: Apartment[];
  loading: boolean;
  error: string | null;
}

const initialState: ApartmentsState = {
  items: [],
  loading: false,
  error: null,
};

// ==========================
// Thunks
// ==========================

// URL передаётся как аргумент !!!
export const fetchApartments = (url: string) => async (dispatch: any) => {
  try {
    dispatch(fetchApartmentsStart());
    const res = await fetch(url);
    
    const data = await res.json();
    console.log(data)
    dispatch(fetchApartmentsSuccess(data )); // если API отдаёт {data:[]}
  } catch (e: any) {
    dispatch(fetchApartmentsError(e.message));
  }
};

// Получение по ID — оставляем, но тоже гибко
export const fetchApartmentById = (baseUrl: string, id: number) => async (dispatch: any) => {
  try {
    dispatch(fetchApartmentsStart());
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();
    dispatch(fetchApartmentsSuccess([data]));
  } catch (e: any) {
    dispatch(fetchApartmentsError(e.message));
  }
};

// ==========================
// Slice
// ==========================
export const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    fetchApartmentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchApartmentsSuccess(state, action: PayloadAction<Apartment[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchApartmentsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Добавление квартиры
    addApartment(state, action: PayloadAction<Apartment>) {
      state.items.push(action.payload);
    },
  },
});

export const {
  fetchApartmentsStart,
  fetchApartmentsSuccess,
  fetchApartmentsError,
  addApartment,
} = apartmentsSlice.actions;

export default apartmentsSlice.reducer;
