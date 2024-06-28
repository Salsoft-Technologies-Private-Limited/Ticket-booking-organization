export const ImageUrl = (image) => {
    let { PUBLIC_URL } = process.env;
    return `${PUBLIC_URL}/images1/${image}`;
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