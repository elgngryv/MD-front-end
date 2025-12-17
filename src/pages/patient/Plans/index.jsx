import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import "@ant-design/v5-patch-for-react-19"; // React 19 uyumluluğu için gerekli
import 'antd/dist/reset.css';
import { Select, Space, Divider, Card, Button, Form, Input, message, Modal, Popconfirm, Drawer } from 'antd';
import { CalendarOutlined, MailOutlined, PoweroffOutlined, SaveOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Svg from './Components/Teths/svg';
import DualSelectTable from './Components/Page/dualSelectTable';
import AddToPlan from './Components/Page/addToPlan';
import PlansTable from './Components/Page/plansTable';
import usePatientInsuranceStore from '../../../../stores/patientInsuranceStore';
import usePlansStore from '../../../../stores/plans';
import usePatientPlansControllerStore from '../../../../stores/patient-plans-controller'; 

const Plans = () => {     
  const { id: patientId } = useParams();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [selectedOperationCode, setSelectedOperationCode] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedOperationId, setSelectedOperationId] = useState(null);
  const [selectedToothData, setSelectedToothData] = useState(null);
  const [resetToothSelection, setResetToothSelection] = useState(false);
  const [resetDrawerSelection, setResetDrawerSelection] = useState(false);
  const [patientPlansData, setPatientPlansData] = useState([]);

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

  const {
    createPatientPlan: createPatientPlanFromStore,
    readPatientPlans: readPatientPlansFromStore,
    deletePatientPlanItem: deletePatientPlanItemFromStore,
    savePatientPlan: savePatientPlanFromStore,
    selectedCategoryAndOperationItems,
    patientPlansData: storePatientPlansData,
  } = usePatientPlansControllerStore();

  const showModal = (plan = null) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handlePlanAdd = async (planData) => {
    // Gender-i key-ə çevir
    const planKey = planData['Gender'] === 'yetkin' ? 'Yetkin' : planData['Gender'] === 'usaq' ? 'Uşaq' : planData['Gender'];
    
    if (editingPlan) {
      // Plan düzenleme - API çağrısı addToPlan içinde yapıldı, sadece state güncelle
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id 
          ? { ...plan, ...planData, key: planKey }
          : plan
      ));
      // Plan düzəldikdən sonra seçimləri sıfırla
      // API çağırışı lazım deyil - useEffect avtomatik işləyəcək
      resetAllSelections();
    } else {
      // Yeni plan ekleme - API çağrısı addToPlan içinde yapıldı, sadece state güncelle
      const newPlan = {
        id: planData.id || Date.now(),
        ...planData,
        key: planKey
      };
      setPlans([...plans, newPlan]);
      setSelectedPlanId(newPlan.id);
      // API çağırışı lazım deyil - useEffect avtomatik işləyəcək (selectedPlanId dəyişdikdə)
      // Yeni plan yaratdıqdan sonra seçimləri sıfırla
      resetAllSelections();
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      const result = await deletePlansFromStore(planId);
      
      // Sadece başarılı olduğunda (200 status) state güncelle
      if (result.success && result.status === 200) {
        const updatedPlans = plans.filter(plan => plan.id !== planId);
        setPlans(updatedPlans);
        const newSelectedPlanId = updatedPlans.length > 0 ? updatedPlans[0].id : null;
        if (selectedPlanId === planId) {
          setSelectedPlanId(newSelectedPlanId);
        }
        // Plan silindikdən sonra, əgər başqa plan seçilibsə, patient plans datayı yenilə
        if (newSelectedPlanId) {
          const plansResult = await readPatientPlansFromStore(newSelectedPlanId);
          if (plansResult.success && plansResult.status === 200) {
            setPatientPlansData(Array.isArray(plansResult.data) ? plansResult.data : []);
          }
        } else {
          setPatientPlansData([]);
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
  
  // Bütün seçim state-lərini sıfırla
  const resetAllSelections = useCallback(() => {
    setSelectedCategoryId(null);
    setSelectedOperationId(null);
    setSelectedOperationCode(null);
    setSelectedToothData(null);
    setResetToothSelection(true);
    setResetDrawerSelection(true);
    setTimeout(() => {
      setResetToothSelection(false);
      setResetDrawerSelection(false);
    }, 100);
  }, []);
  
  // Seçilmiş kateqoriya və əməliyyat məlumatlarını tap
  const getSelectedOperationInfo = () => {
    if (!selectedCategoryAndOperationItems || !selectedCategoryId || !selectedOperationId) {
      return null;
    }
    
    const category = selectedCategoryAndOperationItems.find(cat => cat.id === selectedCategoryId);
    if (!category || !category.opTypeItemReadResponses) {
      return null;
    }
    
    const operation = category.opTypeItemReadResponses.find(op => op.id === selectedOperationId);
    if (!operation) {
      return null;
    }
    
    return {
      categoryName: category.categoryName,
      operationName: operation.operationName,
      price: operation.price || 0,
    };
  };
  
  const selectedOperationInfo = getSelectedOperationInfo();
  
  // Planı təsdiqləmə funksiyası
  const handleConfirmPlan = async () => {
    if (!selectedPlanId) {
      message.warning('Zəhmət olmasa plan seçin');
      return;
    }

    try {
      const result = await savePatientPlanFromStore(selectedPlanId);
      
      if (result.success && result.status === 200) {
        message.success('Plan uğurla təsdiqləndi!');
        // Patient plans datayı yenilə
        const plansResult = await readPatientPlansFromStore(selectedPlanId);
        if (plansResult.success && plansResult.status === 200) {
          setPatientPlansData(Array.isArray(plansResult.data) ? plansResult.data : []);
        }
      } else {
        const status = result.status || result.error?.response?.status;
        const errorMessage = result.error?.response?.data?.message || 'Plan təsdiqlənərkən xəta baş verdi';
        message.error(`Xəta (Status: ${status}): ${errorMessage}`);
      }
    } catch (error) {
      console.error('Plan təsdiqləmə xətası:', error);
      message.error(error.response?.data?.message || 'Plan təsdiqlənərkən xəta baş verdi');
    }
  };

  // Göndər butonuna tıklandığında API'ye gönder
  const handleSendPlan = async () => {
    if (!selectedPlanId || !selectedCategoryId || !selectedOperationId || !selectedToothData) {
      message.warning('Zəhmət olmasa kategoriya, əməliyyat və diş seçin');
      return;
    }

    try {
      const payload = {
        patientPlanMainId: selectedPlanId,
        toothId: Number(selectedToothData.toathNumber),
        categoryId: Number(selectedCategoryId),
        operationId: Number(selectedOperationId),
        partOfTeethIds: (selectedToothData.pathIds || []).map(id => Number(id)),
      };

      const result = await createPatientPlanFromStore(payload);
      
      if (result.success && result.status === 200) {
        message.success('Diş uğurla göndərildi!');
        // Sadece diş seçimini temizle, categoryCode ve operationCode'u koru
        setSelectedToothData(null);
        // Diş seçimini temizle
        setResetToothSelection(true);
        // Patient plans datayı getir
        const result = await readPatientPlansFromStore(selectedPlanId);
        if (result.success && result.status === 200) {
          setPatientPlansData(Array.isArray(result.data) ? result.data : []);
        } else {
          setPatientPlansData([]);
        }
        setTimeout(() => setResetToothSelection(false), 100);
      } else {
        const status = result.status || result.error?.response?.status;
        const errorMessage = result.error?.response?.data?.message || 'Diş göndərilərkən xəta baş verdi';
        message.error(`Xəta (Status: ${status}): ${errorMessage}`);
      }
    } catch (error) {
      console.error('Diş göndərmə xətası:', error);
      message.error(error.response?.data?.message || 'Diş göndərilərkən xəta baş verdi');
    }
  };

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
                'key': plan.key, // Orijinal key-i saxla
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

  // Plan dəyişdikdə seçimləri sıfırla
  useEffect(() => {
    if (selectedPlanId) {
      resetAllSelections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlanId]);

  // Patient plans datayı getir - plan dəyişdikdə
  useEffect(() => {
    // Debounce üçün timeout
    const timeoutId = setTimeout(() => {
      const loadPatientPlans = async () => {
        if (selectedPlanId) {
          const result = await readPatientPlansFromStore(selectedPlanId);
          if (result.success && result.status === 200) {
            setPatientPlansData(Array.isArray(result.data) ? result.data : []);
          } else {
            setPatientPlansData([]);
          }
        } else {
          setPatientPlansData([]);
        }
      };
      loadPatientPlans();
    }, 100); // 100ms debounce

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlanId]);

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

      {/* Plan seçildikten sonra dişleri ve diğer öğeleri göster */}
      {selectedPlanId && (
        <>
          {/* Düz xət */}
          <Divider />
          
          {/* Plan təsdiqləmə buttonu - yalnız data varsa görünsün */}
          {patientPlansData && patientPlansData.length > 0 && (
            <div className='mb-4 flex justify-end'>
              <Button 
                type="primary" 
                size="large"
                icon={<SaveOutlined />}
                onClick={handleConfirmPlan}
              >
                Planı Təsdiqlə
              </Button>
            </div>
          )}

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
                  
                  {/* Seçilmiş əməliyyat məlumatı info card */}
                  {selectedOperationInfo && (
                    <Card 
                      size="small" 
                      className="w-full"
                      style={{ 
                        backgroundColor: '#f0f9ff',
                        borderColor: '#3b82f6',
                        borderWidth: '1px'
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-600 font-medium">
                          {selectedOperationInfo.categoryName}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-800">
                            {selectedOperationInfo.operationName}
                          </span>
                          {selectedOperationInfo.price > 0 && (
                            <span className="text-sm font-bold text-blue-600">
                              {selectedOperationInfo.price} ₼
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  <Button 
                    type="primary" 
                    icon={<SaveOutlined />}
                    onClick={handleSendPlan}
                    disabled={!selectedPlanId || !selectedCategoryId || !selectedOperationId || !selectedToothData}
                  >
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
                  <DualSelectTable 
                    // Burada patientId yox, seçilmiş planın insuranceId-si göndərilir
                    insuranceId={selectedPlan ? selectedPlan['Sığorta Şirkəti'] : null}
                    onOperationSelect={setSelectedOperationCode}
                    onCategoryAndOperationSelect={(categoryId, operationId) => {
                      setSelectedCategoryId(categoryId);
                      setSelectedOperationId(operationId);
                      // Əməliyyat seçildikdə API çağırışı etmək lazım deyil - yalnız state güncəllə
                    }}
                    resetSelection={resetDrawerSelection}
                  />
                </Drawer>
              </div>

              {/* Disler */}
              <div className='ms-5'>
                <Svg 
                  categoryCode={selectedOperationCode} 
                  onToothSelect={setSelectedToothData}
                  resetSelection={resetToothSelection}
                  patientPlansData={patientPlansData}
                  planKey={selectedPlan?.key || null}
                />
              </div>

            </div>

          </Card>

          {/* Plan Əməliyyatları cədvəli - yalnız data varsa görünsün */}
          {patientPlansData && patientPlansData.length > 0 && (
            <>
              <Divider />
              <PlansTable 
                data={patientPlansData} 
                onDelete={async (id) => {
                  try {
                    const result = await deletePatientPlanItemFromStore(id);
                    if (result.success && result.status === 200) {
                      message.success('Əməliyyat uğurla silindi!');
                      // Patient plans datayı yenilə
                      const plansResult = await readPatientPlansFromStore(selectedPlanId);
                      if (plansResult.success && plansResult.status === 200) {
                        setPatientPlansData(Array.isArray(plansResult.data) ? plansResult.data : []);
                      }
                    } else {
                      const status = result.status || result.error?.response?.status;
                      const errorMessage = result.error?.response?.data?.message || 'Əməliyyat silinərkən xəta baş verdi';
                      message.error(`Xəta (Status: ${status}): ${errorMessage}`);
                    }
                  } catch (error) {
                    console.error('Əməliyyat silmə xətası:', error);
                    message.error(error.response?.data?.message || 'Əməliyyat silinərkən xəta baş verdi');
                  }
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Plans;
