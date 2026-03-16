/* eslint-disable import/no-anonymous-default-export */
export default {
  host:
    (process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL_PROD
      : process.env.NEXT_PUBLIC_BASE_URL) || "http://localhost:5000",

  google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  crypto_key: process.env.NEXT_CRYPTO_KEY,
  redis_url: process.env.REDIS_URL,
  local_storage_base_url_dev: process.env.LOCAL_STORAGE_BASE_URL_DEV,
  local_storage_base_url_prod: process.env.LOCAL_STORAGE_BASE_URL_PROD,
};
