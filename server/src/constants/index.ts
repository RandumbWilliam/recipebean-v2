import config from "@config";

export const PROD = config.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:";

export const RECIPE_BANNERS_FOLDER = "recipe-cover-images";
