import React, { FC } from "react";
import { Select } from "antd";

const { Option } = Select;

interface TagSelectProps {
  placeholder: string;
  options: any[];
  onChange: (value: number[]) => void;
  defaultValue?: number[];
  multipleSelect?: boolean;
  loading?: boolean;
}

const TagSelect: FC<TagSelectProps> = ({
  placeholder,
  onChange,
  options,
  defaultValue = [],
  multipleSelect = true,
  loading = false,
}) => {
  const handleChange = (value: any) => {
    onChange(value);
  };
  return (
    <Select
      mode={multipleSelect ? "tags" : undefined}
      style={{ width: "100%", margin: "10px 0px" }}
      placeholder={placeholder}
      onChange={handleChange}
      defaultValue={defaultValue}
      loading={loading}
    >
      {options.map(({ id, name, color }) => (
        <Option
          key={`${id}-${name}`}
          value={id.toString()}
          style={{ color: `#${color}` }}
        >
          {name}
        </Option>
      ))}
    </Select>
  );
};

export default TagSelect;
