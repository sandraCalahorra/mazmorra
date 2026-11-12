<template>
    <p id="user-status" role="status">{{ message }}</p>
    <div v-if="account?.user" id="user-games">
        <p>
            Las solicitudes realizadas con tu sesión iniciada aparecen aquí.
            Las anteriores al registro no se vinculan automáticamente.
        </p>
        <section v-for="section in sections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <p v-if="!section.games.length">No hay partidas en esta sección.</p>
            <article v-for="game in section.games" :key="game.id" class="session-card">
                <h3>{{ game.title }}</h3>
                <p v-if="game.request_type === 'commissioned'"><strong>Partida por encargo</strong></p>
                <p>
                    {{ madridDate(game.starts) }} (Madrid)<br>
                    {{ game.duration }} · {{ game.mode }}
                </p>
                <p>
                    {{ game.players }} plaza(s) · Reserva {{ statuses[game.status] || game.status }}<br>
                    Pago: {{ Number(game.paid) ? 'Comprobado por el máster' : 'No comprobado' }}
                </p>
                <aside v-if="game.status === 'rejected' && game.rejection_reason" role="note"
                    class="my-[18px] rounded-lg border border-[#d3a38f] bg-[#fff0e8] p-4 text-[#663c30]">
                    <strong>Mensaje del máster sobre tu solicitud</strong>
                    <p class="mt-2 mb-0 whitespace-pre-wrap [overflow-wrap:anywhere]" style="color: inherit">
                        {{ game.rejection_reason }}
                    </p>
                </aside>
                <button type="button" class="btn outline" @click="contactGame(game)">
                    Contactar con el máster ↗
                </button>
            </article>
        </section>
    </div>
    <template v-else-if="account">
        <p>Inicia sesión para acceder a esta sección.</p>
        <a class="btn gold" href="acceso">Iniciar sesión</a>
    </template>
</template>

<script>
import { account, loadAccount } from '@/store/modules/account';
import { apiError } from '@/bootstrap';
import { loadFeature } from '@/features';

const statuses = {
    pending: 'Pendiente',
    waitlisted: 'En lista de espera (no reserva plazas)',
    confirmed: 'Confirmada',
    rejected: 'Rechazada',
    cancelled: 'Cancelada',
};

export default {
    data() {
        return { message: '', statuses };
    },

    computed: {
        account() {
            return account.value;
        },

        sections() {
            const games = this.account?.reservations ?? [];
            const now = Date.now();
            return [
                { title: 'Próximas partidas', games: games.filter((game) => Date.parse(game.starts) >= now) },
                { title: 'Historial', games: games.filter((game) => Date.parse(game.starts) < now) },
            ];
        },
    },

    async mounted() {
        try {
            await loadAccount();
        } catch (error) {
            this.message = apiError(error, 'No se han podido cargar tus partidas.');
        }
    },

    methods: {
        madridDate(starts) {
            return new Date(starts).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
        },

        async contactGame(game) {
            let app;
            try {
                app = await loadFeature('app');
            } catch {
                this.message = 'No se ha podido abrir el formulario de contacto.';
                return;
            }

            app.contact(`mi reserva para «${game.title}»`);
            const field = document.getElementById('message');
            if (!field) return;

            field.value = `Hola, Hugo. Soy ${this.account.user.name}.\n\n`
                + `Te escribo sobre mi reserva para «${game.title}», `
                + `del ${this.madridDate(game.starts)} (horario de Madrid).\n\n`
                + `Referencia de reserva: ${game.id}.\n\nMi consulta es:\n`;
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.focus();
            field.setSelectionRange(field.value.length, field.value.length);
        },
    },
};
</script>
