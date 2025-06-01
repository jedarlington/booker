import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from './store/appointmentsSlice';

export default function LoadAppointments({ children }) {
    const dispatch = useDispatch();
    const loaded = useSelector(state => state.appointments.items.length > 0);

    useEffect(() => {
        if (!loaded) {
            dispatch(fetchAppointments());
        }
    }, [loaded, dispatch]);

    return children;
}
