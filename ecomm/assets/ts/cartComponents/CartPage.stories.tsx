// YourComponent.stories.js

import React from "react";
import { CartPage } from "./CartPage";
import { CheckOutButton } from "./CheckOutButton";
import { DeleteButton } from "./DeleteButton";
import { UpdateButton } from "./UpdateButton";

const CartPageStoryComponent = ({ children }) => <div>{children}</div>;
// This default export determines where you story goes in the story list
export default {
  title: "CartPage",
  component: CartPageStoryComponent,
};

const FirstStory = (args) => <CartPage {...args} />;

export const CheckoutButtonStory = (args) => (
  <CartPageStoryComponent>
    <CheckOutButton />
  </CartPageStoryComponent>
);

export const DeleteButtonStory = (args) => (
  <CartPageStoryComponent>
    <DeleteButton onClick={(e) => alert("clicked!")} />
  </CartPageStoryComponent>
);

export const UpdateButtonStory = (args) => (
  <CartPageStoryComponent>
    <UpdateButton onClick={(e) => alert("clicked!")} />
  </CartPageStoryComponent>
);
