import React from "react";
import {
  render as rtlRender,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import Incantations from "../incantations";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import userEvent from "@testing-library/user-event";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("The Incantations Component", () => {
  it("renders the correct incantations when given a search query", async () => {
    render(<Incantations />);
    expect(screen.getByText("Incantations")).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId("toggle-plus"));
    });

    const searchIncantations = screen.getByTestId("incantations-search");
    expect(searchIncantations).toBeInTheDocument();

    act(() => {
      userEvent.type(searchIncantations, "ancient");
    });

    const incantationsForm = screen.getByTestId("incantations-form");
    act(() => {
      fireEvent.submit(incantationsForm);
    });

    expect(
      await screen.findByText("Ancient Dragons' Lightning Strike")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Ancient Dragons' Lightning Spear")
    ).toBeInTheDocument();
  });
});
