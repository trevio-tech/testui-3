import InputTags from './InputTags.vue'
import { ref } from 'vue'

export default {
  title: 'InputTags',
  component: InputTags,
};
const Template = (args) => ({
  components: {
    InputTags
  },
  setup() {
    const tags = ref([])

    return { args, tags };
  },
  template: `
    <InputTags v-model="tags" v-bind="args"></InputTags>
  `,
});

export const Default = Template.bind({});
