import axios from 'axios';

export const api = axios.create({
  baseURL: document.querySelector('meta[name="app-base-url"]').content,
  timeout: 20000,
  headers: { Accept: 'application/json' },
});

export function apiError(error, fallback) {
  return error.response?.data?.error || error.response?.data?.message || fallback;
}

export function requestWithStatus(url, options) {
  return api.request({ url, validateStatus: () => true, ...options });
}
