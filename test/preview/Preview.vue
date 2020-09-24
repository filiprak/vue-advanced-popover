<template>
    <div class="container">
        <div class="list">
            <div v-for="i in 30" class="item" v-popover-activator="'popover'">
                Item {{i}}
            </div>
        </div>
        <div class="list">
            <div class="item" v-popover-activator="'popover'">static Item</div>
            <input type="checkbox" v-model="add">
            <div v-if="add" class="item" v-popover-activator.open="'popover'">dynamic add</div>
        </div>
        <v-popover ref="popover">
            <div>
                this is popover <b>content</b>
                <input type="text"/>
                <input type="checkbox" v-model="add">
            </div>
        </v-popover>
    </div>
</template>

<script>
import VPopover from '../../src/components/VPopover';

export default {
    name: 'Preview',
    components: {VPopover},
    data() {
        return {
            add: false,
        };
    },
    methods: {}
}
</script>

<style>
body, html, .container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #121212;
    color: #ddd;
}

.container {
    padding: 20px;
}

.list {
    height: 50%;
    overflow: auto;
    width: 25%;
}

.item {
    padding: 15px;
    border: 1px solid #444;
    margin-bottom: 5px;
}
</style>
