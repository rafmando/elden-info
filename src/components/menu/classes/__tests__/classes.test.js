import React from "react";
import {
  render as rtlRender,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import Classes from "../classes";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import userEvent from "@testing-library/user-event";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("The Classes Component", () => {
  it("renders the correct classes when given a search query", async () => {
    render(<Classes />);
    expect(screen.getByText("Classes")).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId("toggle-plus"));
    });

    const searchClasses = screen.getByTestId("classes-search");
    expect(searchClasses).toBeInTheDocument();

    act(() => {
      userEvent.type(searchClasses, "Knight");
    });

    const classesForm = screen.getByTestId("classes-form");
    act(() => {
      fireEvent.submit(classesForm);
    });

    expect(await screen.findByText("Enchanted Knight")).toBeInTheDocument();
    expect(await screen.findByText("Arcane:5")).toBeInTheDocument();
    expect(await screen.findByText("Dexterity:16")).toBeInTheDocument();
    expect(await screen.findByText("Endurance:11")).toBeInTheDocument();
    expect(await screen.findByText("Faith:5")).toBeInTheDocument();
    expect(await screen.findByText("Intelligence:5")).toBeInTheDocument();
    expect(await screen.findByText("Level:5")).toBeInTheDocument();
    expect(await screen.findByText("Mind:13")).toBeInTheDocument();
    expect(await screen.findByText("Strength:15")).toBeInTheDocument();
    expect(await screen.findByText("Vigor:10")).toBeInTheDocument();
  });
});
