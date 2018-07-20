import {expect} from 'chai';
import {beforeEach, describe, it} from 'mocha';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UserHome} from '../components';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('UserHome', () => {
  let userHome;

  beforeEach(() => {
    userHome = shallow(<UserHome email="raj@email.com" />);
  });

});
