import VPopover from './components/VPopover';

const VPopoverPlugin = {
    install(Vue, options) {
        options = options || {};
        Vue.component(options.name || VPopover.name, VPopover);
    }
};

if (typeof window !== "undefined") {
    window.VPopover = VPopoverPlugin;
}

export default VPopoverPlugin;
