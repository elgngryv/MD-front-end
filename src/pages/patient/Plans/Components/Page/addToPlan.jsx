import { Button, Form, Input, message, Select } from 'antd'
import React from 'react'

const AddToPlan = () => {
  const [form] = Form.useForm();

    
  const onFinish = () => {
    message.success('Submit success!');
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
    return (
        <div>

            <Form
                form={form}
                layout="inline"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                <Form.Item
                    name="Plan Adı"
                    label="Plan Adı"
                    layout="vertical"

                    rules={[{ required: true }, { type: 'planname', warningOnly: true }, { type: 'string', min: 3 }]}
                >
                    <Input placeholder="" />
                </Form.Item>

                <Form.Item
                    name="Gender"
                    label="Seçin"
                    layout="vertical"
                    rules={[{ required: true }, { type: 'Gender', warningOnly: true }, { type: 'string' }]}
                >
                    <Select
                        style={{ width: 100, margin: '0 8px' }}
                        options={[
                            { label: 'Yetkin', value: 'yetkin' },
                            { label: 'Uşaq', value: 'usaq' },
                        ]}

                    />

                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Təsdiqlə
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddToPlan
