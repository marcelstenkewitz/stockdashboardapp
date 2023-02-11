import { useContext } from "react";
import { FilterContext } from "../Context";
import { chartConfig } from "../constants/config";

export const useDateHelper = () => {
  const { filter } = useContext(FilterContext);

  //Utility functions to format dates for FinnHub API as it only uses Unix timestamps.
  const convertDateToUnixTimeStamp = (date) => {
    return Math.floor(date.getTime() / 1000);
  };

  const convertUnixTimeStampToDate = (unixTimeStamp) => {
    const milliseconds = unixTimeStamp * 1000;
    return new Date(milliseconds).toLocaleDateString();
  };

  //Calculates the start time and end time to provide the fetchHistoricalData API call.
  const getDateRange = () => {
    const { days, weeks, months, years } = chartConfig[filter];

    const endDate = new Date();
    const startDate = createDate(endDate, -days, -weeks, -months, -years);

    const startTimestampUnix = convertDateToUnixTimeStamp(startDate);
    const endTimestampUnix = convertDateToUnixTimeStamp(endDate);

    return { startTimestampUnix, endTimestampUnix };
  };

  const createDate = (date, days, weeks, months, years) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7 * weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  };

  return {
    convertDateToUnixTimeStamp,
    convertUnixTimeStampToDate,
    getDateRange,
    createDate,
  };
};
