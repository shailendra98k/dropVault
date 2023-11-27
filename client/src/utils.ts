export const isoToLocalDateString = (date: string) => {
  let dateArr = new Date(date).toDateString().split(" "); // the array would look like [ 'Sat', 'Apr', '17', '2021' ]
  dateArr.shift(); // removes the day(Sat) from the array
  return dateArr.join(" ");
};
