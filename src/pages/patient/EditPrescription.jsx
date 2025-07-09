import React, { useState } from 'react';
import CustomDropdown from '../../components/CustomDropdown';
import { useParams, useNavigate } from 'react-router-dom';

const EditPrescription = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // The component is always in 'edit' mode, so no need for a state to manage it.
    // const [currentMode, setCurrentMode] = useState('edit'); // No longer needed

    const handleSave = () => {
        console.log('save');
        // After saving, always navigate back to the view page
        navigate(`/patient/prescription/${id}`);
    }

    const handleCancel = () => {
        // After canceling, always navigate back to the view page
        navigate(`/patient/prescription/${id}`);
    }

    return (
        <div className='flex flex-col gap-4'>
            {/* The 'view' mode buttons are removed as this component is always for editing. */}
            {/* {currentMode === 'view' && (
                <div className='flex self-end gap-4'>
                    <button onClick={() => navigate("edit")}>
                        <EditIcon />
                    </button>
                    <button >
                        <DownloadIcon />
                    </button>
                </div>
            )} */}

            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 justify-between items-center'>
                    <label className='flex-1 '>Ad</label>
                    {/* The CustomDropdown will now always be editable */}
                    <CustomDropdown placeholder='Reseptin adı' className='flex-5' />
                </div>
                <div className='flex gap-4 justify-between items-center'>
                    <label className='flex-1'>Tarix</label>
                    {/* The input fields are always enabled for editing */}
                    <input type='date' className='flex-5 border border-gray-300 rounded-md p-2 h-[44px]' placeholder='Tarix' />
                </div>
                <div className='flex gap-4 justify-between items-center'>
                    <label className='flex-1'>Reseptin müddəti</label>
                    {/* The input fields are always enabled for editing */}
                    <input type='text' className='flex-5 border border-gray-300 rounded-md p-2 h-[44px]' placeholder='Reseptin müddəti' />
                </div>
            </div>

            {/* The save and cancel buttons are always visible in this dedicated edit component */}
            <div className='flex self-end gap-4'>
                <button onClick={handleCancel} className='border border-[#155EEF] text-[#155EEF] w-[178px] h-[36px] rounded-lg p-2 hover:bg-[#155EEF] hover:text-white transition-all duration-300'>
                    İptal et
                </button>
                <button onClick={handleSave} className='border border-[#155EEF] text-white bg-[#155EEF] w-[178px] h-[36px] rounded-lg p-2 hover:bg-[#155EEF] hover:text-white transition-all duration-300'>
                    Yadda saxla
                </button>
            </div>
        </div>
    );
};

export default EditPrescription;