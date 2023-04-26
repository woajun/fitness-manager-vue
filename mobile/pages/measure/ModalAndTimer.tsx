import React, { } from 'react';
import {
  Modal,
} from 'react-native';
import ExcerLayout from './timer/ExerLayout';

export default function ModalAndTimer() {
  console.log('bbb');
  return (
    <>
      <ExcerLayout />
      <Modal visible={false} />
    </>
  );
}
