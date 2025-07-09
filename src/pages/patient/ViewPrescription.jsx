import React from 'react';
import EditIcon from '../../assets/icons/Edit';
import DownloadIcon from '../../assets/icons/Download';
import CustomDropdown from '../../components/CustomDropdown';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPrescription = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-4'>
            {/* These buttons are for view mode and allow navigation to edit */}
            <div className='flex self-end gap-4'>
                <button onClick={() => navigate("edit")}>
                    <EditIcon />
                </button>
                <button >
                    <DownloadIcon />
                </button>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 justify-between items-center'>
                    <label className='flex-1 '>Ad</label>
                    {/* CustomDropdown in view mode is typically non-interactive or shows selected value */}
                    <CustomDropdown placeholder='Reseptin adı' className='flex-5' disabled={true} />
                </div>
                <div className='flex gap-4 justify-between items-center'>
                    <label className='flex-1'>Tarix</label>
                    {/* Input fields are always disabled in view mode */}
                    <input disabled={true} type='date' className='flex-5 border border-gray-300 rounded-md p-2 h-[44px]' placeholder='Tarix' />
                </div>
                <div className='flex gap-4 justify-between items-center'>
                    <label className='flex-1'>Reseptin müddəti</label>
                    {/* Input fields are always disabled in view mode */}
                    <input disabled={true} type='text' className='flex-5 border border-gray-300 rounded-md p-2 h-[44px]' placeholder='Reseptin müddəti' />
                </div>
            </div>
        </div>
    );
};

export default ViewPrescription;