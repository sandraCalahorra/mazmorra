import { onMounted, ref } from 'vue';
import { loadAccount, updateAccount } from './account';
import { apiError } from './api';

export function useAccountForm(action) {
  const busy = ref(false);
  const status = ref('');
  const user = ref(null);
  const needsLogin = ref(false);

  onMounted(async () => {
    try {
      ({ user: user.value } = await loadAccount());
      if (action === 'profile' && !user.value) {
        needsLogin.value = true;
        status.value = 'Inicia sesión para acceder a esta sección.';
      }
    } catch (error) {
      status.value = apiError(error, 'No se ha podido cargar la cuenta.');
    }
  });

  async function submit(event) {
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    if (action === 'register') fields.consent = form.elements.consent.checked;

    busy.value = true;
    status.value = '';
    try {
      await updateAccount(action, fields);
      if (action === 'profile') {
        form.elements.current.value = '';
        form.elements.password.value = '';
        await loadAccount();
        status.value = 'Perfil guardado.';
      } else {
        location.assign('mis-partidas.html');
      }
    } catch (error) {
      status.value = apiError(error, 'No se ha podido guardar la cuenta.');
    } finally {
      busy.value = false;
    }
  }

  return { busy, status, user, needsLogin, submit };
}
