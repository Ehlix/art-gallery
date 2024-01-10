import * as Slider from '@radix-ui/react-slider';

interface Props {
  label?: string;
  value: number;
  min: number;
  max: number;
  defaultValue: number;

  onChange(value: number): void;
}

export const AppSlider = ({
                            label,
                            value,
                            defaultValue,
                            max,
                            min,
                            onChange,
                          }: Props) => {
  const handleChange = (value: number | number[]) => {
    onChange(value as number);
  };
  return (
    <div>
      <p>
        {label}
      </p>
      <div className="">
        <form>
          <Slider.Root
            className="relative flex h-5 w-full touch-none select-none items-center"
            defaultValue={[defaultValue]}
            min={min}
            max={max}
            onValueChange={handleChange}
            value={[value]}
            step={0.03}
          >
            <Slider.Track className="relative grow rounded-full bg-t-hover-2/10 h-[3px]">
              <Slider.Range className="absolute h-full rounded-full bg-grad-1"/>
            </Slider.Track>
            <Slider.Thumb
              className="block h-5 w-5 rounded-lg bg-grad-1 shadow-[0_2px_10px] shadow-t-hover-3 hover:bg-t-hover-3 focus:shadow-[0_0_0_5px] focus:shadow-t-hover-3/30 focus:outline-none"
            />
          </Slider.Root>
        </form>
      </div>
    </div>
  );
};