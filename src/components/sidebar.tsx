import { View } from "react-native";
import { Link } from "expo-router";

import type { RouterOutputs } from "~/lib/api";
import { api } from "~/lib/api";
import { ListTodo } from "./icons/list-todo";
import { Plus } from "./icons/plus";
import NewList from "./new-list";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Text } from "./ui/text";

export default function Sidebar() {
  const { data, isFetching } = api.list.getMany.useQuery();

  return (
    <View className="flex-1 flex-col gap-4 border-r border-border p-4">
      <View className="h-8 flex-row items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Tasuku
        </Link>
        <Avatar alt="Zach Nugent's Avatar" className="h-8 w-8">
          <AvatarImage
            source={{
              uri: "https://api.dicebear.com/9.x/thumbs/svg",
            }}
          />
          <AvatarFallback>
            <Text>P</Text>
          </AvatarFallback>
        </Avatar>
      </View>
      <View className="gap-1">
        <Link href="/" asChild>
          <Button
            className="flex-row justify-start gap-2 px-2 text-start"
            variant="ghost"
          >
            <ListTodo />
            <Text>All Tasks</Text>
          </Button>
        </Link>
        <NewList>
          <Button
            className="flex-row justify-start gap-2 px-2 text-start"
            variant="ghost"
          >
            <Plus />
            <Text>New List</Text>
          </Button>
        </NewList>
      </View>
      <View className="gap-1">
        <Label className="mb-1 text-muted-foreground">Lists</Label>
        {!isFetching &&
          data &&
          data.map((props) => <List {...props} key={props.id} />)}
      </View>
    </View>
  );
}

function List({ id, name }: RouterOutputs["list"]["getMany"][number]) {
  return (
    <Link
      href={{
        pathname: "/list/[id]",
        params: { id },
      }}
      asChild
    >
      <Button
        className="flex-row justify-start px-2 text-start"
        variant="ghost"
      >
        <Text className="ml-8">{name}</Text>
      </Button>
    </Link>
  );
}
