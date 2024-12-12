import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const useCalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (event, changing) => {
    setFormValues({ ...formValues, [changing]: event });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log(formValues);
  };

  return {
    ...formValues,
    formValues,
    setFormValues,
    titleClass,
    handleInputChange,
    handleDateChange,
    handleSubmit,
  };
};
