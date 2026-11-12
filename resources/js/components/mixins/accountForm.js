import { loadAccount, updateAccount } from '@/store/modules/account';
import { apiError } from '@/bootstrap';

export function accountForm(action) {
    return {
        data() {
            return {
                busy: false,
                status: '',
                user: null,
                needsLogin: false,
            };
        },

        async mounted() {
            try {
                const { user } = await loadAccount();
                this.user = user;
                if (action === 'profile' && !this.user) {
                    this.needsLogin = true;
                    this.status = 'Inicia sesión para acceder a esta sección.';
                }
            } catch (error) {
                this.status = apiError(error, 'No se ha podido cargar la cuenta.');
            }
        },

        methods: {
            async submit(event) {
                const form = event.currentTarget;
                const fields = Object.fromEntries(new FormData(form));
                if (action === 'register') fields.consent = form.elements.consent.checked;

                this.busy = true;
                this.status = '';
                try {
                    await updateAccount(action, fields);
                    if (action === 'profile') {
                        form.elements.current.value = '';
                        form.elements.password.value = '';
                        await loadAccount();
                        this.status = 'Perfil guardado.';
                    } else {
                        location.assign('mis-partidas');
                    }
                } catch (error) {
                    this.status = apiError(error, 'No se ha podido guardar la cuenta.');
                } finally {
                    this.busy = false;
                }
            },
        },
    };
}
