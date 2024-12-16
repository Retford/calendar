import { useDispatch, useSelector } from 'react-redux';
import {
  handleAddNewEvent,
  handleDeleteEvent,
  handleLoadEvents,
  handleSetActiveEvent,
  handleUpdateEvent,
} from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(handleSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: Llegar al backend
    // TODO: Update event

    try {
      if (calendarEvent.id) {
        // Updating
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(handleUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      // Creating
      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch(
        handleAddNewEvent({ ...calendarEvent, id: data.event.id, user })
      );
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvent = async () => {
    try {
      const { data } = await calendarApi.get('/events');

      const events = convertEventsToDateEvents(data.events);
      dispatch(handleLoadEvents(events));
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  };

  const startDeletingEvent = () => {
    dispatch(handleDeleteEvent());
  };

  return {
    // Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startLoadingEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
