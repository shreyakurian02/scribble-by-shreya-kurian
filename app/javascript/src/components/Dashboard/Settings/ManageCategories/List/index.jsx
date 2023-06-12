import React, { useState } from "react";

import { Spinner } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";
import { useCategories } from "contexts/categories";

import Item from "./Item";

const List = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [categories, fetchCategories] = useCategories();

  const reorderCategories = async ({ draggableId, position }) => {
    setIsLoading(true);
    try {
      await categoriesApi.reorder({
        payload: { position },
        id: draggableId,
      });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const {
      draggableId,
      destination: { index },
    } = result;
    reorderCategories({ draggableId, position: index });
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {({ droppableProps, innerRef, placeholder }) => (
          <div {...droppableProps} ref={innerRef}>
            {categories.map((category, index) => (
              <Draggable
                draggableId={category.id.toString()}
                index={index}
                key={category.id}
              >
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <div
                    className="w-full"
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                  >
                    <Item
                      categoriesCount={categories.length}
                      category={category}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
