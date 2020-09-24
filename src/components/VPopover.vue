<script>

const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

export default {
    name: 'VPopover',
    render(h) {
        return h('div', {staticClass: 'ik-popover'}, [
            this.renderContent(h)
        ]);
    },
    data() {
        return {
            x: 0,
            y: 0,
            opened: false,
            activator: null,
        };
    },
    methods: {
        renderContent(h) {
            return h('div', {
                ref: 'content',
                staticClass: 'v-popover__content',
                style: {
                    display: this.opened ? null : 'none',
                    left: this.x + 'px',
                    top: this.y + 'px',
                },
            }, this.$slots.default);
        },
        open(activator) {
            this.attachContent();
            this.alignToElement(activator);
            this.activator = activator || null;
            this.opened = true;
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
        onWindowMousedown(event) {
            const el = this.$refs.content;
            if (el) {
                if (!(event.target === this.activator || el === event.target || el.contains(event.target))) {
                    this.close();
                }
            }
        },
        onWindowWheel() {
            this.alignToElement(this.activator);
        },
        alignToElement(el) {
            if (el) {
                const rect = el.getBoundingClientRect();
                const rect_c = this.$refs.content.getBoundingClientRect();
                this.x = clamp(Math.floor(rect.left + rect.width), 0, window.innerWidth);
                this.y = clamp(Math.floor(rect.top), 0, window.innerHeight - rect_c.height);
            }
        },
    },
    created() {
        window.p = this;

    },
    mounted() {
        this.detachContent();
    },
    watch: {
        opened(opened) {
            if (opened) {
                window.addEventListener('mousedown', this.onWindowMousedown);
                window.addEventListener('scroll', this.onWindowWheel, true);
            } else {
                window.removeEventListener('mousedown', this.onWindowMousedown);
                window.removeEventListener('scroll', this.onWindowWheel, true);
            }
        },
    },
}
</script>

<style scoped>
.v-popover__content {
    position: fixed;
    top: 0;
    left: 0;
    background-color: inherit;

    padding: 15px;
    border-radius: 15px;
    border: 1px solid #ddd;
}
</style>
