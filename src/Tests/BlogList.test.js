import {render, screen} from "@testing-library/react"
import'@testing-library/jest-dom';
import { Navbar, BlogPost, BlogList } from "../Components";
import { waitFor } from "@testing-library/react";



beforeEach(()=>render(<BlogList/>));
describe("BlogList", () => {

    it("Should Display Favorites title in BlogList", () => {
        render(<BlogList />);
        waitFor(() =>  expect(screen.queryByText(/add to favorite/i)).toBeInTheDocument());
    });

    it("Should Display Favorites title in BlogList", () => {
        render(<BlogList />);
        waitFor(() =>  expect(screen.queryByText(/add to watchlist/i)).toBeInTheDocument());
    });

    it("Should Display Favorites title in BlogList", () => {
        render(<BlogList />);
        waitFor(() =>  expect(screen.queryByText(/Search/i)).toBeInTheDocument());
    });

    it("Should Display Favorites title in BlogList", () => {
        render(<BlogList />);
        waitFor(() =>  expect(screen.queryByText(/search movie/i)).toBeInTheDocument());
    });

    it("Should Display Favorites title in BlogList", () => {
        render(<BlogList />);
        waitFor(() =>  expect(screen.queryByText(/recent 5 favorites/i)).toBeInTheDocument());
    });


});