//library imports
import { format } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

//component imports
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { FaCalendarAlt } from 'react-icons/fa';

type DatePickerProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

export default function DatePicker({ date, setDate }: DatePickerProps) {
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
