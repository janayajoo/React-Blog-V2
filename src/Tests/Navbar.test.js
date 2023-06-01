import {render, screen} from "@testing-library/react"
import'@testing-library/jest-dom';
import { Navbar, BlogPost } from "../Components";
import { waitFor } from "@testing-library/react";



beforeEach(()=>render(<Navbar/>));
describe("Navbar", () => {

    it("Should Display BlogList title in Navbar", () => {
        render(<Navbar />);
        waitFor(() =>  expect(screen.queryByText(/blog list/i)).toBeInTheDocument());
    });

    it("Should Display BlogPost title in Navbar", () => {
        render(<Navbar />);
        waitFor(() =>  expect(screen.queryByText(/blog post/i)).toBeInTheDocument());
    });

    it("Should Display Favorites title in Navbar", () => {
        render(<Navbar />);
        waitFor(() =>  expect(screen.queryByText(/favorites/i)).toBeInTheDocument());
    });

    it("Should Display Watchlist title in Navbar", () => {
        render(<Navbar />);
        waitFor(() =>  expect(screen.queryByText(/watchlist/i)).toBeInTheDocument());
    });

    it("Should Display Log In title in Navbar", () => {
        render(<Navbar />);
        waitFor(() =>  expect(screen.queryByText(/log in/i)).toBeInTheDocument());
    });


    it("Should Display Log Out title in Navbar", () => {
        render(<Navbar />);
        waitFor(() =>  expect(screen.queryByText(/log out/i)).toBeInTheDocument());
    });

});