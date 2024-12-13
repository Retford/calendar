import { addHours } from 'date-fns';
import { useMemo, useState } from 'react';

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

  return {
    ...formValues,
    formSubmitted,
    setFormSubmitted,
    formValues,
    setFormValues,
    titleClass,
    handleInputChange,
    handleDateChange,
  };
};
