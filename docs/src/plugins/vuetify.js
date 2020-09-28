import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: colors.teal.lighten2,
                secondary: colors.grey.lighten2,
                accent: colors.orange.lighten2,
            },
        },
    },
};

export default new Vuetify(opts);
