import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  subMonths,
  addMonths,
} from 'date-fns';

// Holiday data (key = YYYY-MM-DD)
const holidays = {
  '2025-01-01': { name: "New Year's Day", type: 'National Holiday' },
  '2025-08-15': { name: 'Independence Day', type: 'National Holiday' },
  '2025-10-02': { name: 'Gandhi Jayanti', type: 'National Holiday' },
  '2025-12-25': { name: 'Christmas', type: 'Festival' },
  '2026-01-01': { name: "New Year's Day", type: 'National Holiday' },
  '2026-08-15': { name: 'Independence Day', type: 'National Holiday' },
  // Add more years as needed
};

const CalendarBox = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));

  const monthName = format(currentMonth, 'MMMM');
  const year = format(currentMonth, 'yyyy');

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const allDays = eachDayOfInterval({ start, end });

  const firstWeekday = getDay(start); // 0 (Sunday) - 6 (Saturday)
  const paddedDays = [...Array(firstWeekday).fill(null), ...allDays];

  const weeks = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-md dark:bg-gray-dark">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={handlePrevMonth} className="text-sm font-medium text-primary hover:underline">
          ← Prev
        </button>
        <h2 className="text-lg font-semibold text-dark dark:text-white">
          {monthName} {year}
        </h2>
        <button onClick={handleNextMonth} className="text-sm font-medium text-primary hover:underline">
          Next →
        </button>
      </div>

      <table className="w-full table-fixed">
        <thead>
          <tr className="grid grid-cols-7 bg-primary text-white">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <th key={i} className="py-2 text-sm font-medium text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i} className="grid grid-cols-7">
              {week.map((day, j) => {
                const iso = day ? format(day, 'yyyy-MM-dd') : null;
                const holiday = iso && holidays[iso];
                return (
                  <td
                    key={j}
                    className="relative h-20 border p-2 text-center hover:bg-gray-100 dark:hover:bg-dark-2"
                  >
                    {day && (
                      <>
                        <div className="font-semibold text-dark dark:text-white">
                          {format(day, 'd')}
                        </div>
                        {holiday && (
                          <div className="mt-1 text-xs text-primary">
                            {holiday.name}
                            <div className="text-[10px] text-gray-500">{holiday.type}</div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarBox;
