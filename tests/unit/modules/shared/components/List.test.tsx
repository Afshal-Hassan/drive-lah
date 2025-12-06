import { List } from "@/shared/components";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

describe("List Tests", () => {
  it("renders empty list without errors", () => {
    const { container } = render(<List items={[]} renderItem={() => null} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders list of strings", () => {
    const items = ["Apple", "Banana", "Cherry"];

    render(
      <List
        items={items}
        renderItem={(item) => <div key={item}>{item}</div>}
      />,
    );

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  it("renders list of numbers", () => {
    const items = [1, 2, 3, 4, 5];

    render(
      <List
        items={items}
        renderItem={(item) => <span key={item}>{item}</span>}
      />,
    );

    items.forEach((num) => {
      expect(screen.getByText(num.toString())).toBeInTheDocument();
    });
  });

  it("renders list of objects", () => {
    interface User {
      id: number;
      name: string;
    }

    const items: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    render(
      <List
        items={items}
        renderItem={(user) => (
          <div key={user.id} data-testid={`user-${user.id}`}>
            {user.name}
          </div>
        )}
      />,
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("calls renderItem for each item", () => {
    const items = ["a", "b", "c"];
    const renderItem = vi.fn((item: string) => <div key={item}>{item}</div>);

    render(<List items={items} renderItem={renderItem} />);

    expect(renderItem).toHaveBeenCalledTimes(3);
  });

  it("passes correct item to renderItem", () => {
    const items = ["first", "second", "third"];
    const renderItem = vi.fn((item: string) => <div key={item}>{item}</div>);

    render(<List items={items} renderItem={renderItem} />);

    expect(renderItem).toHaveBeenNthCalledWith(1, "first", 0, items);
    expect(renderItem).toHaveBeenNthCalledWith(2, "second", 1, items);
    expect(renderItem).toHaveBeenNthCalledWith(3, "third", 2, items);
  });

  it("passes correct index to renderItem", () => {
    const items = ["a", "b", "c"];

    render(
      <List
        items={items}
        renderItem={(item, index) => (
          <div key={item} data-testid={`item-${index}`}>
            Index: {index}
          </div>
        )}
      />,
    );

    expect(screen.getByTestId("item-0")).toHaveTextContent("Index: 0");
    expect(screen.getByTestId("item-1")).toHaveTextContent("Index: 1");
    expect(screen.getByTestId("item-2")).toHaveTextContent("Index: 2");
  });

  it("renders complex components as list items", () => {
    interface Product {
      id: number;
      name: string;
      price: number;
    }

    const items: Product[] = [
      { id: 1, name: "Laptop", price: 999 },
      { id: 2, name: "Mouse", price: 29 },
    ];

    render(
      <List
        items={items}
        renderItem={(product) => (
          <div key={product.id} data-testid={`product-${product.id}`}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        )}
      />,
    );

    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("$999")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.getByText("$29")).toBeInTheDocument();
  });

  it("handles null return from renderItem", () => {
    const items = [1, 2, 3];

    render(
      <List
        items={items}
        renderItem={(item) =>
          item === 2 ? null : <div key={item}>{item}</div>
        }
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("handles conditional rendering", () => {
    const items = [1, 2, 3, 4, 5];

    render(
      <List
        items={items}
        renderItem={(item) =>
          item % 2 === 0 ? (
            <div key={item}>Even: {item}</div>
          ) : (
            <div key={item}>Odd: {item}</div>
          )
        }
      />,
    );

    expect(screen.getByText("Odd: 1")).toBeInTheDocument();
    expect(screen.getByText("Even: 2")).toBeInTheDocument();
    expect(screen.getByText("Odd: 3")).toBeInTheDocument();
    expect(screen.getByText("Even: 4")).toBeInTheDocument();
    expect(screen.getByText("Odd: 5")).toBeInTheDocument();
  });

  it("renders single item correctly", () => {
    const items = ["Only Item"];

    render(
      <List
        items={items}
        renderItem={(item) => <div key={item}>{item}</div>}
      />,
    );

    expect(screen.getByText("Only Item")).toBeInTheDocument();
  });

  it("handles boolean items", () => {
    const items = [true, false, true];

    render(
      <List
        items={items}
        renderItem={(item, index) => (
          <div key={index}>{item ? "Yes" : "No"}</div>
        )}
      />,
    );

    const yesElements = screen.getAllByText("Yes");
    const noElements = screen.getAllByText("No");

    expect(yesElements).toHaveLength(2);
    expect(noElements).toHaveLength(1);
  });

  it("maintains correct order of items", () => {
    const items = ["First", "Second", "Third"];

    const { container } = render(
      <List
        items={items}
        renderItem={(item) => <div key={item}>{item}</div>}
      />,
    );

    const divs = container.querySelectorAll("div");

    expect(divs[0]).toHaveTextContent("First");
    expect(divs[1]).toHaveTextContent("Second");
    expect(divs[2]).toHaveTextContent("Third");
  });

  it("works with different types in same test", () => {
    interface Animal {
      species: string;
      sound: string;
    }

    const animals: Animal[] = [
      { species: "Dog", sound: "Woof" },
      { species: "Cat", sound: "Meow" },
    ];

    const { rerender } = render(
      <List
        items={animals}
        renderItem={(animal) => (
          <div key={animal.species}>
            {animal.species}: {animal.sound}
          </div>
        )}
      />,
    );

    expect(screen.getByText("Dog: Woof")).toBeInTheDocument();
    expect(screen.getByText("Cat: Meow")).toBeInTheDocument();

    const numbers = [10, 20, 30];

    rerender(
      <List
        items={numbers}
        renderItem={(num) => <span key={num}>{num}</span>}
      />,
    );

    expect(screen.queryByText("Dog: Woof")).not.toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});
