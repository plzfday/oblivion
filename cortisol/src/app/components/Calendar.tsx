'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Box } from '@mui/material';

// function getRandomNumber(min: number, max: number) {
//     return Math.round(Math.random() * (max - min) + min);
// }

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{
    daysToHighlightGreen: number[];
    daysToHighlightPurple: number[];
  }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      // const daysToHighlightGreen = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
      // const daysToHighlightPurple = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
      const daysToHighlightGreen = [2, 7, 23];
      const daysToHighlightPurple = [2, 13, 19];

      resolve({ daysToHighlightGreen, daysToHighlightPurple });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs('2024-03-10');

// function GreenDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
//     const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

//     const isSelected =
//         !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

//     return (
//         <Badge
//             key={props.day.toString()}
//             overlap="circular"
//             badgeContent={isSelected ? '🟢' : undefined}
//             anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'right'
//             }}
//             sx={{
//                 '& .MuiBadge-badge': {
//                     fontSize: '0.2rem',
//                     right: '50%'
//                 }
//             }}
//         >
//         <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
//         </Badge>
//     );
// }

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDaysGreen, setHighlightedDaysGreen] = React.useState([
    1, 2, 15,
  ]);
  const [highlightedDaysPurple, setHighlightedDaysPurple] = React.useState([
    2, 7, 23,
  ]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlightGreen, daysToHighlightPurple }) => {
        setHighlightedDaysGreen(daysToHighlightGreen);
        setHighlightedDaysPurple(daysToHighlightPurple);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDaysGreen([]);
    setHighlightedDaysPurple([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (
            props: PickersDayProps<Dayjs> & {
              highlightedDaysGreen?: number[];
              highlightedDaysPurple?: number[];
            }
          ) => {
            const {
              highlightedDaysGreen = [],
              highlightedDaysPurple = [],
              outsideCurrentMonth,
              day,
              ...other
            } = props;
            const isGreenSelected =
              highlightedDaysGreen.includes(props.day.date()) &&
              !props.outsideCurrentMonth;
            const isPurpleSelected =
              highlightedDaysPurple.includes(props.day.date()) &&
              !props.outsideCurrentMonth;

            return (
              <Box>
                {(isGreenSelected || isPurpleSelected) && (
                  <Badge
                    key={props.day.toString()}
                    overlap='circular'
                    badgeContent={
                      <Box display='flex' flexDirection='row'>
                        {isGreenSelected && <Box>{'🟢'}</Box>}
                        {isGreenSelected && isPurpleSelected && <Box> </Box>}
                        {isPurpleSelected && <Box>{'🟣'}</Box>}
                      </Box>
                    }
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.2rem',
                        right: '50%',
                      },
                    }}
                  >
                    <PickersDay
                      {...other}
                      outsideCurrentMonth={outsideCurrentMonth}
                      day={day}
                    />
                  </Badge>
                )}
                {!isGreenSelected && !isPurpleSelected && (
                  <PickersDay
                    {...other}
                    outsideCurrentMonth={outsideCurrentMonth}
                    day={day}
                  />
                )}
              </Box>
            );
          },
        }}
        slotProps={{
          day: {
            highlightedDaysGreen,
            highlightedDaysPurple,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}
