import VPopover from './components/VPopover';
import VPopoverDirective from './directives/VPopover';

export default {
    install(Vue, options) {
        options = options || {};

        Vue.component('VPopover', VPopover);
        Vue.directive('popover', VPopoverDirective);
    }
};
