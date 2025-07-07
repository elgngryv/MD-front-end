import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "../../assets/icons/Download";
import EditIcon from "../../assets/icons/Edit";
import DeleteIcon from "../../assets/icons/Delete";
import InfoIcon from "../../assets/icons/Info";

const PatientInsuranceBalance = () => {
    const navigate = useNavigate();

    const [balances, setBalances] = useState([
        { id: 1, date: "31.03.2024", amount: 250, status: "Aktiv" },
        { id: 2, date: "31.03.2024", amount: 250, status: "Passiv" },
    ]);

    const [filters, setFilters] = useState({
        date: "",
        status: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        console.log("Filtrlər:", { ...filters, [name]: value });
    };

    const handleAddNew = () => {
        navigate('add');
    };

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm(`ID ${id} olan balansı silmək istədiyinizə əminsinizmi?`)) {
            setBalances(balances.filter(balance => balance.id !== id));
            console.log(`ID ${id} olan balans silindi.`);
        }
    };

    const handleViewHistory = (id) => {
        navigate(`info/${id}`)
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Filter and Add New Section */}
            <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                    {/* Tarix filtri */}
                    <div className="relative">
                        <input
                            type="date"
                            id="filterDate"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            className="block w-full pl-3 pr-10 py-2.5 border border-[#E0E0E0] rounded-lg shadow-sm focus:outline-none focus:ring-[#155EEF] focus:border-[#155EEF] text-sm"
                            title="Tarixə görə filtr"
                        />
                    </div>

                    {/* Status filtri */}
                    <div className="relative">
                        <select
                            id="filterStatus"
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="block w-full px-3 py-2.5 border border-[#E0E0E0] rounded-lg shadow-sm focus:outline-none focus:ring-[#155EEF] focus:border-[#155EEF] text-sm appearance-none pr-10"
                            title="Statusa görə filtr"
                        >
                            <option value="">Status</option>
                            <option value="Aktiv">Aktiv</option>
                            <option value="Passiv">Passiv</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                     <button
                        onClick={handleAddNew}
                        className="flex items-center justify-center border border-[#155EEF] text-[#155EEF] px-4 h-[40px] rounded-lg text-sm font-medium hover:bg-[#155EEF] hover:text-white transition-all duration-300"
                    >
                        <span className="mr-2">+</span> Yenisini əlavə et
                    </button>
                    <button
                        onClick={() => console.log("Məlumatlar yükləndi")}
                        className="flex items-center justify-center border border-[#E0E0E0] text-gray-700 w-[36px] h-[40px] rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-300"
                        title="Məlumatı yüklə"
                    >
                        <DownloadIcon />
                    </button>
                   
                </div>
            </div>

            {/* Cədvəl hissəsi */}
            <div className="w-full rounded-lg shadow-md overflow-hidden text-[14px] border border-[#E0E0E0]">
                <table className="min-w-full divide-y divide-[#E0E0E0] table-fixed">
                    <thead className="bg-[#EEF2F6]">
                        <tr>
                            <th scope="col" className="w-[5%] px-4 py-3 text-center text-xs font-semibold text-gray-700 tracking-wider">
                                {balances.length === 0 ? '0' : `1-${balances.length}`}
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-700 tracking-wider cursor-pointer hover:text-gray-700">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="whitespace-nowrap">Tarix</span>
                                </div>
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-700 tracking-wider cursor-pointer hover:text-gray-700">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="whitespace-nowrap">Məbləğ</span>
                                </div>
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-700 tracking-wider cursor-pointer hover:text-gray-700">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="whitespace-nowrap">Status</span>
                                </div>
                            </th>
                            <th scope="col" className="w-[15%] px-4 py-3 text-center text-xs font-semibold text-gray-700 tracking-wider">
                                Düzəliş
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E0E0E0]">
                        {balances.map((balance, index) => (
                            <tr key={balance.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                    {balance.date}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                                    {balance.amount}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                    <div
                                        className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium ${
                                            balance.status === "Aktiv" ? "bg-[#40BC2B]" : "bg-[#FD4A3D]"
                                        }`}
                                    >
                                        {balance.status}
                                    </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleViewHistory(balance.id)}
                                            className="text-[#667085] hover:text-[#155EEF] transition-colors duration-200"
                                            title="Tarixçəyə bax"
                                        >
                                            <InfoIcon />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(balance.id)}
                                            className="text-[#667085] hover:text-yellow-600 transition-colors duration-200"
                                            title="Redaktə et"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(balance.id)}
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

export default PatientInsuranceBalance;