import { ReactNode } from "react";

export default function List<T>({
  items,
  renderItem,
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}) {
  if (items.length === 0) {
    return <></>;
  }

  return <>{items?.map(renderItem)}</>;
}
