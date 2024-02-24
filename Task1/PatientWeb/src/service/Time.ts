const Time = (): string => {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are zero-based
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Format the date and time
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export default Time;
