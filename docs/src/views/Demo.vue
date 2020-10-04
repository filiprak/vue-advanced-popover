<template>
    <div>
        <div class="pa-5 mb-3">
            <div>
                <div class="text-h6 text--primary">Position</div>
                <v-divider/>
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
            <div>
                <div class="text-h6 text--primary">Align</div>
                <v-divider/>
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

        <div class="pa-5 mb-3">
            <div>
                <div class="text-h6 text--primary">Dynamic content</div>
                <v-divider/>
                <div class="text--disabled">
                    Click to open popover, enter some text to see popover has reactive content
                </div>
            </div>
            <v-row class="py-5">
                <v-col sm="12" class="text-center">
                    <v-btn v-popover:click="'dynamic'" depressed color="primary" dark>Click to open</v-btn>
                    <v-popover id="dynamic" max_width="200">
                        <div class="v-demo-popover">
                            <v-text-field solo hide-details type="text"
                                          autocomplete="off"
                                          v-model="text"
                                          label="Enter text"/>
                            <v-row>
                                <v-col v-if="text">You typed: {{ text }}</v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn>Submit</v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </v-popover>
                </v-col>
            </v-row>
        </div>

        <div class="pa-5 mb-3">
            <div>
                <div class="text-h6 text--primary">Nested popovers</div>
                <v-divider/>
                <div class="text--disabled">Click to open popover and once more to open nested popover</div>
            </div>
            <v-row class="py-5">
                <v-col sm="12" class="text-center">
                    <v-btn v-popover:click="'outer'" depressed color="primary" dark>Click to open</v-btn>
                    <v-popover id="outer">
                        <div class="v-demo-popover">
                            Popover<br>
                            Content<br>
                            <v-btn v-popover:click="'nested'">
                                Open nested
                            </v-btn>
                            <v-popover id="nested">
                                <div class="v-demo-popover">
                                    Nested<br>
                                    Popover<br>
                                    Content<br>
                                </div>
                            </v-popover>
                        </div>
                    </v-popover>
                </v-col>
            </v-row>
        </div>

        <div class="pa-5 mb-3">
            <div>
                <div class="text-h6 text--primary">Floating context</div>
                <v-divider/>
                <div class="text--disabled">Click to open single popover instance in choosen context</div>
            </div>
            <v-row class="py-5">
                <v-col v-for="context in [
                    'Context 1', 'Context 2', 'Context 3', 'Context 4', 'Context 5', 'Context 6',
                    ]"
                       :key="context"
                       class="text-center"
                       cols="12"
                       sm="4">
                    <v-btn v-popover:click="{id: 'context', data: context}" depressed color="grey lighten-2">
                        {{ context }}
                    </v-btn>
                </v-col>
                <v-popover id="context">
                    <template #content="{data}">
                        <div class="v-demo-popover">
                            <div>Popover Content</div>
                            <div>{{ data }}</div>
                        </div>
                    </template>
                </v-popover>
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
            text: '',
        };
    },
    methods: {},
};
</script>

<style>
.v-demo-popover {
    position: relative;
    padding: 15px;
    background: #ffffff;
}
</style>
