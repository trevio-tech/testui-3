import Upload from './Upload.vue'

export default {
  title: 'Upload',
}

const Template = (args) => ({
  components: {
    Upload
  },
  setup() {
    return {
      args
    }
  },
  template: `<Upload v-bind="args" :fields="['id']" model-type="posts" />`,
});

export const Default = Template.bind({});
