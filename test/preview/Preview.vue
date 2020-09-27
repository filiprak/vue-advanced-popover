<template>
    <div class="container">

        <div class="list">
            <div v-for="i in 30" class="item" v-popover-activator:[event]="{id: 0, data: i}">
                Item {{ i }}
            </div>
        </div>

        <div class="list"/>

        <div class="list">
            <div v-for="i in 30" class="item" v-popover-activator:[event]="0">
                Item {{ i }}
            </div>
        </div>

        <div class="list">
            <div class="item" v-popover-activator:[event]="{id: -1}">static Item</div>
            <div>
                <label for="add">Add item</label>
                <input id="add" type="checkbox" v-model="add">
            </div>
            <div class="item" v-popover-activator:[event]="-1" v-if="add">static Item</div>
            <div>
                <label for="evt">Event type</label>
                <select id="evt" v-model="event">
                    <option v-for="evt in events" :value="evt">{{ evt }}</option>
                </select>
            </div>
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
            <template #content="{open, close, recalculate, popover, data}">
                <h4>
                    Item {{ data }}
                    <button @click="recalculate()">&bot;</button>
                    <button @click="close()">&times;</button>
                </h4>
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
                <div class="item" v-for="i in Number(num)">
                    Nested item {{ i }}
                </div>
            </template>
        </v-popover>

        <v-popover id="-1"
                   v-if="popover"
                   :transition="transition"
                   :align="align"
                   :offset="offset"
                   :position="position">
            <template #content="data">
                this is popover 1 <b>content</b><br>
                this is test content<br>
                <input type="text"/>
                <input type="checkbox" v-model="add"><br>
            </template>
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
body, html {
    width: 200vw;
    height: 200vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #ffffff;
}

.container {
    padding: 20px;
    width: 150vw;
    height: 150vh;
    display: flex;
    align-items: flex-end;
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
