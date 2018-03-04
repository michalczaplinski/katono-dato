import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ItemCard from '../../src/components/ItemCard';

storiesOf('ItemCard', module)
  .add('with text', () => (
    <ItemCard onClick={action('clicked')}>Hello ItemCard</ItemCard>
  ))
  .add('with some emoji', () => (
    <ItemCard onClick={action('clicked')}>😀 😎 👍 💯</ItemCard>
  ));