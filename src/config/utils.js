import { nextTick } from 'vue'
import languageDT  from '@/assets/language/Spanish.json'
import store from '@/config/store'
import moment from 'moment'
import 'moment/dist/locale/es'
moment.locale('es')


const Util = {
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    indexToOne(array) {
        let format = [];
        array.forEach((e, i) => {
            format[i + 1] = array[i];
        })
        return format;
    },
    load(load) {
        if (load) {
            $('.load-overlay').addClass('open')
        } else {
            $('.load-overlay').removeClass('open')
        }
    },
    process(load) {
        let timerInterval
        let alert = Swal.fire({
            title: 'Procesando',
            html: 'Te recomendamos no cerrar, ni actualizar la página mientras la información no termine de procesarse.',
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
        if (!load) {
            clearInterval(timerInterval)
            alert.close()
        }
    },
    processResult(res) {
        let icon = (!res) ? 'error' : 'success'
        let title = (!res) ? '¡Oops, se ha encontrado errores en el proceso!' : '¡Se ha terminado el proceso con exito!'
        let text = (!res) ? 'No se ha podido terminar de procesar la información.' : 'La información se ha procesado sin ningún error.'
    
        setTimeout(() => {
            Swal.fire({
                icon: icon,
                title: title,
                text: text,
                allowOutsideClick: false,
                showCconfirmButton: true,
                showCancelButton: false,
                timerProgressBar: false,
            })
        }, 1)
    },
    resetDataTable(name, options) {
        $(name).DataTable().destroy()
        nextTick(() => {            
            options.language = languageDT
            options.lengthMenu = [
                [10, 15, 25, 50, 100, 500, 1000, -1],
                [10, 15, 25, 50, 100, 500, 1000, 'Todos']
            ]
            options.pageLength = (options.pageLength) ? options.pageLength: 15
            $(name).DataTable(options)
        })
    },
    logoutExpired() {
        Swal.fire({
            title: 'Tu sesión ha expirado!',
            text: "¡Lamentamos mucho este sucedo, por favor inicia sesión nuevamente!.",
            showCancelButton: false,
            confirmButtonColor: '#000',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                store.dispatch('logout')
            }
        })
    },
    againBlock() {
        let timerInterval
        Swal.fire({
        title: '¡Has intentado muchas veces!',
        html: 'Espera <b></b> segundos para reestablecer conexión.',
        timer: 30000,
        timerProgressBar: true,
        allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = (parseInt(Swal.getTimerLeft() / 1000))
                }, 1000)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
    },
    startTooltip() {
        setTimeout(() => {
            let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            }) 
        }, 500)
    },
}

const Format = (type, value) => {
    switch (type) {
        case 'digits':
            return value.replace(/[^\d]/g, '')
            break;
        case 'letters':
            return value.replace(/[^a-zA-Z ]/g, '')
            break;
        default:
            return value
            break;
    }
}

window.Util = Util
window.Format = Format
