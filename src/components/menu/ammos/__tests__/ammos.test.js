import React from "react";
import {
  render as rtlRender,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import Ammos from "../ammos";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import userEvent from "@testing-library/user-event";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("The Ammos Component", () => {
  it("renders the correct ammo when given a search query", async () => {
    render(<Ammos />);
    expect(screen.getByText("Ammos")).toBeInTheDocument();
    // user clicks ammo toggle
    act(() => {
      fireEvent.click(screen.getByTestId("toggle-plus"));
    });
    // checks to see if the search input shows
    const searchAmmo = screen.getByTestId("ammo-search");
    expect(searchAmmo).toBeInTheDocument();
    // user enters in a query
    act(() => {
      userEvent.type(searchAmmo, "fire");
    });
    expect(searchAmmo).toHaveValue("fire");
    // submits the search query
    const ammoForm = screen.getByTestId("ammo-form");
    act(() => {
      fireEvent.submit(ammoForm);
    });
    // user is expected results
    expect(await screen.findByText("Firebone Arrow")).toBeInTheDocument();
    expect(
      await screen.findByText("Firebone Arrow Fletched")
    ).toBeInTheDocument();
    expect(await screen.findByText("Firebone Bolt")).toBeInTheDocument();
  });
});
