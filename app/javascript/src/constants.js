import { t } from "i18next";

export const SINGULAR = { count: 1 };

export const PLURAL = { count: 2 };

export const BASE_URL = "/api/v1";

export const DEFAULT_ERROR_NOTIFICATION = t("common.somethingWentWrong");

export const ARTICLES_URL = "/admin/articles";
export const NEW_ARTICLE_URL = "/admin/articles/create";
export const EDIT_ARTICLE_URL = "/admin/articles/:slug/edit";
export const SETTINGS_URL = "/admin/settings";

export const CATEGORIES_BASE_URL = `${BASE_URL}/categories`;
export const ARTICLES_BASE_URL = `${BASE_URL}/articles`;
export const BULK_ARTICLES_BASE_URL = `${BASE_URL}/bulk/articles`;
export const SITE_BASE_URL = `${BASE_URL}/site`;
export const REDIRECTIONS_BASE_URL = `${BASE_URL}/redirections`;
