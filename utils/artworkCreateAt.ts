export const artworkCreateAt = (date: Date | string): string => {
  const dateNow = new Date();
  const dateCreate = new Date(date);
  const test =new Date(dateNow.getTime() - dateCreate.getTime());
  const month = test.getMonth() + 1;

  if (month <= 0) {
    const day = test.getDate();
    if (day <= 0) {
      return 'Posted today';
    }
    return (day === 1)
      ? 'Posted yesterday'
      :`Posted ${day} days ago`;
  }
  if (month > 12) {
    const year = dateNow.getFullYear() - dateCreate.getFullYear();
    return (year === 1)
      ? `Posted ${year} year ago`
      : `Posted ${year} years ago`
  }
  return (month === 1)
    ?'Posted last month'
    :`Posted ${month} months ago`;
};