import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** `false` on the server and during hydration, `true` afterwards. Avoids setState-in-effect mounted flags. */
export function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
