import React from "react";
import DownloadIcon from "../../assets/icons/Download";
import SearchIcon from "../../assets/icons/Search";
import InfoIcon from "../../assets/icons/Info"; // Assuming InfoIcon for View
import EditIcon from "../../assets/icons/Edit";
import DeleteIcon from "../../assets/icons/Delete";
import { HiOutlineArrowsUpDown } from "react-icons/hi2"; // Sorting icon
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Insurance = () => {
    const navigate = useNavigate();

    // Dummy data to match the image
    const insuranceData = [
        {
            id: 1,
            company: "A-Group Sığorta",
            policyNo: "P23",
            expiryDate: "26.07.2024",
            deductible: "-",
            maxAmount: 1000,
            claims: 56,
            status: "Aktiv",
        },
        {
            id: 2,
            company: "A-Group Sığorta",
            policyNo: "P23",
            expiryDate: "26.07.2024",
            deductible: 20,
            maxAmount: 1000,
            claims: 0,
            status: "Passiv",
        },
    ];

    // Column definitions for table headers and data access
    const columns = [
        { key: "index", label: "" }, // For the row number (1, 2, ...)
        { key: "company", label: "Sığorta şirkəti" },
        { key: "policyNo", label: "Polis No" },
        { key: "expiryDate", label: "Bitmə tarixi" },
        { key: "deductible", label: "Azadolma məbləği" },
        { key: "maxAmount", label: "İllik max. məbləğ" },
        { key: "claims", label: "Sığorta qalıqları" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Düzəliş" }, // For the action buttons
    ];

    // Placeholder handlers for edit, view, delete
    const handleEdit = (id) => {
        console.log("Edit item with ID:", id);
        navigate(`edit/${id}`);
    };

    const handleView = (id) => {
        console.log("View item with ID:", id);
        navigate(`info/${id}`);
    };

    const handleDelete = (id) => {
        console.log("Delete item with ID:", id);
        // Implement delete logic, e.g., show confirmation modal, then delete from state/API
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between gap-4'>
                <div className="flex gap-4">
                    <input type="text" className="border border-[#E0E0E0] rounded-lg p-2 h-[36px]" placeholder="Polis No" />
                    <button>
                        <SearchIcon />
                    </button>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => navigate('add')}>
                        <div className="flex items-center justify-center border border-[#155EEF] text-[#155EEF] w-[178px] h-[36px] rounded-lg p-2 hover:bg-[#155EEF] hover:text-white transition-all duration-300">
                            + Yenisini əlavə et
                        </div>
                    </button>
                    <button >
                        <DownloadIcon />
                    </button>
                </div>
            </div>

            <div className="w-full rounded-lg shadow-md overflow-hidden text-[14px] border border-[#E0E0E0]"> {/* Overall table container styling */}
                <table className="min-w-full divide-y divide-[#E0E0E0] table-fixed">
                    <thead className="bg-[#EEF2F6]"> {/* TH bg rəngi dəyişdirildi */}
                    <tr>
                        {/* Row number header */}
                        <th scope="col" className="w-[5%] px-4 py-3 text-center text-xs font-semibold text-gray-700 tracking-wider">
                            {insuranceData.length === 0 ? '0' : `1-${insuranceData.length}`}
                        </th>
                        {/* Dynamic headers for other columns */}
                        {columns.slice(1, -1).map((col) => ( // Exclude 'index' and 'actions' from this loop
                            <th
                                key={col.key}
                                scope="col"
                                className="px-4 py-3 text-center text-xs font-semibold text-gray-700 tracking-wider"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <HiOutlineArrowsUpDown className="text-gray-500 text-base" />
                                    <span className="whitespace-nowrap">{col.label}</span>
                                </div>
                            </th>
                        ))}
                        {/* Düzəliş (Actions) header */}
                        <th scope="col" className="w-[15%] px-4 py-3 text-center text-xs font-semibold text-gray-700 tracking-wider">
                            Düzəliş
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E0E0E0]">
                    {insuranceData.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            {/* Row number cell */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                {index + 1}
                            </td>
                            {/* Company */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                {item.company}
                            </td>
                            {/* Policy No */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                {item.policyNo}
                            </td>
                            {/* Expiry Date */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                {item.expiryDate}
                            </td>
                            {/* Deductible */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                {item.deductible}
                            </td>
                            {/* Max Amount */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                {item.maxAmount}
                            </td>
                            {/* Claims (Sığorta qalıqları) */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                                <Link to={`insurance-balance/${item.id}`} className="text-[#155EEF] hover:underline">
                                    Sığorta qalıqları({item.claims})
                                </Link>
                            </td>
                            {/* Status */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                                <div
                                    className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium ${
                                        item.status === "Aktiv" ? "bg-[#40BC2B]" : "bg-[#FD4A3D]" // Aktiv və Passiv rəngləri dəyişdirildi
                                    }`}
                                >
                                    {item.status}
                                </div>
                            </td>
                            {/* Actions (Düzəliş) */}
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleView(item.id)}
                                        className="text-[#667085] hover:text-[#155EEF] transition-colors duration-200"
                                        title="Bax"
                                    >
                                        <InfoIcon />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="text-[#667085] hover:text-yellow-600 transition-colors duration-200"
                                        title="Düzəlt"
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-[#667085] hover:text-red-600 transition-colors duration-200"
                                        title="Sil"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Insurance;