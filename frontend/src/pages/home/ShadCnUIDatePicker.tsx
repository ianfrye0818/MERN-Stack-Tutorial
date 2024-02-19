import { format } from 'date-fns';

import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { CalendarIcon } from '@mui/x-date-pickers';
import { Dispatch, SetStateAction } from 'react';

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
          <CalendarIcon className='mr-2 h-4 w-4' />
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
          onSelect={(date: Date | undefined) => setDate(date as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
