import { format } from 'date-fns';

import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Dispatch, SetStateAction } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

interface ShadCnUIDatepickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export function ShadCnUIDatepicker({ date, setDate }: ShadCnUIDatepickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <FaCalendarAlt className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0'
        align='start'
      >
        <Calendar
          mode='single'
          selected={date}
          toDate={new Date()}
          onSelect={(date: Date | undefined) => setDate(date as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
