import { ChangeEvent, forwardRef } from 'react';

interface MaskInputProps {
  mask: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

const MaskInput = forwardRef<HTMLInputElement, MaskInputProps>(
  (
    { mask, value, onChange, className, placeholder, ...rest }: MaskInputProps,
    ref
  ) => {
    // const [inputValue, setInputValue] = useState(value);

    // Function to format the input based on the mask
    const applyMask = (rawValue: string) => {
      const onlyNumbers = rawValue.replace(/\D/g, ''); // Remove non-numeric characters
      let formattedValue = '';
      let index = 0;

      for (const char of mask) {
        if (index >= onlyNumbers.length) break;

        if (char === '9') {
          // Mask requires a digit
          formattedValue += onlyNumbers[index];
          index++;
        } else {
          // Add static characters (e.g., "-", "(", ")")
          formattedValue += char;
        }
      }

      return formattedValue;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const maskedValue = applyMask(e.target.value);
      onChange({ ...e, target: { ...e.target, value: maskedValue } });
    };

    return (
      <input
        ref={ref}
        className={className}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder || mask.replace(/9/g, '_')}
        {...rest}
      />
    );
  }
);

export default MaskInput;
