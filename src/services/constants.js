// const DAYS = 1000 * 60 * 60 * 24;
const HOURS = 1000 * 60 * 60;
const MINUTES = 1000 * 60;
const SECONDS = 1000;
export const errorHandler = (element, error) => {
  const { name, value } = element;
  const condition = {
    name: value.length >= 3 && value.length <= 15,
  };
  if (condition[name]) {
    return {
      ...error,
      [name]: false,
    };
  }
  return {
    ...error,
    [name]: true,
  };
};
export class Time {
  constructor() {
    this.time = 0;
  }

  // getDays() {
  //   const days = Math.floor(this.time / DAYS);
  //   return days >= 1 ? Math.floor(days) : 0;
  // }

  // getHours() {
  //   const hours = Math.floor((this.time % DAYS) / HOURS);
  //   return hours >= 1 ? Math.floor(hours) : 0;
  // }
  // hour version
  getHours() {
    const hours = Math.floor(this.time / HOURS);
    return hours >= 1 ? Math.floor(hours) : 0;
  }

  getMinutes() {
    const minutes = Math.floor((this.time % HOURS) / MINUTES);
    return minutes >= 1 ? Math.floor(minutes) : 0;
  }

  getSeconds() {
    const seconds = Math.floor((this.time % MINUTES) / SECONDS);
    return seconds >= 1 ? Math.floor(seconds) : 0;
  }

  transformToTwoDigits = value => {
    const result = value >= 10 ? value : `0${value}`;
    return result;
  };

  getTime(time) {
    this.time = time;
    // const days = this.transformToTwoDigits(this.getDays());
    // const hours = this.transformToTwoDigits(this.getHours());
    // hour version
    const hours = this.transformToTwoDigits(this.getHours());
    const minutes = this.transformToTwoDigits(this.getMinutes());
    const seconds = this.transformToTwoDigits(this.getSeconds());
    // return `${(days-0)===1?'day':'days'}:${hours}:${minutes}:${seconds}`;
    // hour version
    return `${hours}:${minutes}:${seconds}`;
  }
}
