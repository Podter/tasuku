import { useState } from "react";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Checkbox, ListItem } from "tamagui";

export default function TodoItem() {
  const [done, setDone] = useState(false);

  return (
    <ListItem
      hoverTheme
      pressTheme
      onPress={() => setDone((v) => !v)}
      icon={() => (
        <Checkbox checked={done} onPress={() => setDone((v) => !v)}>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>
      )}
      title={
        <ListItem.Text textDecorationLine={done ? "line-through" : "none"}>
          Do laundry
        </ListItem.Text>
      }
    />
  );
}
