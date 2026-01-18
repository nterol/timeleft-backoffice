import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { PercentageText } from "./percentage-text";

describe("PercentageText", () => {
  it("should display the percentage correctly", () => {
    render(<PercentageText current={50} total={100} />);
    expect(screen.getByText("50% booked")).toBeInTheDocument();
  });

  it("should calculate and round the percentage", () => {
    render(<PercentageText current={33} total={100} />);
    expect(screen.getByText("33% booked")).toBeInTheDocument();
  });

  it("should handle the case where current is 0", () => {
    render(<PercentageText current={0} total={100} />);
    expect(screen.getByText("0% booked")).toBeInTheDocument();
  });

  it("should clamp percentage above 100%", () => {
    render(<PercentageText current={100} total={100} />);
    expect(screen.getByText("100% booked")).toBeInTheDocument();
  });

  it("should clamp percentage below 0%", () => {
    render(<PercentageText current={-10} total={100} />);
    expect(screen.getByText("0% booked")).toBeInTheDocument();
  });

  it("should use green/orange gradient for <= 50%", () => {
    const { container } = render(<PercentageText current={40} total={100} />);
    const element = container.querySelector("span");
    expect(element).toBeTruthy();
    const backgroundStyle = element?.getAttribute("style");
    expect(backgroundStyle).toContain("green");
    expect(backgroundStyle).toContain("orange");
    expect(backgroundStyle).not.toContain("red");
  });

  it("should use orange/red gradient for > 50%", () => {
    const { container } = render(<PercentageText current={60} total={100} />);
    const element = container.querySelector("span");
    expect(element).toBeTruthy();
    const backgroundStyle = element?.getAttribute("style");
    expect(backgroundStyle).toContain("orange");
    expect(backgroundStyle).toContain("red");
    expect(backgroundStyle).not.toContain("green");
  });
});
