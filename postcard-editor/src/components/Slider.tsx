import 'toolcool-range-slider';
import React,{ useRef, useEffect } from 'react';

type SliderProps = {
    value: string,
    callback: Function
}

const Slider = (props: SliderProps) => {
  const ref = useRef<HTMLElement | null >(null);
  const { value, callback } = props;
  useEffect(() => {
      const slider = ref.current;
    if (slider) {
      
        const onChange = (evt: Event) => {
          const customEvent = evt as CustomEvent;
          const value = Math.round(customEvent.detail.value);
          callback(value / 100);
        };

        slider.addEventListener('change', onChange);

        return () => {
          slider.removeEventListener('change', onChange);
        };
      } 
  }, [ref]);
  
  return (
    <toolcool-range-slider value={value} ref={ref} />
  )
};

export default Slider