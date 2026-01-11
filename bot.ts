
import { listenTransfers } from "./listener";
import { executeIndex } from "./executor";

listenTransfers(async (event) => {
  const { buyer, amount } = event;
  await executeIndex(buyer, amount);
});
