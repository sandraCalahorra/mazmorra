import { shallowRef } from 'vue';
import { api } from '@/bootstrap';

export const account = shallowRef(null);
let pending;

export function loadAccount() {
  pending ??= api.get('api/account')
    .then(({ data }) => (account.value = data))
    .catch((error) => {
      pending = undefined;
      throw error;
    });
  return pending;
}

export async function updateAccount(action, fields = {}) {
  const { csrf } = await loadAccount();
  const { data } = await api.post('api/account', { ...fields, action }, {
    headers: { 'X-Mazmorra-CSRF': csrf },
  });
  pending = undefined;
  return data;
}
