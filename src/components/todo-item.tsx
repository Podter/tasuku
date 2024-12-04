import {
  Check as CheckIcon,
  Trash2 as Trash2Icon,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { Checkbox, ListItem, Spinner, Square, Stack } from "tamagui";

import { api } from "~/lib/api";
import { useDeleteMode } from "~/providers/delete-mode-provider";

interface TodoItemProps {
  id: string;
}

export default function TodoItem({ id }: TodoItemProps) {
  const toast = useToastController();

  const utils = api.useUtils();
  const { data, isLoading } = api.task.getOne.useQuery({ id });

  const { mutate } = api.task.update.useMutation({
    onMutate: async (newData) => {
      await utils.task.getOne.cancel({ id });
      const previousData = utils.task.getOne.getData({ id });
      if (previousData) {
        utils.task.getOne.setData({ id }, { ...previousData, ...newData });
        return { previousData };
      }
    },
    onError: (err, _newData, context) => {
      if (context?.previousData) {
        utils.task.getOne.setData({ id }, context.previousData);
      }
      toast.show("An error occurred", {
        message: err.message,
      });
    },
    onSettled: () => {
      utils.task.getOne.invalidate({ id });
    },
  });

  if (!data || isLoading) {
    return (
      <ListItem
        icon={({ color }) => <Spinner color={color} />}
        title={<Square h={17} w="$15" bg="$borderColor" borderRadius="$2" />}
      />
    );
  }

  return (
    <ListItem
      hoverTheme
      pressTheme
      onPress={() => mutate({ id, done: !data.done })}
      icon={() => (
        <TaskCheckbox
          checked={data.done}
          onPress={() => mutate({ id, done: !data.done })}
        />
      )}
      iconAfter={() => <DeleteTask id={id} />}
      title={
        <ListItem.Text textDecorationLine={data.done ? "line-through" : "none"}>
          {data.title}
        </ListItem.Text>
      }
    />
  );
}

interface TaskCheckboxProps {
  checked: boolean;
  onPress: () => void;
}

function TaskCheckbox({ checked, onPress }: TaskCheckboxProps) {
  return (
    <Checkbox checked={checked} onPress={onPress}>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox>
  );
}

function DeleteTask({ id }: { id: string }) {
  const toast = useToastController();
  const { deleteMode } = useDeleteMode();
  const utils = api.useUtils();

  const { mutate } = api.task.delete.useMutation({
    onMutate: async () => {
      await utils.task.getIds.cancel();
      const previousData = utils.task.getIds.getData();
      if (previousData) {
        utils.task.getIds.setData(undefined, {
          ids: previousData.ids.filter((i) => i !== id),
        });
        return { previousData };
      }
    },
    onError: (err, _newData, context) => {
      if (context?.previousData) {
        utils.task.getIds.setData(undefined, context.previousData);
      }
      toast.show("An error occurred", {
        message: err.message,
      });
    },
    onSettled: () => {
      utils.task.getIds.invalidate();
    },
  });

  if (!deleteMode) {
    return null;
  }

  return (
    <Stack
      width="$1"
      height="$1"
      pressStyle={{ opacity: 0.25 }}
      onPress={() => mutate({ id })}
      role="button"
    >
      <Trash2Icon size="$1" color="$red9" />
    </Stack>
  );
}
