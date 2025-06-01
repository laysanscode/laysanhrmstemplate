'use client';

import { useEffect, useState } from 'react';
import { PeriodPicker } from '@/components/period-picker';
import { cn } from '@/lib/utils';
import { getWeeksProfitData } from '@/services/charts.services';
import { WeeksProfitChart } from './chart';

export function WeeksProfit({ className, timeFrame: initialTimeFrame }) {
  const [data, setData] = useState([]);
  const [timeFrame, setTimeFrame] = useState(initialTimeFrame || 'this week');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getWeeksProfitData(timeFrame);
      setData(result);
    };

    fetchData();
  }, [timeFrame]);

  const handleTimeFrameChange = (value) => {
    setTimeFrame(value);
  };

  return (
    <div
      className={cn(
        'rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Profit {timeFrame}
        </h2>

        <PeriodPicker
          items={['this week', 'last week']}
          defaultValue={timeFrame}
          sectionKey="weeks_profit"
          onChange={handleTimeFrameChange}
        />
      </div>

      <WeeksProfitChart data={data} />
    </div>
  );
}
