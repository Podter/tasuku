import type { KeyboardEvent } from "react-native";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const EVENT_TYPE = {
  didShow: { show: "keyboardDidShow", hide: "keyboardDidHide" },
  willShow: { show: "keyboardWillShow", hide: "keyboardWillHide" },
} as const;

export function useKeyboard(
  { eventType = "didShow" }: { eventType?: keyof typeof EVENT_TYPE } = {
    eventType: "didShow",
  },
) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      EVENT_TYPE[eventType].show,
      (e: KeyboardEvent) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const hideListener = Keyboard.addListener(
      EVENT_TYPE[eventType].hide,
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      },
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismissKeyboard() {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  }

  return {
    isKeyboardVisible,
    keyboardHeight,
    dismissKeyboard,
  };
}
