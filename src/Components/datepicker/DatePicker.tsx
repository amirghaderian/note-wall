import React, { useEffect, useState } from 'react';
import './Datepicker.css';

interface DatepickerProps {
  id: string;
  title?: string;
  defaultValue?: string; 
  dir?: string;
  classList?: string;
  disabled?: boolean;
  required?: boolean;
  novalidate?: string;
  onChange?: (date: string) => void; 
  placeholder?: string; 
}

const Datepicker: React.FC<DatepickerProps> = (props) => {
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: ''
  });

  const [isOpen, setIsOpen] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    if (props.defaultValue) {
      const [year, month, day] = props.defaultValue.split('-');
      setDate({
        year: year,
        month: month.padStart(2, '0'),
        day: day.padStart(2, '0')
      });
    } else {
      setDate({
        year: '',
        month: '',
        day: ''
      });
    }
  }, [props.defaultValue]);

  useEffect(() => {
    if (date.year && date.month) {
      const numOfDays = new Date(Number(date.year), Number(date.month), 0).getDate();
      const daysArray = Array.from({ length: numOfDays }, (_, i) => i + 1);
      setDaysInMonth(daysArray);
      
      if (Number(date.day) > numOfDays) {
        setDate(prev => ({ ...prev, day: numOfDays.toString().padStart(2, '0') }));
      }
    }
  }, [date.year, date.month]);

  const handleSelect = (field: keyof typeof date, value: string) => {
    setDate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleDatepicker = () => {
    if (!props.disabled) {
      setIsOpen(prev => !prev);
    }
  };

  const handleDayClick = (day: number) => {
    setDate(prev => ({
      ...prev,
      day: day.toString().padStart(2, '0')
    }));
    if (props.onChange) {
      props.onChange(`${date.year}-${date.month}-${day.toString().padStart(2, '0')}`);
    }
    setIsOpen(false);
  };

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const displayedDate = date.year && date.month && date.day ? `${date.year}/${date.month}/${date.day}` : props.placeholder || "";

  return (
    <div className="datepicker-container" style={{ position: 'relative', display: 'inline-block' }}>
      <div
        id={props.id}
        className={`datepicker-header ${props.disabled ? 'opacity-50' : 'opacity-100'} ${props.classList}`}
        onClick={toggleDatepicker}
      >
        <label id={`${props.id}_label_datepicker`} htmlFor={`${props.id}_datepicker`}>
          {props.title}
          <span style={{ visibility: props.required ? 'visible' : 'hidden' }} id={`${props.id}_required`}>
            *
          </span>
        </label>
        <p id={`${props.id}_datepicker`} className="datepicker-input" aria-disabled={props.disabled}>
          {displayedDate}
        </p>
        <i className="icon-alert-circle"></i>
        <span>{props.novalidate}</span>
      </div>

      {isOpen && (
        <div
          id={`${props.id}_datepicker_flash_collapse`}
          className="datepicker-dropdown"
          style={{
            width: '100%',
            background: '#ffffff',
            position: 'absolute',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
            top: '40px',
            left: '0px',
            zIndex: 10,
          }}
        >
          <div className="datepicker-body">
            <div className="datepicker-select-container">
              <label htmlFor={`${props.id}-year-select`} className="datepicker-select-label">Year</label>
              <select
                id={`${props.id}-year-select`}
                value={date.year}
                onChange={(e) => handleSelect('year', e.target.value)}
                className="datepicker-select"
              >
                <option value="">Select Year</option> {/* گزینه خالی برای انتخاب سال */}
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="datepicker-select-container">
              <label htmlFor={`${props.id}-month-select`} className="datepicker-select-label">Month</label>
              <select
                id={`${props.id}-month-select`}
                value={date.month}
                onChange={(e) => handleSelect('month', e.target.value)}
                className="datepicker-select"
              >
                <option value="">Select Month</option> {/* گزینه خالی برای انتخاب ماه */}
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="datepicker-days-container">
              {daysInMonth.map(day => (
                <span
                  key={day}
                  className={`datepicker-day ${date.day === day.toString().padStart(2, '0') ? 'selected' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day.toString().padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
