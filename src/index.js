import VPopover from './components/VPopover';
import VPopoverActivator from './directives/VPopoverActivator';

const VPopoverPlugin = {
    install(Vue, options) {
        options = options || {};

        Vue.component('VPopover', VPopover);
        Vue.directive('popoverActivator', VPopoverActivator);
    }
};

if (typeof window !== "undefined") {
    window.VPopover = VPopoverPlugin;
}

export default VPopoverPlugin;
