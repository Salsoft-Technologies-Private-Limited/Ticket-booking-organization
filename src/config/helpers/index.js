import moment from "moment";

export const imageLoader = ({ src, width, quality }) => {
  return `https://thumbs.gfycat.com/DesertedDazzlingBudgie-size_restricted.gif`;
};
const ISSERVER = typeof window === "undefined";

export const deleteUser = () => {
  if (!ISSERVER) {
    localStorage.removeItem("user");
  }
};

export const addToStorage = function (key, data) {
  data = JSON.stringify(data);
  if (!ISSERVER) {
    localStorage.setItem(key, data);
  }
};

export const getFromStorage = function (key) {
  if (!ISSERVER) {
    return JSON.parse(localStorage.getItem(key));
  }
  return "";
};

export const removeFromStorage = function (key) {
  if (!ISSERVER) {
    localStorage.removeItem(key);
  }
};

export const LocalStorageKeys = Object.freeze({
  User: "user",
  Token: "token",
});

export const ImageUrl = (image) => {
  let { PUBLIC_URL } = process.env;
  return `${PUBLIC_URL}/images/${image}`;
};
export const toCamelCase = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Za-z]/, (match) => match.toUpperCase());
};
export const extractDate = (date) => {
  const dateObj = new Date(date);
  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const extractTime = (date) => {
  const dateObj = new Date(date);
  const timeString = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString;
};
export const calculateReviewsAverage = (reviews) => {
    if (!reviews || reviews?.length === 0) {
      return 0;
    }
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRatings / reviews?.length;
    return averageRating;
  };

 export const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

 export const convertTo12HourFormat = (time) => {
    const [hour, minute, second] = time.split(':');
    let hours = parseInt(hour, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert to 12-hour format
    return `${hours}:${minute} ${ampm}`;
  };