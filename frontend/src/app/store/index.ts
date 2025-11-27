import { configureStore } from "@reduxjs/toolkit";
import complexesReducer from '../../widgets/Immovables/ImmMenu/store/store'
import filterReducer from '../../widgets/Immovables/NBC/store/store'
export const store = configureStore({
    reducer: {
        complexes: complexesReducer,
        filterNBC: filterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch