import React from "react";
import {
  render as rtlRender,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import Armors from "../armors";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import userEvent from "@testing-library/user-event";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("The Armors Component", () => {
  it("renders the correct armor when given a search query", async () => {
    render(<Armors />);
    expect(screen.getByText("Armors")).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId("toggle-plus"));
    });

    const searchArmor = screen.getByTestId("armor-search");
    expect(searchArmor).toBeInTheDocument();

    act(() => {
      userEvent.type(searchArmor, "Black Knife");
    });

    const armorForm = screen.getByTestId("armor-form");
    act(() => {
      fireEvent.submit(armorForm);
    });

    expect(await screen.findByText("Black Knife Armor")).toBeInTheDocument();
    expect(
      await screen.findByText("Black Knife Armor (altered)")
    ).toBeInTheDocument();
  });
});
