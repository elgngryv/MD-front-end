import React, { useState } from 'react'
import "@ant-design/v5-patch-for-react-19"; // React 19 uyumluluğu için gerekli
import 'antd/dist/reset.css';
import { Select, Space, Divider, Card, Menu, Tabs, Flex, Radio, Button, Form, Input, message } from 'antd';
import { CalendarOutlined, MailOutlined, PoweroffOutlined, SaveOutlined } from '@ant-design/icons';
import Svg from './Components/Teths/svg';
import DualSelectTable from './Components/Page/dualSelectTable';
import Filters from './Components/Page/filters';
import AddToPlan from './Components/Page/addToPlan';

const Plans = () => {
  const [form] = Form.useForm();



  return (
    <>

      {/* Plan əlavə etmək */}
      <div>
        <AddToPlan />
      </div>


      {/* Disler ucun filterlar */}
      <div>
        <Filters />
      </div>

      {/* Düz xət */}
      <Divider />



      <Card>
        <div className='flex gap-2'>

          <div>


            {/* secilen disleri ve kategori, emelyatlari backe gonderme buttonu */}
            <div className='flex justify-end'>
              <Button icon={<SaveOutlined />}>
                Göndər
              </Button>
            </div>


            <br />

            {/* Kategoriyalar ve Emelyatlar */}
            <div className="flex flex-col border-t border-l border-b border-[#D9D9D9] w-[322px]">
              <div className="flex">

                <DualSelectTable />

              </div>
            </div>
          </div>


          {/* Disler */}
          <div>
            <Svg />
          </div>


        </div>

      </Card>
    </>
  )
}

export default Plans
