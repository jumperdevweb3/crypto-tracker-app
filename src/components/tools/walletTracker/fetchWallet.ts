export const getWalletData = async (address: string) => {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=balance&tag=latest&market_chart?vs_currency=usd&days=450&interval=daily&apikey=${process.env.API_ETHERSCAN_KEY}&address=` +
        address
    );
    if (!response.ok) throw new Error("problem");
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) return error;
  }
};
