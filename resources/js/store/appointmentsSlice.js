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
    reducers: {
        addAppointment: (state, action) => {
            state.items.unshift(action.payload);
        },
        removeAppointment: (state, action) => {
            state.items = state.items.filter(item => String(item.id) !== String(action.payload));
        },
    },
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

export const { addAppointment, removeAppointment } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
