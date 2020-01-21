import BigNumber from "bignumber.js";

const MIN_ACTION_TIME = 150;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const refreshActionDelay = async (action: Function) => {
  const currentTime = new Date().getTime();

  await action();
  const actionTime = new Date().getTime() - currentTime;

  // Set a minimum so the ui doesn't look glitchy
  await sleep(actionTime > MIN_ACTION_TIME ? 0 : MIN_ACTION_TIME - actionTime);
};

export const rawToRai = (raw: string | number) => {
  const value = new BigNumber(raw.toString());
  return value.shiftedBy(30 * -1).toNumber();
};

export const secondsToTime = (value: string | number) => {
  const bigSeconds = new BigNumber(value.toString());

  const bigBinutes = bigSeconds.dividedBy(60);
  const minutes = (Math.floor(bigBinutes.toNumber()) % 60)
    .toString()
    .padStart(2, "0");
  const bigHours = bigBinutes.dividedBy(60);
  const hours = (Math.floor(bigHours.toNumber()) % 24)
    .toString()
    .padStart(2, "0");
  const bigDays = bigHours.dividedBy(24);
  const days = Math.floor(bigDays.toNumber()) % 30;
  const bigMonths = bigDays.dividedBy(30);
  const months = Math.floor(bigMonths.toNumber());

  return `${months ? `${months}M ` : ""}${
    days ? `${days}d ` : ""
  }${hours}h ${minutes}m`;
};