import React from 'react';
import { Image } from 'react-native';

const LogoComponent = () => (
  <Image
    source={{uri: 'https://www.mebamarketing.com/wp-content/uploads/2023/08/WEB-2-05-1.png'}}
    style={{ width: 90, height: 30 }} // Adjust dimensions as needed
  />
);

export default LogoComponent;
