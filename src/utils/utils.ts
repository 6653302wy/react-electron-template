const ImgTypes = ["png", "jpg", "jpeg", "JPG", "JPEG"];

const getNumInStr = (str: string): number[] => {
  return str.match(/\d+/g)?.map(Number) || [];
};

const getFileSuffix = (url: string) => {
  return url.substring(url.lastIndexOf(".") + 1);
};

const isImg = (url: string) => {
  return ImgTypes.includes(getFileSuffix(url));
};

export const utils = { getFileSuffix, getNumInStr, isImg };
