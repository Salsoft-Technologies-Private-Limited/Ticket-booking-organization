import React, { useState } from 'react';
import { Button, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
const QuantitySelector = ({ value, onChange }) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };
  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };
  return (
    <div className='quantity-wrapper'>
      <Button
        shape="circle"
        icon={<MinusOutlined />}
        onClick={handleDecrement}
        disabled={value === 1}
      />
      <InputNumber
        style={{ margin: '0 8px', width: '80px' }}
        value={value}
        onChange={onChange}
      />
      <Button shape="circle" icon={<PlusOutlined />} onClick={handleIncrement} />
    </div>
  );
};
export default QuantitySelector;