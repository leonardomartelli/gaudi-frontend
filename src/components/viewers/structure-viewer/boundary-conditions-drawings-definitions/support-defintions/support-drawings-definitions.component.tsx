import { FixedSupportDrawingDefinition } from "./fixed-support-drawing-defintion.component";
import { MobileSupportDrawingDefinition } from "./mobile-support-drawing-definition.component";

export function SupportDrawingsDefinitions() {
  return (
    <div>
      <MobileSupportDrawingDefinition
        id="mobile_support"
        transform="scale(2.5) rotate(90)"
      />

      <MobileSupportDrawingDefinition
        id="inverted_mobile_support"
        transform="scale(2.5) rotate(-90)"
      />

      <FixedSupportDrawingDefinition
        id="fixed_support"
        transform="scale(2.5) rotate(90)"
      />

      <FixedSupportDrawingDefinition
        id="inverted_fixed_support"
        transform="scale(2.5) rotate(-90)"
      />
    </div>
  );
}
