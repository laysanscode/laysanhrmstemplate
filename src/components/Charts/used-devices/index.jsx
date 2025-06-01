'use client';

import { useEffect, useState } from 'react';
import { PeriodPicker } from '@/components/period-picker';
import { cn } from '@/lib/utils';
import { getDevicesUsedData } from '@/services/charts.services';
import { DonutChart } from './chart';

export function UsedDevices({ timeFrame: initialTimeFrame = 'monthly', className }) {
  const [timeFrame, setTimeFrame] = useState(initialTimeFrame);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDevicesUsedData(timeFrame);
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
        'grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Used Devices
        </h2>

        <PeriodPicker
          defaultValue={timeFrame}
          sectionKey="used_devices"
          items={['daily', 'weekly', 'monthly']}
          onChange={handleTimeFrameChange}
        />
      </div>

      <div className="grid place-items-center">
        <DonutChart data={data} />
      </div>
    </div>
  );
}
