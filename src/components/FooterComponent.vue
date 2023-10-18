<template>
    <footer class="main-footer" :class="!menu ? 'm-0': ''">        
        <div class="copyright">
            <strong>Copyright © {{ updated }} PIMAX. </strong> Todos los derechos reservados.
        </div>
        <div class="version">
            <b>Versión Beta</b> 1.0.0
        </div>
    </footer>
</template>

<script setup>
    import moment from 'moment'
    import { ref } from 'vue'

    const props = defineProps({
        menu: {
            require: true,
            type: Boolean,
            default: false,
        }
    })

    let updated = moment().format('YYYY')

</script>

<style scoped>
.main-footer {
    /* margin-left: var(--offcanvas-width); */
    bottom: 0;
    left: 0;
    position: fixed;
    display: flex;
    right: 0;
    z-index: -1;
    background-color: #fff;
    border-top: 1px solid #dee2e6;
    color: #869099;
    padding:  .7rem var(--offcanvas-width);
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
}
.main-footer .copyright {
    padding-left: .5rem;
}

@media (max-width: 768px) {
    .main-footer {
        display: none;
    }
}

</style>