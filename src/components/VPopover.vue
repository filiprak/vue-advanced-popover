<script>
import {DATA_KEY} from "../directives/VPopoverActivator";
import {INSTANCES} from "../directives/VPopoverActivator";

const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

export default {
    name: 'VPopover',
    render(h) {
        return h('div', {
            class: {
                'ik-popover': true,
                'ik-popover--transition': this.transition
            }
        }, [this.renderContent(h)]);
    },
    props: {
        id: {
            type: [String, Number],
            default: null,
        },
        position: {
            type: String,
            default: 'auto',
        },
        align: {
            type: String,
            default: 'center',
        },
        offset: {
            type: [String, Number],
            default: 5,
        },
        transition: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        id_str() {
            return this.id ? String(this.id) : null;
        },
    },
    data() {
        return {
            dimensions: {
                x: 0,
                y: 0,
            },
            opened: false,
            activator: null,
            transition_off: false,
        };
    },
    methods: {
        renderContent(h) {
            return h('div', {
                ref: 'content',
                class: {
                    'v-popover__content': true,
                    'v-popover__content--transition': this.transition,
                },
                style: {
                    zIndex: '9',
                    display: this.opened ? null : 'none',
                    transform: 'translate(' + this.dimensions.x + 'px, ' + this.dimensions.y + 'px)',
                },
            }, this.$slots.default);
        },
        bind(el) {
            el && el.addEventListener('click', this.onActivatorClick);
        },
        unbind(el) {
            if (el) {
                el.removeEventListener('click', this.onActivatorClick);
                if (el === this.activator) {
                    this.close();
                    this.activator = null;
                }
            }
        },
        open(activator) {
            this.attachContent();
            this.alignToElement(activator);
            this.activator = activator || null;
            setTimeout(() => {
                this.opened = true;
            }, 0);
        },
        close() {
            this.opened = false;
        },
        detachContent() {
            const el = this.$refs.content;
            el && el.parentNode.removeChild(el);
        },
        attachContent() {
            const el = this.$refs.content;
            el && !document.body.contains(el) && document.body.appendChild(el);
        },
        isInsideActivator(el) {
            let node = el;

            while (node.parentNode) {
                if (node[DATA_KEY]) {
                    if (node[DATA_KEY].popover === this) {
                        return true;
                    }
                }
                node = node.parentNode;
            }
            return false;
        },
        alignToElement(el, container_el, bias) {
            const content_el = this.$refs.content;
            if (el && content_el) {
                this.preview(() => {
                    const mr = 3;
                    const offset = Number(this.offset);
                    const viewport = this.getWindowSize();
                    const a_rect = el.getBoundingClientRect();
                    const c_rect = content_el.getBoundingClientRect();
                    const l_space = a_rect.left;
                    const r_space = viewport.width - a_rect.right;
                    let min_x = 0;
                    let min_y = 0;
                    let max_x = viewport.width - c_rect.width;
                    let max_y = viewport.height - c_rect.height;

                    let v_pos = true;

                    let x, y;

                    switch (this.position) {
                        case 'top':
                            x = (a_rect.left)
                            y = (a_rect.top - c_rect.height - offset);
                            v_pos = false;
                            break;
                        case 'bottom':
                            x = (a_rect.left)
                            y = (a_rect.bottom + offset);
                            v_pos = false;
                            break;
                        case 'left':
                            x = (a_rect.left - c_rect.width - offset);
                            y = (a_rect.top);
                            break;
                        case 'right':
                            x = (a_rect.left + a_rect.width + offset);
                            y = (a_rect.top);
                            break;
                        default:
                            if (l_space >= r_space) {
                                x = (a_rect.left - c_rect.width - offset);
                                y = (a_rect.top);
                            } else {
                                x = (a_rect.left + a_rect.width + offset);
                                y = (a_rect.top);
                            }
                    }

                    switch (this.align) {
                        case 'start':
                            v_pos && (y = a_rect.top);
                            !v_pos && (x = a_rect.left);
                            break;
                        case 'end':
                            v_pos && (y = a_rect.bottom - c_rect.height);
                            !v_pos && (x = a_rect.right - c_rect.width);
                            break;
                        default:
                            v_pos && (y = a_rect.top + a_rect.height / 2 - c_rect.height / 2);
                            !v_pos && (x = a_rect.left + a_rect.width / 2 - c_rect.width / 2);
                    }

                    if (container_el && container_el.contains(el)) {
                        const ct_rect = container_el.getBoundingClientRect();

                        min_y = Math.max(ct_rect.top - c_rect.height, min_y);
                        max_y = Math.min(ct_rect.bottom, max_y);
                    }

                    this.dimensions.x = clamp(Math.floor(x), min_x + mr, max_x - mr);
                    this.dimensions.y = clamp(Math.floor(y), min_y + mr, max_y - mr);
                });
            }
        },
        preview(callback) {
            const content_el = this.$refs.content;
            requestAnimationFrame(() => {
                const original = content_el.style.display;
                content_el.style.display = '';
                callback();
                content_el.style.display = original;
            });
        },
        bindWindowListeners() {
            window.addEventListener('mousedown', this.onWindowMousedown);
            window.addEventListener('scroll', this.onWindowScroll, true);
            window.addEventListener('resize', this.onWindowResize);
        },
        unbindWindowListeners() {
            window.removeEventListener('mousedown', this.onWindowMousedown);
            window.removeEventListener('scroll', this.onWindowScroll, true);
            window.removeEventListener('resize', this.onWindowResize);
        },
        getWindowSize() {
            return {
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            }
        },

        /* handlers */
        onWindowMousedown(event) {
            const el = this.$refs.content;
            if (el) {
                if (!(event.target === this.activator ||
                    el === event.target ||
                    el.contains(event.target) ||
                    this.isInsideActivator(event.target))) {
                    this.close();
                }
            }
        },
        onWindowScroll(event) {
            this.alignToElement(this.activator, event.target);
        },
        onWindowResize() {
            this.alignToElement(this.activator);
        },
        onActivatorClick(event) {
            this.open(event.currentTarget);
        },
    },
    created() {
        if (this.id_str) {
            if (INSTANCES[this.id_str]) {
                throw new Error(`Duplicated popover id = ${this.id_str}`);
            }
            INSTANCES[this.id_str] = this;
        }
    },
    mounted() {
        this.detachContent();
    },
    beforeDestroy() {
        this.unbindWindowListeners();

        const content_el = this.$refs.content;
        if (content_el && content_el.parentNode) {
            content_el.parentNode.removeChild(content_el);
        }
        if (this.id_str) {
            delete INSTANCES[this.id_str];
        }
    },
    watch: {
        opened(opened, old) {
            if (opened !== old) {
                if (opened) {
                    this.bindWindowListeners();
                } else {
                    this.unbindWindowListeners();
                }
            }
        },
        position() {
            this.alignToElement(this.activator);
        },
        align() {
            this.alignToElement(this.activator);
        },
        offset() {
            this.alignToElement(this.activator);
        },
    },
}
</script>

<style scoped>
.v-popover__content {
    position: fixed;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    background-color: inherit;

    padding: 15px;
    border-radius: 15px;
    border: 1px solid #525252;
}

.v-popover__content--transition {
    -webkit-transition: -webkit-transform .4s cubic-bezier(0.4, 0.0, 0.2, 1);
    transition: -webkit-transform .4s cubic-bezier(0.4, 0.0, 0.2, 1);
    -webkit-transition: transform .4s cubic-bezier(0.4, 0.0, 0.2, 1);
    transition: transform .4s cubic-bezier(0.4, 0.0, 0.2, 1);
}
</style>
