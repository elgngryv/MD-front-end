import React, { useState } from 'react'
import "@ant-design/v5-patch-for-react-19"; // React 19 uyumluluğu için gerekli
import 'antd/dist/reset.css';
import { Select, Space, Divider, Card, Menu, Tabs, Flex, Radio, Button } from 'antd';
import { CalendarOutlined, MailOutlined, PoweroffOutlined, SaveOutlined } from '@ant-design/icons';
import Svg from './Components/Teths/svg';

const Plans = () => {

  const [status,  ] = useState(""); // status state

  const options = [
    { value: "Vəziyyəti", label: "Vəziyyəti", status: "warning" },
    { value: "Plan", label: "Plan", status: "error" },
  ];

  const handleChange = (value) => {
    const selected = options.find((opt) => opt.value === value);
    setStatus(selected?.status || "");
  };


  const items = [
    {
      key: '1',
      label: 'Navigation Oneee',
    },
    {
      key: '2',
      label: 'Navigation Two',
    },
    {
      key: '3',
      label: 'Navigation Two',
    },
    {
      key: '4',
      label: 'Navigation Two',
    },
    {
      key: '5',
      label: 'Navigation Two',
    },
    {
      key: '6',
      label: 'Navigation Two',
    },
    {
      key: '7',
      label: 'Navigation Two',
    }
  ];

  return (
    <>
      <Space wrap>
        <Select
          defaultValue="lucy"
          style={{ width: 150 }}
          options={[
            { value: 'A-Group Sığorta', label: 'A-Group Sığorta' },
            { value: 'B-Group Sığorta', label: 'B-Group Sığorta' },
            { value: 'C-Group Sığorta', label: 'C-Group Sığorta' },

          ]}
        />
        <Select
          status={status}
          style={{ width: 150 }}
          options={options}
          onChange={handleChange}
          placeholder="Seç..."
        />
      </Space>

      <Divider />

      <Card>
        <div className='flex gap-2'>

          <div>


            <div className='flex justify-between'>

              <Flex vertical gap="middle" className=''>
                <Radio.Group defaultValue="a">
                  <Radio.Button value="a">Yetkin</Radio.Button>
                  <Radio.Button value="b">Uşaq</Radio.Button>
                </Radio.Group>
              </Flex>

              <Button
                icon={<SaveOutlined />}
              // loading={loadings[1]}
              >
                Göndər
              </Button>
            </div>
            <br />

            <div
              className="flex flex-col border-t border-l border-b border-[#D9D9D9]"
              style={{ width: 322 }}
            >

              {/* Üst başlıq */}
              <div className="flex justify-between ps-8 border-b border-r border-[#D9D9D9] bg-gray-50 px-4 py-2">
                <h3 className="text-sm font-semibold text-gray-700">Kateqoriyalar</h3>
                <div className='flex gap-4 pe-1'>
                  <h3 className="text-sm font-semibold text-gray-700">Əməliyyatlar</h3>
                  <h3 className="text-sm font-semibold text-gray-700">₼</h3>
                </div>
              </div>

              <div className="flex">
                <Tabs
                  tabPosition="left"
                  items={items}
                  className="custom-tabs"
                  style={{ maxWidth: 150 }}
                />
                <Tabs
                  tabPosition="left"
                  items={items}
                  className="custom-tabs"
                  style={{ maxWidth: 150 }}
                />
              </div>

            </div>
          </div>

          <div>
            <Svg />

          </div>
        </div>

      </Card>
    </>
  )
}

export default Plans
