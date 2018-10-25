import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HelloPatient from '@/components/HelloPatient.vue';

describe('HelloPatient.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloPatient, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
