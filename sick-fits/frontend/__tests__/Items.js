import ItemComponent from '../components/Item';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
  id: 'ABCD123',
  title: 'Cool Item',
  price: 5000,
  description: 'This item is really cool',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
}

describe('<Item/>', () => {
  it('renders and match the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});