
const MORE_THAN = 150;
const LESS_THAN = 300;


const elipsisText = ({
  value,
  maxLength = MORE_THAN,
  amountTextToCut = LESS_THAN,
}: {
  value: string;
  maxLength?: number;
  amountTextToCut?: number;
}) =>{
  if (!value) return "";
  return value && value?.length > maxLength
    ? `${value.slice(0, amountTextToCut)}...`
    : value;
}
export { elipsisText };
