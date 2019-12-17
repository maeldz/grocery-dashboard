import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

export default function Animation({ width, height, animation }) {
  return (
    <Lottie
      isClickToPauseDisabled
      options={{
        loop: true,
        autoplay: true,
        animationData: animation.default,
      }}
      height={height}
      width={width}
      style={{ cursor: 'default' }}
    />
  );
}

Animation.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  animation: PropTypes.shape().isRequired,
};
