import { t } from "i18next";

export const SINGULAR = { count: 1 };

export const PLURAL = { count: 2 };

export const BASE_URL = "/api/v1";

export const DEFAULT_ERROR_NOTIFICATION = t("common.somethingWentWrong");

export const ARTICLES_URL = "/articles";
export const NEW_ARTICLE_URL = "/articles/create";
export const EDIT_ARTICLE_URL = "/articles/:slug/edit";
export const SETTINGS_URL = "/settings";

export const CATEGORIES_BASE_URL = `${BASE_URL}/categories`;
export const ARTICLES_BASE_URL = `${BASE_URL}/articles`;
export const BULK_ARTICLES_BASE_URL = `${BASE_URL}/bulk/articles`;
