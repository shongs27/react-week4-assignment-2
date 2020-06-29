import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import FormContainer from './FormContainer';

jest.mock('react-redux');

describe('<FormContainer />', () => {
  it('식당이름 분류 주소 랜더링', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      name: '바른 치킨',
      category: '치킨',
      address: '시립대로',
    }));

    const { getByText, getByPlaceholderText } = render((
      <FormContainer />
    ));

    expect(getByText(/등록/)).toBeInTheDocument();
    expect(getByPlaceholderText(/식당/)).toHaveValue('바른 치킨');
    expect(getByPlaceholderText(/분류/)).toHaveValue('치킨');
    expect(getByPlaceholderText(/주소/)).toHaveValue('시립대로');
  });

  context('handleChang 테스트', () => {
    const dispatch = jest.fn();
    function mockImplementation() {
      useDispatch.mockImplementation(() => dispatch);
      useSelector.mockImplementation((selector) => selector({
        name: '',
        category: '',
        address: '',
      }));
    }

    it('식당이름 업데이트', () => {
      mockImplementation();
      const { getByPlaceholderText } = render((
        <FormContainer />
      ));
      fireEvent.change(getByPlaceholderText(/식당/), {
        target:
          { value: '바른 치킨' },
      });
      expect(dispatch).toBeCalledWith({
        type: 'updateName',
        payload: { name: '바른 치킨' },
      });
    });

    it('분류 업데이트', () => {
      mockImplementation();
      const { getByPlaceholderText } = render((
        <FormContainer />
      ));

      fireEvent.change(getByPlaceholderText(/분류/), {
        target:
          { value: '치킨' },
      });
      expect(dispatch).toBeCalledWith({
        type: 'updateCategory',
        payload: { category: '치킨' },
      });
    });

    it('주소 업데이트', () => {
      mockImplementation();
      const { getByPlaceholderText } = render((
        <FormContainer />
      ));

      fireEvent.change(getByPlaceholderText(/주소/), {
        target:
          { value: '시립대로' },
      });
      expect(dispatch).toBeCalledWith({
        type: 'updateAddress',
        payload: { address: '시립대로' },
      });
    });
  });

  context('입력값 있을 때', () => {
    it('식당 추가', () => {
      const dispatch = jest.fn();
      useDispatch.mockImplementation(() => dispatch);
      useSelector.mockImplementation((selector) => selector({
        name: '바른 치킨',
        category: '치킨',
        address: '시립대로',
      }));
      const { getByText } = render((
        <FormContainer />
      ));

      fireEvent.submit(getByText(/등록/));
      expect(dispatch).toBeCalledWith({
        type: 'addRestaurant',
      });
    });
  });
});