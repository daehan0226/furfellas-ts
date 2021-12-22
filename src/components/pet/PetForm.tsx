import React, { useEffect, useState } from 'react';
import { Pet as IPet } from "../../models"
import moment from 'moment';
import {
    Form,
    Input,
    Radio,
    DatePicker,
    InputNumber,
    Select,
    Avatar,
} from 'antd';


interface PetFormProps {
    data: IPet,
    setFormValues: (data: IPet) => void
}

const PetForm: React.FC<PetFormProps> = ({ data, setFormValues }) => {
    const [form] = Form.useForm();
    const [photoOptions, setPhotoOptions] = useState([]);

    useEffect(() => {
        console.log(data)
        form.setFieldsValue({ data })
    }, [data, form])

    const handleValueChange = () => {
        const values = form.getFieldsValue()
        console.log(values)
        // setFormValues({ ...form.getFieldsValue() })
    }

    return (
        <>
            <Form
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}

                initialValues={data}
                onValuesChange={handleValueChange}
            >
                <Form.Item name="name" label="Name" >
                    <Input />
                </Form.Item>
                <Form.Item name="intro" label="Introdction">
                    <Input />
                </Form.Item>
                <Form.Item label="Image" name="photo_id">
                    <Select size="large" >
                        {/* <Select.Option value={null}>Pick from photos</Select.Option>
                        {photoOptions.map(option => (
                            <Select.Option key={option.id} value={option.id}><Avatar src={option.thumbnail} size={64} /></Select.Option>
                        ))} */}
                    </Select>
                </Form.Item>
                <Form.Item label="Birthday" name="birthday">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Weight" name="weight">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Sex" name="sex">
                    <Radio.Group >
                        <Radio.Button value="m">Male</Radio.Button>
                        <Radio.Button value="f">Female</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </>
    );
};

export default PetForm;