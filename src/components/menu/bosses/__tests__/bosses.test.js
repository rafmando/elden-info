import React from "react";
import {
  render as rtlRender,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import Bosses from "../bosses";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import userEvent from "@testing-library/user-event";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("The Bosses Component", () => {
  it("renders the correct bosses when given a search query", async () => {
    render(<Bosses />);
    expect(screen.getByText("Bosses")).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId("toggle-plus"));
    });

    const searchBosses = screen.getByTestId("bosses-search");
    expect(searchBosses).toBeInTheDocument();

    act(() => {
      userEvent.type(searchBosses, "Knight");
    });

    const bossesForm = screen.getByTestId("bosses-form");
    act(() => {
      fireEvent.submit(bossesForm);
    });

    expect(
      await screen.findByText("Bloodhound Knight Darriwil")
    ).toBeInTheDocument();
    expect(await screen.findByText("Health Points:14,792")).toBeInTheDocument();
    expect(
      await screen.findByText("Location:Limgrave, Forlon Hound Evergaol")
    ).toBeInTheDocument();
  });
});
