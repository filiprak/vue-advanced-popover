import Vue from 'vue';

const DATA_KEY = 'v-popover';


export default {
    bind(el, binding, vnode) {

        const onClick = () => {
            const data = el[DATA_KEY];
            data.popover && data.popover.open(el);
        };

        el.addEventListener('click', onClick);

        el[DATA_KEY] = {
            popover: vnode.context.$refs[binding.value],
            listeners: {
                onClick: onClick,
            },
        };
    },
    inserted(el, binding, vnode) {
        el[DATA_KEY].popover = vnode.context.$refs[binding.value];
        if (binding.modifiers.open) {
            el[DATA_KEY].popover.open(el);
        }
    },
    update(el, binding, vnode) {
        el[DATA_KEY].popover = vnode.context.$refs[binding.value];
    },
    componentUpdated(el, binding, vnode) {
        el[DATA_KEY].popover = vnode.context.$refs[binding.value];
    },
    unbind(el, binding, vnode) {
        const data = el[DATA_KEY];
        if (data.popover && data.popover.activator === el) {
            data.popover.close();
        }
        el.removeEventListener('click', data.listeners.onClick);
    },
};
