import type { CollectionConfig } from "payload/types";

import { checkRole } from "../Users/checkRole";
import { populateUser } from "./hooks/populateUser";

const Comments: CollectionConfig = {
  access: {
    // Public users should only be able to read published comments
    // Users should be able to read their own comments
    // Admins should be able to read all comments
    read: ({ data, req: { user } }) => {
      return Boolean(
        data?.status === "published" ||
          checkRole(["admin"], user) ||
          (typeof data?.user === "string" ? data?.user : data?.user?.id) === user?.id,
      );
    },
    // Public users should not be able to create published comments
    // User should only be allowed to create and their own draft comments
    // Admins should have full control
    create: ({ data, req: { user } }) => {
      return Boolean(
        checkRole(["admin"], user) ||
          (data?.status === "draft" && (typeof data?.user === "string" ? data?.user : data?.user?.id) === user?.id),
      );
    },
    // Public users should not be able to update published comments
    // Users should only be allowed to update their own draft comments
    // Admins should have full control
    update: ({ data, req: { user } }) => {
      return Boolean(
        checkRole(["admin"], user) ||
          (data?.status === "draft" && (typeof data?.user === "string" ? data?.user : data?.user?.id) === user?.id),
      );
    },
    // Only admins can delete comments
    delete: ({ req: { user } }) => checkRole(["admin"], user),
  },

  fields: [
    {
      name: "user",
      hasMany: false,
      relationTo: "users",
      type: "relationship",
    },
    // This field is only used to populate the user data via the `populateUser` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: "populatedUser",
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "name",
          type: "text",
        },
      ],
      type: "group",
    },

    {
      name: "comment",
      type: "textarea",
    },
  ],
  hooks: {
    afterRead: [populateUser],
  },
  slug: "comments",
  versions: {
    drafts: true,
  },
};

export default Comments;
