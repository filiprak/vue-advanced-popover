<template>
    <div class="container">

        <div class="list">
            <div v-for="i in 30" class="item" v-popover-activator="0">
                Item {{ i }}
            </div>
        </div>

        <div class="list"/>

        <div class="list">
            <div v-for="i in 30" class="item" v-popover-activator="0">
                Item {{ i }}
            </div>
        </div>

        <div class="list">
            <div class="item" v-popover-activator="-1">static Item</div>
            <div>
                <label for="add">Add item</label>
                <input id="add" type="checkbox" v-model="add">
            </div>
            <div class="item" v-popover-activator="-1" v-if="add">static Item</div>
            <div>
                <label for="trans">Enable transition</label>
                <input id="trans" type="checkbox" v-model="transition">
            </div>
            <div>
                <label for="render">Render popover</label>
                <input id="render" type="checkbox" v-model="popover">
            </div>
            <div>
                <label for="pos">Position</label>
                <select id="pos" v-model="position">
                    <option v-for="pos in positions" :value="pos">{{ pos }}</option>
                </select>
            </div>
            <div>
                <label for="align">Align</label>
                <select id="align" v-model="align">
                    <option v-for="al in aligns" :value="al">{{ al }}</option>
                </select>
            </div>
            <div>
                <label for="offset">Offset</label>
                <input type="number" id="offset" v-model="offset"/>
            </div>
        </div>

        <v-popover id="0"
                   v-if="popover"
                   :transition="transition"
                   :align="align"
                   :offset="offset"
                   :position="position">
            <div>
                this is popover 0 <b>content</b><br>
                this is test content<br>
                <input type="number" min="0" v-model="num"/>
                <input type="checkbox" v-model="add"><br>

                <div>
                    <label for="pos0">Position</label>
                    <select id="pos0" v-model="position">
                        <option v-for="pos in positions" :value="pos">{{ pos }}</option>
                    </select>
                </div>
                <div>
                    <label for="align0">Align</label>
                    <select id="align0" v-model="align">
                        <option v-for="al in aligns" :value="al">{{ al }}</option>
                    </select>
                </div>
                <div>
                    <label for="offset1">Offset</label>
                    <input type="number" id="offset1" v-model="offset"/>
                </div>
                <div class="item" v-for="i in Number(num)" v-popover-activator="-1">
                    Nested item {{ i }}
                </div>
            </div>
        </v-popover>

        <v-popover id="-1"
                   v-if="popover"
                   :transition="transition"
                   :align="align"
                   :offset="offset"
                   :position="position">
            <div>
                this is popover 1 <b>content</b><br>
                this is test content<br>
                <input type="text"/>
                <input type="checkbox" v-model="add"><br>
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
            popover: true,
            position: 'auto',
            align: 'center',
            transition: true,
            offset: 5,

            positions: ['auto', 'top', 'bottom', 'left', 'right'],
            aligns: ['start', 'center', 'end'],
            num: 2,
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
    display: flex;
}

.list {
    height: 50%;
    overflow: auto;
    width: 25%;
}

.item {
    cursor: pointer;
    padding: 15px;
    border: 1px solid #444;
    margin-bottom: 5px;
}

.item:hover {
    opacity: 0.5;
}
</style>
