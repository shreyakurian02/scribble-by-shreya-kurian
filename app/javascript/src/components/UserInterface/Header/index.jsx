import React, { useState, useEffect, useRef } from "react";

import { Search } from "neetoicons";
import { Typography, Input } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/public/articles";
import useDebounce from "hooks/useDebounce";

import FilteredArticles from "./FilteredArticles";

const Header = ({ siteTitle }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const inputRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm);

  const handleKeyDown = event => {
    if (event.key === "/") {
      event.preventDefault();
      inputRef.current.focus();
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({ search: searchTerm });
      setFilteredArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    !isEmpty(debouncedSearchTerm) ? fetchArticles() : setFilteredArticles([]);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="border-b sticky z-10 flex h-16 w-full items-center justify-center px-6 py-4">
      <div className="absolute right-0 top-0 w-1/4 px-2 py-4">
        <Input
          placeholder={t("placeholder.euiSearchArticles")}
          prefix={<Search />}
          ref={inputRef}
          type="search"
          value={searchTerm}
          onChange={({ target: { value } }) => setSearchTerm(value)}
        />
        <FilteredArticles
          debouncedSearchTerm={debouncedSearchTerm}
          filteredArticles={filteredArticles}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <Typography className="neeto-ui-text-gray-800" style="h4">
        {siteTitle}
      </Typography>
    </div>
  );
};

export default Header;
