import { Input } from "reactstrap";

export default function Level({
  name,
  cmbText,
  invalid,
  valueDefault,
  records,
  onChange,
}) {

  return (
    <Input
      id={name}
      name={name}
      type="select"
      invalid={invalid}
      value={valueDefault}
      onChange={(e) => {
        onChange(e);
      }}
    >
      <option value="">{cmbText}</option>
      {records.map((record, i) => {
        return (
          <option key={i} value={record.name}>
            {record.description}
          </option>
        );
      })}
    </Input>
  );
}
