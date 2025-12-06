import { axe } from "jest-axe";
import { Header } from "@/shared/components";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("Header Tests", () => {
  describe("Accessibility (WCAG 2.1)", () => {
    it("should not have any accessibility violations", async () => {
      const { container } = render(<Header />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it("should have proper ARIA labels", () => {
      render(<Header />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByLabelText("Drive lah")).toBeInTheDocument();
      expect(screen.getByLabelText("Profile Pic")).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "Navigation" }),
      ).toBeInTheDocument();
    });

    it("should have alt text for images", () => {
      render(<Header />);
      const logo = screen.getByAltText("Drive lah");
      const profileImg = screen.getByAltText("Profile Pic");

      expect(logo).toBeInTheDocument();
      expect(profileImg).toBeInTheDocument();
    });

    it("should be keyboard navigable", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByLabelText("Menu");
      const logo = screen.getByLabelText("Drive lah");
      const learnMore = screen.getByText("Learn more");
      const listYourCar = screen.getByText("List your car");
      const inbox = screen.getByText("Inbox");
      const profileBtn = screen.getByLabelText("Profile Pic");

      // Tab through elements in actual DOM order
      await user.tab();
      expect(hamburger).toHaveFocus();

      await user.tab();
      expect(logo).toHaveFocus();

      await user.tab();
      expect(learnMore).toHaveFocus();

      await user.tab();
      expect(listYourCar).toHaveFocus();

      await user.tab();
      expect(inbox).toHaveFocus();

      await user.tab();
      expect(profileBtn).toHaveFocus();
    });

    it("should support screen readers with semantic HTML", () => {
      render(<Header />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Profile Pic" }),
      ).toBeInTheDocument();
    });
  });

  describe("Component Rendering", () => {
    it("should render the logo", () => {
      render(<Header />);
      const logo = screen.getByRole("link", { name: "Drive lah" });

      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("href", "/");
    });

    it("should render all navigation links", () => {
      render(<Header />);

      expect(screen.getByText("Learn more")).toBeInTheDocument();
      expect(screen.getByText("List your car")).toBeInTheDocument();
      expect(screen.getByText("Inbox")).toBeInTheDocument();
    });

    it("should render profile picture", () => {
      render(<Header />);
      const profileBtn = screen.getByRole("button", { name: "Profile Pic" });

      expect(profileBtn).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should handle logo click", async () => {
      const user = userEvent.setup();

      render(<Header />);
      const logo = screen.getByLabelText("Drive lah");

      await user.click(logo);
      expect(logo).toHaveAttribute("href", "/");
    });

    it("should handle navigation link clicks", async () => {
      const user = userEvent.setup();

      render(<Header />);
      const inbox = screen.getByText("Inbox");
      const learnMore = screen.getByText("Learn more");
      const listYourCar = screen.getByText("List your car");

      await user.click(inbox);
      await user.click(learnMore);
      await user.click(listYourCar);

      expect(inbox).toHaveAttribute("href", "#inbox");
      expect(listYourCar).toHaveAttribute("href", "#list-car");
      expect(learnMore).toHaveAttribute("href", "#learn-more");
    });

    it("should handle profile button click", async () => {
      const user = userEvent.setup();

      render(<Header />);
      const profileBtn = screen.getByLabelText("Profile Pic");

      await user.click(profileBtn);
      expect(profileBtn).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should handle missing image gracefully", () => {
      render(<Header />);
      const images = screen.getAllByRole("img");

      images.forEach((img) => {
        expect(img).toHaveAttribute("src");
        expect(img.getAttribute("src")).toBeTruthy();
      });
    });

    it("should have loading and decoding attributes for images", () => {
      render(<Header />);
      const logoImg = screen.getAllByRole("img")[0];
      const profileImg = screen.getByAltText("Profile Pic");

      expect(logoImg).toHaveAttribute("loading");
      expect(logoImg).toHaveAttribute("decoding");
      expect(profileImg).toHaveAttribute("loading", "lazy");
      expect(profileImg).toHaveAttribute("decoding", "async");
    });
  });
});
