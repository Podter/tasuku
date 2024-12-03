import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { Checkbox, ListItem, Spinner, Square } from "tamagui";

import { api } from "~/lib/api";

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
        <Checkbox
          checked={data.done}
          onPress={() => mutate({ id, done: !data.done })}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>
      )}
      title={
        <ListItem.Text textDecorationLine={data.done ? "line-through" : "none"}>
          {data.title}
        </ListItem.Text>
      }
    />
  );
}
