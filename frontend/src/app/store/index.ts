import { configureStore } from "@reduxjs/toolkit";
import complexesReducer from '../../widgets/Immovables/ImmMenu/store/store'

export const store = configureStore({
    reducer: {
        complexes: complexesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch