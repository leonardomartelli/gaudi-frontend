import RangeSlider from "react-bootstrap-range-slider";

export function CommonSlider(props: {
  value: number;
  setValue(val: number): void;
}) {
  return (
    <div>
      <RangeSlider
        value={props.value}
        onChange={(changeEvent) =>
          props.setValue(Number(changeEvent.target.value))
        }
      />
    </div>
  );
}
