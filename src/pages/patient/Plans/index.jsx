import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "@ant-design/v5-patch-for-react-19"; // React 19 uyumluluğu için gerekli
import 'antd/dist/reset.css';
import { Select, Space, Divider, Card, Menu, Tabs, Flex, Radio, Button, Form, Input, message, Modal, Popconfirm, Drawer } from 'antd';
import { CalendarOutlined, MailOutlined, PoweroffOutlined, SaveOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Svg from './Components/Teths/svg';
import DualSelectTable from './Components/Page/dualSelectTable';
import Filters from './Components/Page/filters';
import AddToPlan from './Components/Page/addToPlan';
import usePatientInsuranceStore from '../../../../stores/patientInsuranceStore';
import usePlansStore from '../../../../stores/plans';

const Plans = () => {
  const { id: patientId } = useParams();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [selectedOperationCode, setSelectedOperationCode] = useState(null);

  const {
    patientInsurance,
    fetchPatientInsurance,
    loading: insuranceLoading,
  } = usePatientInsuranceStore();

  const {
    fetchPlans: fetchPlansFromStore,
    deletePlans: deletePlansFromStore,
    loading: plansLoading,
  } = usePlansStore();

  const showModal = (plan = null) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handlePlanAdd = (planData) => {
    if (editingPlan) {
      // Plan düzenleme - API çağrısı addToPlan içinde yapıldı, sadece state güncelle
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id 
          ? { ...plan, ...planData }
          : plan
      ));
    } else {
      // Yeni plan ekleme - API çağrısı addToPlan içinde yapıldı, sadece state güncelle
      const newPlan = {
        id: planData.id || Date.now(),
        ...planData
      };
      setPlans([...plans, newPlan]);
      setSelectedPlanId(newPlan.id);
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      const result = await deletePlansFromStore(planId);
      
      // Sadece başarılı olduğunda (200 status) state güncelle
      if (result.success && result.status === 200) {
        const updatedPlans = plans.filter(plan => plan.id !== planId);
        setPlans(updatedPlans);
        if (selectedPlanId === planId) {
          setSelectedPlanId(updatedPlans.length > 0 ? updatedPlans[0].id : null);
        }
        message.success('Plan uğurla silindi!');
      } else {
        // Hata durumunda state güncelleme
        const status = result.status || result.error?.response?.status;
        const errorMessage = result.error?.response?.data?.message || 'Plan silinərkən xəta baş verdi';
        message.error(`Xəta (Status: ${status}): ${errorMessage}`);
      }
    } catch (error) {
      console.error('Plan silmə xətası:', error);
      message.error(error.response?.data?.message || 'Plan silinərkən xəta baş verdi');
    }
  };

  const selectedPlan = plans.find(plan => plan.id === selectedPlanId);

  // Patient insurance verilerini getir
  useEffect(() => {
    if (patientId) {
      fetchPatientInsurance(Number(patientId));
    }
  }, [patientId, fetchPatientInsurance]);

  // Planları getir
  useEffect(() => {
    const loadPlans = async () => {
      if (patientId) {
        const result = await fetchPlansFromStore(Number(patientId));
        if (result.success && result.status === 200) {
          // API'den gelen planları state'e ekle
          const formattedPlans = Array.isArray(result.data) 
            ? result.data.map(plan => ({
                id: plan.id,
                'Plan Adı': plan.planName || plan.name,
                'Sığorta Şirkəti': plan.insuranceId || plan.patientInsuranceId,
                'Gender': plan.key === 'Yetkin' ? 'yetkin' : plan.key === 'Uşaq' ? 'usaq' : plan.key,
              }))
            : [];
          setPlans(formattedPlans);
          // İlk planı otomatik seç
          if (formattedPlans.length > 0) {
            setSelectedPlanId(prev => prev || formattedPlans[0].id);
          }
        }
      }
    };
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  // İlk plan eklendiğinde veya plans.length === 1 olduğunda otomatik seç
  useEffect(() => {
    if (plans.length === 1 && !selectedPlanId) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlanId]);

  return (
    <>

      {/* Plan əlavə etmək */}
      <div className='mb-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex-1'>
            {plans.length === 0 ? (
              <div className='text-gray-500'>Hələ plan yoxdur</div>
            ) : plans.length === 1 ? (
              <div className='flex items-center gap-4'>
                <div className='text-lg font-semibold'>{plans[0]['Plan Adı']}</div>
                <Button 
                  type="link" 
                  icon={<EditOutlined />} 
                  onClick={() => showModal(plans[0])}
                >
                  Düzəlt
                </Button>
                <Popconfirm
                  title="Planı silmək istədiyinizə əminsiniz?"
                  onConfirm={() => handleDeletePlan(plans[0].id)}
                  okText="Bəli"
                  cancelText="Xeyr"
                >
                  <Button 
                    type="link" 
                    danger 
                    icon={<DeleteOutlined />}
                  >
                    Sil
                  </Button>
                </Popconfirm>
              </div>
            ) : (
              <div className='flex flex-col gap-2'>
                <Select
                  style={{ width: 300 }}
                  placeholder="Plan seçin"
                  value={selectedPlanId}
                  onChange={setSelectedPlanId}
                  options={plans.map(plan => ({
                    label: plan['Plan Adı'],
                    value: plan.id
                  }))}
                />
                {selectedPlan && (
                  <div className='flex items-center gap-4 mt-2'>
                    <div className='text-lg font-semibold'>{selectedPlan['Plan Adı']}</div>
                    <Button 
                      type="link" 
                      icon={<EditOutlined />} 
                      onClick={() => showModal(selectedPlan)}
                    >
                      Düzəlt
                    </Button>
                    <Popconfirm
                      title="Planı silmək istədiyinizə əminsiniz?"
                      onConfirm={() => handleDeletePlan(selectedPlan.id)}
                      okText="Bəli"
                      cancelText="Xeyr"
                    >
                      <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />}
                      >
                        Sil
                      </Button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            )}
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
            Plan Əlavə Et
          </Button>
        </div>
        <Modal
          title={editingPlan ? "Planı Düzəlt" : "Plan Əlavə Et"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <AddToPlan 
            onClose={handleCancel} 
            onFinish={handlePlanAdd} 
            editingPlan={editingPlan} 
            patientId={patientId}
          />
        </Modal>
      </div>


      {/* Disler ucun filterlar
      <div>
        <Filters />
      </div> */}

      {/* Plan varsa dişleri göster */}
      {plans.length > 0 && ( 
        <>
          {/* Düz xət */}
          <Divider />



          <Card>
            <div className='flex gap-2'>

              <div>


                {/* secilen disleri ve kategori, emelyatlari backe gonderme buttonu */}
                <div className='flex justify-between flex-col gap-3 items-center mb-4'>
                  <Button 
                    type="default" 
                    icon={<UnorderedListOutlined />}
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex items-center gap-2"
                  >
                    Kateqoriya və Əməliyyat seçimi
                  </Button>
                  <Button type="primary" icon={<SaveOutlined />}>
                    Göndər
                  </Button>
                </div>

                {/* Drawer - Kategoriyalar ve Emelyatlar */}
                <Drawer
                  title={
                    <div className="flex items-center gap-2">
                      <UnorderedListOutlined />
                      <span>Kateqoriya və Əməliyyat Seçimi</span>
                    </div>
                  }
                  placement="left"
                  width={600}
                  onClose={() => setIsDrawerOpen(false)}
                  open={isDrawerOpen}
                  styles={{
                    body: {
                      padding: 0,
                    }
                  }}
                >
                  <DualSelectTable onOperationSelect={setSelectedOperationCode} />
                </Drawer>
              </div>


              {/* Disler */}
              <div className='ms-5'>
                <Svg categoryCode={selectedOperationCode} />
              </div>


            </div>

          </Card>
         </>
        )} 
    </>
  )
}

export default Plans
