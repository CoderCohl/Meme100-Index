
export async function executeIndex(buyer: string, amount: number) {
  const assets = loadIndexAssets();
  const split = amount / assets.length;

  for (const asset of assets) {
    await swapAndSend(asset, split, buyer);
  }
}
