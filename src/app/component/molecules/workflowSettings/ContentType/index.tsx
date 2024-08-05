import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./index.module.scss";
import { Option, Select } from "@mui/joy";
import { InputProps } from "@/types/forms/input";
import { useEffect, useState } from "react";
import { contentTypeVaues, NotificationChannelsValues } from "@/types/workflow";

interface SelectContentTypeProps extends InputProps {
  title: string;
  description: string;
  handleChange: (e: any) => void;
}
export const SelectContentType: React.FC<SelectContentTypeProps> = ({
  title,
  description,
  value,
  handleChange,
}) => {
  const [contentType, setContentType] = useState("");
  const handleSelectChange = (e: any, newValue: any) => {
    setContentType(newValue);
    handleChange(newValue);
  };

  useEffect(() => {
    setContentType(value);
  }, [value]);
  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      <Select
        placeholder={"choose your content type"}
        className={styles["SelectWrapper"]}
        value={contentType}
        onChange={handleSelectChange}
      >
        {contentTypeVaues.map((type, index) => (
          <Option key={index} value={type}>
            {type}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export const SelectNotificationChannel: React.FC<SelectContentTypeProps> = ({
  title,
  description,
  value,
  handleChange,
}) => {
  const [channel, setChannel] = useState("");
  const handleSelectChange = (e: any, newValue: any) => {
    setChannel(newValue);
    handleChange(newValue);
  };

  useEffect(() => {
    setChannel(value);
  }, [value]);
  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      <Select
        placeholder={"choose your content type"}
        className={styles["SelectWrapper"]}
        value={channel}
        onChange={handleSelectChange}
      >
        {NotificationChannelsValues.map((type, index) => (
          <Option key={index} value={type}>
            {type}
          </Option>
        ))}
      </Select>
    </div>
  );
};
