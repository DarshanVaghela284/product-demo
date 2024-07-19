import dayjs from "dayjs";
import { useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useOutsideClick from "../../hooks/useOutsideClick";

const MultiDatePicker = ({
  setSelectedDateRange,
  selectedDateRange,
}: {
  setSelectedDateRange: React.Dispatch<
    React.SetStateAction<{ startDate: Date; endDate: Date }>
  >;
  selectedDateRange: {
    startDate: Date;
    endDate: Date;
  };
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const handleSelect = (ranges: any) => {
    setSelectedDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  useOutsideClick(datePickerRef, () => {
    if (openDatePicker) {
      setOpenDatePicker(false);
    }
  });

  return (
    <>
      <div
        className="datepicker-container h-fit"
        onClick={() => setOpenDatePicker(!openDatePicker)}
      >
        <div className="container-bg-gray">Date Range:</div>
        <div className="flex gap-4">
          <div className="selected-date-text">
            {selectedDateRange.startDate &&
              dayjs(selectedDateRange.startDate).format("D/M/YY")}
          </div>
          <div>to</div>
          <div className="selected-date-text">
            {selectedDateRange.endDate &&
              dayjs(selectedDateRange.endDate).format("D/M/YY")}
          </div>
        </div>
      </div>
      {openDatePicker && (
        <div className="multi-datepicker-wrapper shadow-xl" ref={datePickerRef}>
          <DateRangePicker
            ranges={[{ ...selectedDateRange, key: "selection" }]}
            onChange={handleSelect}
          />
        </div>
      )}
    </>
  );
};

export default MultiDatePicker;
