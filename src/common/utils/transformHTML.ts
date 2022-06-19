import sanitizeHtml from 'sanitize-html';

export const transformHTML = (html: string) => {
  return sanitizeHtml(html, {
    exclusiveFilter: ({ tag, text }) => {
      // Remove empty tags that match the ones in array
      return ['p', 'a', 'span'].includes(tag) && !text.trim();
    },
  });
};

export const convertMS = (milliseconds) => {
  let hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  const day = Math.floor(hour / 24);
  hour = hour % 24;
  return {
    day: day,
    hour: hour,
    minute: minute,
    seconds: seconds,
  };
};

export const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return month + '/' + day + '/' + year;
};
