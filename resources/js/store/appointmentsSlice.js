import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAppointments',
    async () => {
        const response = await fetch('/api/appointments', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch appointments');
        return await response.json();
    }
);

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default appointmentsSlice.reducer;
