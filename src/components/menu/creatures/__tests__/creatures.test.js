import React from "react";
import {
  render as rtlRender,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import Creatures from "../creatures";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import userEvent from "@testing-library/user-event";

const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("The Creatures Component", () => {
  it("renders the correct creatures when given a search query", async () => {
    render(<Creatures />);
    expect(screen.getByText("Creatures")).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId("toggle-plus"));
    });

    const searchCreatures = screen.getByTestId("creatures-search");
    expect(searchCreatures).toBeInTheDocument();

    act(() => {
      userEvent.type(searchCreatures, "Knight");
    });

    const creaturesForm = screen.getByTestId("creatures-form");
    act(() => {
      fireEvent.submit(creaturesForm);
    });

    expect(
      await screen.findByText("Moongrum Carian Knight")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Description:Moongrum the Carian Knight is the guardian of Raya Lucaria Academy's Grand Library, he is the last line of defense against intruders who are wanting to slay the head sorcerer of the institute. Just like you, a Tarnished, Moongrum is capable of wielding two different weapons, a shield, can use sorcery, and even use Flasks to recover health. A true warrior of Raya Lucaria."
      )
    ).toBeInTheDocument();
    expect(await screen.findByText("Banished Knight")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Description:A tall knight who was banished and bound to serve the Grafted Lord, and to kill those trespassers of Stormveil Castle. They are normally seen wielding a large weapon such as a longsword with a shield or a polearm, and they are fully protected with a complete set of armor."
      )
    ).toBeInTheDocument();
  });
});
