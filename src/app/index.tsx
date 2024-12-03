import { FlashList } from "@shopify/flash-list";

import TodoItem from "~/components/todo-item";
import { SessionProvider } from "~/providers/session-provider";

export default function Index() {
  return (
    <SessionProvider>
      <App />
    </SessionProvider>
  );
}

function App() {
  return (
    <FlashList
      data={[...Array(50)]}
      estimatedItemSize={48}
      renderItem={() => <TodoItem />}
    />
  );
}
