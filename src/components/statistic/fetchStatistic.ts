export const getNfts = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/nfts/list?order=h24_volume_native_desc&asset_platform_id=ethereum&per_page=100&page=1"
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data;
};

export const getSingleNft = async (id: string) => {
  const res = await fetch(`https://api.coingecko.com/api/v3/nfts/${id}`);
  const data = await res.json();
  return data;
};

export const getExchanges = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/exchanges?per_page=25&page=1"
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data;
};

export const getCompanies = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin"
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.companies;
};
