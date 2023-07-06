import React from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  useFetchCategories,
  useUpdateCategory,
} from "hooks/reactQuery/useCategoriesApi";

import Item from "./Item";

const List = () => {
  const { data: categories = [] } = useFetchCategories();
  const { mutate: updateCategory } = useUpdateCategory();

  const reorderCategories = ({ draggableId, position }) =>
    updateCategory({ id: draggableId, payload: { position }, quiet: true });

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const {
      draggableId,
      source: { index: sourceIndex },
      destination: { index: destinationIndex },
    } = result;

    const reorderedCategories = [...categories];
    const [removed] = reorderedCategories.splice(sourceIndex, 1);
    reorderedCategories.splice(destinationIndex, 0, removed);
    reorderCategories({ draggableId, position: destinationIndex + 1 });
  };

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
