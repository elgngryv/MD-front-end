import { Button, Form, Input, message, Select } from 'antd'
import React, { useEffect } from 'react'
import usePatientInsuranceStore from '../../../../../../stores/patientInsuranceStore';
import usePlansStore from '../../../../../../stores/plans';

const AddToPlan = ({ onClose, onFinish, editingPlan, patientId }) => {
  const [form] = Form.useForm();


  const {
      patientInsurance,
    } = usePatientInsuranceStore();

  const {
    createPlans,
    updatePlans,
    loading: plansLoading,
  } = usePlansStore();

  // patientInsurance verisini Select options formatına çevir
  const insuranceOptions = [
    // { label: 'Yoxdur', value: 0 },
    ...(Array.isArray(patientInsurance) 
      ? patientInsurance.map(insurance => ({
          label: insurance.insuranceCompanyName || insurance.policyNumber || `Sığorta #${insurance.id}`,
          value: insurance.id,
        }))
      : [])
  ];

  useEffect(() => {
    if (editingPlan) {
      form.setFieldsValue(editingPlan);
    } else {
      form.resetFields();
    }
  }, [editingPlan, form]);
    
  const handleFinish = async (values) => {
    try {
      // Gender değerini API formatına çevir (yetkin -> Yetkin, usaq -> Uşaq)
      const genderValue = values['Gender'] === 'yetkin' ? 'Yetkin' : values['Gender'] === 'usaq' ? 'Uşaq' : values['Gender'];
      
      if (editingPlan) {
        // Plan düzenleme - sadece id, planName ve key gönderilir
        const updateData = {
          id: editingPlan.id,
          planName: values['Plan Adı'],
          key: genderValue,
        };
        
        const result = await updatePlans(updateData);
        
        // Sadece başarılı olduğunda (200 status) state güncelle
        if (result.success && result.status === 200) {
          message.success('Plan uğurla yeniləndi!');
          
          // Store'dan dönen veriyi onFinish'e gönder
          if (onFinish) {
            const planData = {
              id: editingPlan.id,
              'Plan Adı': values['Plan Adı'],
              'Sığorta Şirkəti': values['Sığorta Şirkəti'],
              'Gender': values['Gender'],
            };
            onFinish(planData);
          }
          
          form.resetFields();
          if (onClose) {
            onClose();
          }
        } else {
          // Hata durumunda state güncelleme
          const status = result.status || result.error?.response?.status;
          const errorMessage = result.error?.response?.data?.message || 'Plan yenilənərkən xəta baş verdi';
          message.error(`Xəta (Status: ${status}): ${errorMessage}`);
        }
      } else {
        // Yeni plan ekleme
        const createData = {
          planName: values['Plan Adı'],
          insuranceId: values['Sığorta Şirkəti'] === 0 ? null : values['Sığorta Şirkəti'],
          key: genderValue,
          patientId: Number(patientId),
        };
        
        const result = await createPlans(createData);
        
        // Sadece başarılı olduğunda (200 status) state güncelle
        if (result.success && result.status === 200 || result.status === 201) {
          message.success('Plan uğurla əlavə edildi!');
          
          // Store'dan dönen veriyi onFinish'e gönder
          if (onFinish) {
            const planData = {
              id: result.data?.id || Date.now(),
              'Plan Adı': values['Plan Adı'],
              'Sığorta Şirkəti': values['Sığorta Şirkəti'],
              'Gender': values['Gender'],
            };
            onFinish(planData);
          }
          
          form.resetFields();
          if (onClose) {
            onClose();
          }
        } else {
          // Hata durumunda state güncelleme
          const status = result.status || result.error?.response?.status;
          const errorMessage = result.error?.response?.data?.message || 'Plan əlavə edilərkən xəta baş verdi';
          message.error(`Xəta (Status: ${status}): ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Plan əlavə/yeniləmə xətası:', error);
      message.error(error.response?.data?.message || 'Plan əlavə edilərkən xəta baş verdi');
    }
  };
  
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
    return (
        <div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="Plan Adı"
                    label="Plan Adı"
                    rules={[{ required: true, message: 'Plan adı daxil edin' }, { type: 'string', min: 3, message: 'Minimum 3 simvol olmalıdır' }]}
                >
                    <Input placeholder="Plan adını daxil edin" />
                </Form.Item>

                <Form.Item
                    name="Sığorta Şirkəti"
                    label="Sığorta Şirkəti"
                    rules={editingPlan ? [] : [{ required: true, message: 'Sığorta Şirkətini seçin' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Sığorta şirkətini seçin"
                        options={insuranceOptions}
                        showSearch
                        disabled={!!editingPlan}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="Gender"
                    label="Seçin"
                    rules={editingPlan ? [] : [{ required: true, message: 'Seçim edin' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Seçin"
                        disabled={!!editingPlan}
                        options={[
                            { label: 'Yetkin', value: 'yetkin' },
                            { label: 'Uşaq', value: 'usaq' },
                        ]}
                    />

                </Form.Item>

                <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Təsdiqlə
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddToPlan
