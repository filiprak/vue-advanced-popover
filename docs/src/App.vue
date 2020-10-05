<template>
    <v-app>
        <v-app-bar
            app
            color="white"
            flat>

            <v-tabs
                centered
                class="ml-n9"
                color="primary">
                <v-tab to="/">Demo</v-tab>
                <v-tab to="/docs">Docs</v-tab>
                <v-tab to="/playground">Playground</v-tab>
            </v-tabs>

            <v-avatar
                class="hidden-sm-and-down"
                color="grey darken-1 shrink"
                size="32"/>
        </v-app-bar>

        <v-main class="grey lighten-3">
            <v-container>
                <div class="text-center py-5">
                    <div class="text-h4">vue-advanced-popover</div>
                    <div class="text--disabled">Vue.js advanced popover component</div>
                    <div class="text--disabled text-caption">
                        Made with <span style="color: #e25555; font-size: 20px">&#9829;</span> by {{ author }}
                    </div>
                </div>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {version, author} from '../../package.json';

export default {
    name: 'App',
    data() {
        return {
            version: version,
            author: author,
        };
    },
};
</script>

<style>
body, html {
    font-family: "Roboto", sans-serif;
    line-height: 1.5;
}
</style>
