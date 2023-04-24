import Textarea from './Textarea.vue';

export default {
  title: 'Textarea',
  component: Textarea,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: { type: 'radio' },
      options: ['text', 'date'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'danger', 'success'],
    },
  },
};

const Template = (args) => ({
  components: {
    Textarea,
  },
  setup() {
    return { args };
  },
  template: `
    <Textarea model-value="I want to use onMounted to initiate third-party library. To do that I need the component element as its context. In Vue 2 I would get it with this.$el but not sure how to do it with composition functions. setup has two arguments and none of them contains the element." />
  `,
});

export const Default = Template.bind({});
Default.args = {
  variant:  'default',
};
