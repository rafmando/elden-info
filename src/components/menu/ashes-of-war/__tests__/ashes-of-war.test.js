import React from "react";
import {
  render as rtlRender,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import AshesOfWar from "../ashes-of-war";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import userEvent from "@testing-library/user-event";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("The Ashes Of War Component", () => {
  it("renders the correct ashes when given a search query", async () => {
    render(<AshesOfWar />);
    expect(screen.getByText("Ashes Of War")).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId("toggle-plus"));
    });

    const searchAshes = screen.getByTestId("ashes-search");
    expect(searchAshes).toBeInTheDocument();

    act(() => {
      userEvent.type(searchAshes, "Ash Of War: Assassin's");
    });

    const ashesForm = screen.getByTestId("ashes-form");
    act(() => {
      fireEvent.submit(ashesForm);
    });

    expect(
      await screen.findByText("Ash Of War: Assassin's Gambit")
    ).toBeInTheDocument();
  });
});
