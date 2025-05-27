import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAppointments } from './store/appointmentsSlice';

export default function LoadAppointments({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    return children;
}