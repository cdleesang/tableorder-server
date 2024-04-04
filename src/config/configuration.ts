export const configuration = () => ({
  storeId: process.env.STORE_ID,
  storeName: process.env.STORE_NAME,
  accessToken: process.env.ACCESS_TOKEN,
});

export type Configuration = ReturnType<typeof configuration>;