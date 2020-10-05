import VPopover from './components/VPopover';
import VPopoverDirective from './directives/VPopover';

const Plugin = {
    install(Vue, options) {
        options = options || {};

        Vue.component('VPopover', VPopover);
        Vue.directive('popover', VPopoverDirective);
    },
};

if (typeof window !== 'undefined' && window.Vue) {
    window.VueAdvancedPopover = Plugin;
    window.Vue.use(Plugin);
}

export default Plugin;
