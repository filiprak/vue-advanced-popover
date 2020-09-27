import Vue from 'vue';

export const DATA_KEY = 'v-popover';
export const INSTANCES = {};

const sanitizeStr = (id) => {
    return (id || id === 0) ? String(id) : null;
};

const sanitize = (value) => {
    return (value || value === 0) ? value : null;
};

const getState = (binding) => {
    const state = {
        id: null,
        event: 'click',
        popover: null,
        data: null,
    };
    if (binding.value && typeof binding.value === 'object') {
        state.id = sanitizeStr(binding.value.id);
        state.data = sanitize(binding.value.data);
    } else {
        state.id = sanitizeStr(binding.value);
    }
    state.event = binding.arg || 'click';

    if (state.id) {
        state.popover = INSTANCES[state.id] || null;
    }
    return state;
};

const update = (el, binding, vnode) => {
    const state = getState(binding, vnode);
    const old = el[DATA_KEY];

    if (old) {
        if (state.popover !== old.popover || state.event !== old.event) {
            old.popover && old.popover.unbind(el);
            state.popover && state.popover.bind(el, state.event);
        }
    } else {
        if (state.popover) {
            state.popover && state.popover.bind(el, state.event);
        }
    }

    el[DATA_KEY] = state;
};

const destroy = (el, binding, vnode) => {
    const state = el[DATA_KEY];
    if (state.popover) {
        state.popover.unbind(el);
    }
    delete el[DATA_KEY];
};

export default {
    bind(el, binding, vnode) {
        update(el, binding, vnode);
    },
    inserted(el, binding, vnode) {
        vnode.context.$nextTick(() => {
            update(el, binding, vnode);
        });
    },
    update(el, binding, vnode, old_vnode) {
        vnode.context.$nextTick(() => {
            update(el, binding, vnode);
        });
    },
    componentUpdated(el, binding, vnode, old_vnode) {
        vnode.context.$nextTick(() => {
            update(el, binding, vnode);
        });
    },
    unbind(el, binding, vnode) {
        destroy(el, binding, vnode);
    },
};
