import TipTap from './TipTap.vue';

export default {
  title: 'TipTap',
  component: TipTap,
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
    TipTap,
  },

  setup() {
    const text = `
      <p>I want to use onMounted to initiate third-party library. To do that I need the component element as its context. In Vue 2 I would get it with this.$el but not sure how to do it with composition functions. setup has two arguments and none of them contains the element.</p>
    `
    return { args, text };
  },
  template: `
    <TipTap model-type="posts" :model-value="text" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  variant:  'default',
};
