import React, { useState, useEffect, createContext, useContext } from "react";

import PropTypes from "prop-types";

import categoriesApi from "apis/categories";

const CategoriesStateContext = createContext();
const CategoriesDispatchContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async (categorySearchTerm = "") => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({ search: categorySearchTerm });
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesStateContext.Provider value={categories}>
      <CategoriesDispatchContext.Provider
        value={{ fetchCategories, setCategories }}
      >
        {children}
      </CategoriesDispatchContext.Provider>
    </CategoriesStateContext.Provider>
  );
};

const useCategoriesState = () => {
  const context = useContext(CategoriesStateContext);
  if (context === undefined) {
    throw new Error(
      "useCategoriesState must be used within a CategoriesProvider"
    );
  }

  return context;
};

const useCategoriesDispatch = () => {
  const context = useContext(CategoriesDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCategoriesDispatch must be used within a CategoriesProvider"
    );
  }

  return context;
};

const useCategories = () => [useCategoriesState(), useCategoriesDispatch()];

CategoriesProvider.propTypes = {
  children: PropTypes.node,
};

export {
  CategoriesProvider,
  useCategoriesState,
  useCategoriesDispatch,
  useCategories,
};
