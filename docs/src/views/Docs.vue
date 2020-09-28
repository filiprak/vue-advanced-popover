<template>
    <div>
        Available soon...
    </div>
</template>

<script>
import VPopover from '../../../src/components/VPopover';

export default {
    name: 'Docs',
    components: {VPopover},
    data() {
        return {
            position: 'auto',
            align: 'center',
            event: 'click',
            transition: true,
            offset: 5,

            positions: ['auto', 'top', 'bottom', 'left', 'right'],
            aligns: ['start', 'center', 'end'],
            events: ['click', 'hover'],
            num: 2,
        };
    },
    methods: {}
}
</script>

<style>

</style>
