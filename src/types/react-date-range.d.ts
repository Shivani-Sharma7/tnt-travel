declare module 'react-date-range' {
  import { ComponentType } from 'react';

  export interface DateRangeProps {
    ranges?: Array<{
      startDate?: Date;
      endDate?: Date;
      key?: string;
    }>;
    onChange?: (item: any) => void;
    onRangeFocusChange?: (focusedRange: [number, number]) => void;
    focusedRange?: [number, number];
    initialFocusedRange?: [number, number];
    rangeColors?: string[];
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
    disabledDay?: (date: Date) => boolean;
    dayDisplayFormat?: string;
    monthDisplayFormat?: string;
    weekdayDisplayFormat?: string;
    dayPlaceholder?: string;
    monthPlaceholder?: string;
    yearPlaceholder?: string;
    showSelectionPreview?: boolean;
    showMonthArrow?: boolean;
    showMonthAndYearPickers?: boolean;
    showDateDisplay?: boolean;
    showPreview?: boolean;
    editableDateInputs?: boolean;
    dragSelectionEnabled?: boolean;
    moveRangeOnFirstSelection?: boolean;
    scroll?: {
      enabled?: boolean;
      calendarHeight?: number;
    };
    direction?: 'horizontal' | 'vertical';
    months?: number;
    className?: string;
    style?: React.CSSProperties;
  }

  export const DateRange: ComponentType<DateRangeProps>;
} 