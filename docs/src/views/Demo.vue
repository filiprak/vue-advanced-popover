<template>
    <div>
        <div class="pa-5 mb-3">
            <div class="text-center">
                <div class="text-h6 text--primary">Position</div>
                <div class="text--disabled">Hover over buttons</div>
            </div>
            <v-row class="py-5">
                <v-col v-for="position in ['top', 'right', 'bottom', 'left']"
                       :key="position"
                       class="text-center"
                       cols="12"
                       sm="3">
                    <v-btn v-popover:hover="position" depressed color="primary" dark>{{ position }}</v-btn>
                    <v-popover :id="position" :position="position">
                        <div class="v-demo-popover">Popover</div>
                    </v-popover>
                </v-col>
            </v-row>
            <v-row class="pt-5">
                <v-col v-for="i in 4"
                       :key="i"
                       class="text-center"
                       cols="12"
                       sm="3">
                    <v-btn v-popover:hover="i" depressed color="grey lighten-2">auto</v-btn>
                    <v-popover :id="i" position="auto">
                        <div class="v-demo-popover">Popover</div>
                    </v-popover>
                </v-col>
            </v-row>
        </div>

        <div class="pa-5 mb-3">
            <div class="text-center">
                <div class="text-h6 text--primary">Align</div>
                <div class="text--disabled">Hover over buttons</div>
            </div>
            <v-row class="py-5">
                <v-col v-for="align in ['start', 'center', 'end']"
                       :key="align"
                       class="text-center"
                       cols="12"
                       sm="4">
                    <v-btn v-popover:hover="align" depressed color="primary" dark>{{ align }}</v-btn>
                    <v-popover :id="align" :align="align">
                        <div class="v-demo-popover">
                            Aligned<br>
                            Popover<br>
                            Content<br>
                        </div>
                    </v-popover>
                </v-col>
            </v-row>
            <v-row class="pt-5">
                <v-col v-for="align in ['start', 'center', 'end']"
                       :key="align"
                       class="text-center"
                       cols="12"
                       sm="4">
                    <v-btn v-popover:hover="align + ' bottom'" depressed color="grey lighten-2">{{ align }}</v-btn>
                    <v-popover :id="align + ' bottom'" :align="align" position="bottom">
                        <div class="v-demo-popover">
                            Aligned Popover Content
                        </div>
                    </v-popover>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import VPopover from '../../../src/components/VPopover';

export default {
    name: 'Demo',
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
    methods: {},
};
</script>

<style>
.v-demo-popover {
    padding: 15px;
    background: #ffffff;
}
</style>
