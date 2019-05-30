import React from "react";
import {
  List,
  TextInput,
  SaveButton,
  EditButton,
  ShowButton
} from "react-admin";
import {
  Tree,
  NodeForm,
  NodeActions,
  DragPreview,
  IgnoreFormProps
} from "ra-tree-ui-materialui";

const CategoryDragPreview = props => (
  <DragPreview {...props}>{({ node }) => node.record.name}</DragPreview>
);

const CategoryActions = props => (
  <NodeActions {...props}>
    <SaveButton variant="flat" />
    <IgnoreFormProps>
      <EditButton />
      <ShowButton />
    </IgnoreFormProps>
  </NodeActions>
);

const CategoryList = props => (
  <List {...props} perPage={10000}>
    <Tree
      parentSource="parentCategoryId"
      enableDragAndDrop
      dragPreviewComponent={CategoryDragPreview}
      allowDropOnRoot
      undoableDragDrop={false}
    >
      <NodeForm undoable={false} actions={<CategoryActions />}>
        <TextInput source="name" />
      </NodeForm>
    </Tree>
  </List>
);

export default CategoryList;

// import React from "react";
// import {
//   List,
//   TextInput,
//   SaveButton,
//   EditButton,
//   ShowButton
// } from "react-admin";
// import {
//   IgnoreFormProps,
//   Tree,
//   NodeForm,
//   NodeActions,
//   DragPreview
// } from "ra-tree-ui-materialui";

// const CategoryDragPreview = props => (
//   <DragPreview {...props}>{({ node }) => node.record.name}</DragPreview>
// );

// const CategoryActions = props => (
//   <NodeActions {...props}>
//     <SaveButton variant="flat" />
//     <IgnoreFormProps>
//       <EditButton />
//       <ShowButton />
//     </IgnoreFormProps>
//   </NodeActions>
// );

// export const CategoryList = props => (
//   <List {...props} perPage={10000}>
//     <Tree
//       parentSource="parentCategoryId"
//       enableDragAndDrop
//       dragPreviewComponent={CategoryDragPreview}
//     >
//       <NodeForm undoable={false} actions={<CategoryActions />}>
//         <TextInput source="name" />
//       </NodeForm>
//     </Tree>
//   </List>
// );
