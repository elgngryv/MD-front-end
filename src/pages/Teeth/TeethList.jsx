import React from "react";
import "../../assets/style/Teeth/teethlist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const teethData = [
  { id: 1, number: "Alt çənə", type: "Yetkin", location: "Orta", exam: 0, operation: 0 },
  { id: 2, number: "Üst çənə", type: "Yetkin", location: "Orta", exam: 0, operation: 0 },
  { id: 3, number: "Ağız", type: "Yetkin", location: "Orta", exam: 0, operation: 0 },
  { id: 4, number: "11", type: "Yetkin", location: "Üst sol", exam: 0, operation: 0 },
  { id: 5, number: "12", type: "Yetkin", location: "Üst sol", exam: 0, operation: 0 },
  { id: 6, number: "13", type: "Yetkin", location: "Üst sol", exam: 0, operation: 0 },
  { id: 7, number: "14", type: "Yetkin", location: "Üst sol", exam: 0, operation: 0 },
  { id: 8, number: "15", type: "Yetkin", location: "Üst sol", exam: 0, operation: 0 },
  { id: 9, number: "16", type: "Yetkin", location: "Üst sol", exam: 0, operation: 0 },
  { id: 10, number: "17", type: "Yetkin", location: "Üst sol", exam: 0, operation: 0 },
];

const TeethList = () => {
    const navigate = useNavigate();
    
    const handleEdit = (id) => () => {
        navigate(`edit/${id}`);
    };

    return (
        <div className="teethList-container">
            <div className="teethList-controls-section">
                <div className="teethList-filters">
                    <select className="teethList-status-dropdown">
                        <option value="">Əməliyyat</option>
                        {/* Əlavə əməliyyat filterləri əlavə oluna bilər */}
                    </select>
                    <input type="date" className="teethList-date-input" placeholder="Başlama tarixi" />
                    <input type="date" className="teethList-date-input" placeholder="Bitmə tarixi" />
                    <select className="teethList-status-dropdown">
                        <option value="">Diş No</option>
                    </select>
                    <div className="teethList-search-box">
                        <input
                            type="text"
                            placeholder="Axtarış"
                            className="teethList-search-input"
                        />
                        <button className="teethList-search-button">
                            <CiSearch className="teethList-search-icon" />
                        </button>
                    </div>
                </div>
                <div className="teethList-actions">
                    <Link to={"add"} className="teethList-add-new-button">+ Yenisini əlavə et</Link>
                    <button className="teethList-download-button">
                        <FiDownload className="teethList-download-icon" />
                    </button>
                </div>
            </div>
            <div className="teethList-table-section">
                <table className="teethList-table">
                    <thead>
                        <tr>
                            <th>
                                <span className="firstElementOfTHS">
                                    <HiOutlineArrowsUpDown /> 1-8
                                </span>
                            </th>
                            <th>
                                <span>
                                    <HiOutlineArrowsUpDown /> Dişin nömrəsi
                                </span>
                            </th>
                            <th>
                                <span>
                                    <HiOutlineArrowsUpDown /> Dişin növü
                                </span>
                            </th>
                            <th>
                                <span>
                                    <HiOutlineArrowsUpDown /> Yeri
                                </span>
                            </th>
                            <th>
                                <span>
                                    <HiOutlineArrowsUpDown /> Müayinə şəkilləri
                                </span>
                            </th>
                            <th>
                                <span>
                                    <HiOutlineArrowsUpDown /> Əməliyyat şəkilləri
                                </span>
                            </th>
                            <th>
                                <span>Düzəliş</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teethData.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.number}</td>
                                <td>{row.type}</td>
                                <td>{row.location}</td>
                                <td>
                                    <Link to={`${row.id}/examination-pictures`} className="teethList-link">
                                        Müayinə şəkilləri ({row.exam})
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`${row.id}/operation-pictures`} className="teethList-link">
                                        Əməliyyat şəkilləri ({row.operation})
                                    </Link>
                                </td>
                                <td>
                                    <div className="teethList-action-icons">
                                        <FiEdit3 onClick={handleEdit(row.id)} className="teethList-edit-button" />
                                        <GoTrash className="teethList-delete-button" />
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

export default TeethList;