<script>
import {DATA_KEY} from '../directives/VPopover';
import {INSTANCES} from '../directives/VPopover';

const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

export default {
    name: 'VPopover',
    render(h) {
        return h('div', {staticClass: 'v-popover__mount'}, [this.renderContent(h)]);
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
        enter_transition_offset: {
            type: [String, Number],
            default: 10,
        },
        min_width: {
            type: [String, Number],
            default: null,
        },
        max_width: {
            type: [String, Number],
            default: null,
        },
        min_height: {
            type: [String, Number],
            default: null,
        },
        max_height: {
            type: [String, Number],
            default: null,
        },
        transition: {
            type: Boolean,
            default: true,
        },
        no_shadow: {
            type: Boolean,
            default: false,
        },
        rectangle: {
            type: Boolean,
            default: false,
        },
        close_delay: {
            type: [String, Number],
            default: 400,
        },
    },
    computed: {
        id_str() {
            return this.id ? String(this.id) : null;
        },
        activator_data() {
            if (this.activator && this.activator[DATA_KEY]) {
                return this.activator[DATA_KEY].data;
            } else {
                return null;
            }
        },
    },
    data() {
        return {
            dimensions: {
                x: 0,
                y: 0,
            },
            visible: false,
            activator: null,
            z_index: 9,
            opacity: 0,
        };
    },
    methods: {
        renderContent(h) {
            const children = [];

            if (this.$scopedSlots.content) {
                children.push(this.$scopedSlots.content({
                    popover: this,
                    open: this.open,
                    close: this.close,
                    recalculate: this.recalculate,
                    data: this.activator_data,
                }));
            } else if (this.$slots.content) {
                children.push(this.$slots.content);
            }

            children.push(this.$slots.default);

            return h('div', {
                ref: 'content',
                class: {
                    'v-popover': true,
                    'v-popover--transition': this.transition,
                    'v-popover--no-shadow': this.no_shadow,
                    'v-popover--rect': this.rectangle,
                },
                style: {
                    zIndex: this.z_index,
                    minHeight: this.min_height ? Number(this.min_height) + 'px' : null,
                    maxHeight: this.max_height ? Number(this.max_height) + 'px' : null,
                    minWidth: this.min_width ? Number(this.min_width) + 'px' : null,
                    maxWidth: this.max_width ? Number(this.max_width) + 'px' : null,
                    display: this.visible ? null : 'none',
                    opacity: this.opacity,
                    transform: 'translate(' + this.dimensions.x + 'px, ' + this.dimensions.y + 'px)',
                },
            }, children);
        },
        bind(el, event) {
            if (el) {
                if (event === 'hover') {
                    el.addEventListener('mouseenter', this.onActivatorMouseEnter);
                    el.addEventListener('mouseleave', this.onActivatorMouseLeave);
                } else {
                    el.addEventListener('click', this.onActivatorClick);
                }
            }
        },
        unbind(el) {
            if (el) {
                el.removeEventListener('click', this.onActivatorClick);
                el.removeEventListener('mouseenter', this.onActivatorMouseEnter);
                el.removeEventListener('mouseleave', this.onActivatorMouseLeave);
                if (el === this.activator) {
                    this.close();
                }
            }
        },
        open(activator) {
            this.activator = activator || this.activator || null;
            this.alignToElement(activator, null, true);
            this.attachContent();

            const content_el = this.$refs.content;

            if (activator && content_el) {
                const data = activator[DATA_KEY];
                if (data.event === 'hover') {
                    content_el.addEventListener('mouseenter', this.onContentMouseEnter);
                    content_el.addEventListener('mouseleave', this.onContentMouseLeave);
                }
            }
        },
        close() {
            this.visible = false;
            this.opacity = 0;
            this.activator = null;

            const content_el = this.$refs.content;

            if (content_el) {
                content_el.removeEventListener('mouseenter', this.onContentMouseEnter);
                content_el.removeEventListener('mouseleave', this.onContentMouseLeave);
            }
        },
        recalculate() {
            this.alignToElement(this.activator);
        },
        detachContent() {
            const el = this.$refs.content;
            el && el.parentNode.removeChild(el);
        },
        attachContent() {
            const el = this.$refs.content;
            if (el && !document.body.contains(el)) {
                el.childNodes.length > 0 && document.body.appendChild(el);
            }
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
        alignToElement(el, container_el, open) {
            const content_el = this.$refs.content;
            if (el && content_el) {
                this.preview(() => {
                    const mr = 3;
                    const offset = Number(this.offset);
                    const s_offset = Number(this.enter_transition_offset);
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

                    let x, y, enter_x, enter_y;

                    switch (this.position) {
                        case 'top':
                            x = (a_rect.left);
                            y = (a_rect.top - c_rect.height - offset);
                            v_pos = false;
                            break;
                        case 'bottom':
                            x = (a_rect.left);
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

                        const out_container = (a_rect.top > ct_rect.bottom || a_rect.bottom < ct_rect.top);
                        const out_viewport = (
                            a_rect.bottom < 0 || a_rect.top > viewport.height ||
                            a_rect.right < 0 || a_rect.left > viewport.width
                        );

                        if (out_container || out_viewport) {
                            this.visible && this.close();
                        }
                    }

                    switch (this.position) {
                        case 'top':
                            enter_x = x;
                            enter_y = y + s_offset;
                            break;
                        case 'bottom':
                            enter_x = x;
                            enter_y = y - s_offset;
                            break;
                        case 'left':
                            enter_x = x + s_offset;
                            enter_y = y;
                            break;
                        case 'right':
                            enter_x = x - s_offset;
                            enter_y = y;
                            break;
                        default:
                            if (l_space >= r_space) {
                                enter_x = x + s_offset;
                                enter_y = y;
                            } else {
                                enter_x = x - s_offset;
                                enter_y = y;
                            }
                    }

                    x = clamp(Math.floor(x), min_x + mr, max_x - mr);
                    y = clamp(Math.floor(y), min_y + mr, max_y - mr);
                    enter_x = clamp(Math.floor(enter_x), min_x + mr, max_x - mr);
                    enter_y = clamp(Math.floor(enter_y), min_y + mr, max_y - mr);

                    if (open) {
                        requestAnimationFrame(() => {
                            if (this.transition) {
                                this.dimensions.x = enter_x;
                                this.dimensions.y = enter_y;
                            }
                            this.visible = true;

                            requestAnimationFrame(() => {
                                this.dimensions.x = x;
                                this.dimensions.y = y;
                                this.opacity = 1;
                            });
                        });
                    } else {
                        this.dimensions.x = x;
                        this.dimensions.y = y;
                    }
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
            };
        },
        scheduleClose() {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(() => {
                this.close();
            }, this.close_delay);
        },
        unscheduleClose() {
            clearTimeout(this._timeout);
            this._timeout = null;
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
            const el = event.target === document ? document.documentElement : event.target;
            this.alignToElement(this.activator, el);
        },
        onWindowResize() {
            this.alignToElement(this.activator);
        },
        onActivatorClick(event) {
            this.open(event.currentTarget);
        },
        onActivatorMouseEnter(event) {
            this.unscheduleClose();
            this.open(event.currentTarget);
        },
        onActivatorMouseLeave(event) {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(() => {
                this.close();
            }, this.close_delay);
        },
        onContentMouseEnter() {
            this.unscheduleClose();
        },
        onContentMouseLeave() {
            this.scheduleClose();
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
        visible(visible, old) {
            if (visible !== old) {
                if (visible) {
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
};
</script>

<style scoped>
.v-popover__mount {
    display: none;
}

.v-popover {
    max-height: 100%;
    max-width: 100%;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    background-color: inherit;

    border-radius: 15px;
    opacity: 0;

    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
}

.v-popover--no-shadow {
    box-shadow: none;
}

.v-popover--rect {
    border-radius: 0;
}

.v-popover--transition {
    -webkit-transition: -webkit-transform .4s cubic-bezier(0.4, 0.0, 0.2, 1), opacity .2s cubic-bezier(0.4, 0.0, 0.2, 1);
    transition: -webkit-transform .4s cubic-bezier(0.4, 0.0, 0.2, 1), opacity .2s cubic-bezier(0.4, 0.0, 0.2, 1);
    -webkit-transition: transform .4s cubic-bezier(0.4, 0.0, 0.2, 1), opacity .2s cubic-bezier(0.4, 0.0, 0.2, 1);
    transition: transform .4s cubic-bezier(0.4, 0.0, 0.2, 1), opacity .2s cubic-bezier(0.4, 0.0, 0.2, 1);
}
</style>
