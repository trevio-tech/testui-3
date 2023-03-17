import SearchPlace from './SearchPlace.vue';
import { ref } from 'vue'

export default {
  title: 'modules/common/places/search-place',
  component: SearchPlace,
};

const Template = (args) => ({
  components: {
    SearchPlace
  },
  setup() {
    const searchBy = ['countries'];
    const result = ref('')

    return {
      args,
      result,
      searchBy,
    };
  },
  template: `
    <SearchPlace
        clear-after-select
      v-model="result"
      v-bind="args" />
    {{ result }}
  `,
});

export const Default = Template.bind({});