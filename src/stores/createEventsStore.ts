import { ethers, type EventFilter } from "ethers";
import { derived, readable } from "svelte/store";
import { getChan, getChanProvider } from "../lib/chan";
import {
  asyncDerived,
  asyncReadable,
  type Loadable,
} from "@square/svelte-store";
import { orderBy } from "lodash-es";

function createLiveEventsStore(
  filter: EventFilter,
  fromBlockNumber: Loadable<number>
) {
  const occ = getChan();
  const provider = getChanProvider();

  const events: ethers.Event[] = [];

  return readable<ethers.Event[]>([], (set) => {
    fromBlockNumber.load().then(($blockNumber) =>
      provider.on(filter, (event: ethers.Event) => {
        if (event.blockNumber <= $blockNumber) return; // not interested in this event
        event.args = occ.interface.parseLog(event).args;
        events.push(event);
        set(events);
      })
    );

    return () => {
      provider.removeAllListeners(filter);
    };
  });
}

export function createEventsStore(topic: string) {
  const occ = getChan();
  const provider = getChanProvider();

  const filter = occ.filters.Post(topic);

  const blockNumber = asyncReadable(null, () => provider.getBlockNumber());

  const { store: historicalEvents, state } = asyncDerived(
    [blockNumber],
    ([$blockNumber]) => occ.queryFilter(filter, 0, $blockNumber),
    { trackState: true }
  );

  const liveEvents = createLiveEventsStore(filter, blockNumber);

  return {
    store: derived(
      [historicalEvents, liveEvents],
      ([$historicalEvents, $liveEvents]) =>
        orderBy(
          [...$liveEvents, ...($historicalEvents ?? [])],
          ["blockNumber", "transactionIndex"],
          ["desc", "desc"]
        )
    ),
    state,
  };
}
