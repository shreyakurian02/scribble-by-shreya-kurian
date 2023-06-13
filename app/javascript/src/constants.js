import { t } from "i18next";

export const SINGULAR = { count: 1 };

export const PLURAL = { count: 2 };

export const BASE_URL = "/api/v1";
export const PUBLIC_BASE_URL = `${BASE_URL}/public`;

export const DEFAULT_ERROR_NOTIFICATION = t("common.somethingWentWrong");

export const ARTICLES_URL = "/articles";
export const NEW_ARTICLE_URL = "/articles/create";
export const EDIT_ARTICLE_URL = "/articles/:slug/edit";
export const SETTINGS_URL = "/settings";
export const PREVIEW_URL = "/public";

export const CATEGORIES_BASE_URL = `${BASE_URL}/categories`;
export const ARTICLES_BASE_URL = `${BASE_URL}/articles`;
export const BULK_ARTICLES_BASE_URL = `${BASE_URL}/bulk/articles`;
export const SITE_BASE_URL = `${BASE_URL}/site`;
export const REDIRECTIONS_BASE_URL = `${BASE_URL}/redirections`;
export const PUBLIC_CATEGORIES_BASE_URL = `${PUBLIC_BASE_URL}/categories`;
export const PUBLIC_ARTICLES_BASE_URL = `${PUBLIC_BASE_URL}/articles`;
