import React from "react";
import { Link } from "react-router-dom";

// Style
import "../../assets/style/Technicians/technicians.css";

// Icons
import { CiSearch } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

import { useNavigate } from "react-router-dom";

function Technicians() {
  const dummyTechnicians = [
    {
      id: 1,
      img:"https://i.pinimg.com/736x/7e/8c/81/7e8c8119bf240d4971880006afb7e1e6.jpg",
      username: "techuser1",
      name: "Elvin",
      surname: "Məmmədov",
      patronymic: "Əli oğlu",
      authorities: ["Texnik", "Admin"],
      phone: "+994501234567",
      ratings: "4.5",
      enabled: true,
    },
    {
      id: 2,
      img:"https://i.pinimg.com/736x/7e/8c/81/7e8c8119bf240d4971880006afb7e1e6.jpg",
      username: "techuser2",
      name: "Aysel",
      surname: "Quliyeva",
      patronymic: "Vəli qızı",
      authorities: ["Texnik"],
      phone: "+994502345678",
      ratings: "4.8",
      enabled: false,
    },
  ];
  const navigation = useNavigate()
  const getStatus = (tech) => (tech.enabled ? "Aktiv" : "Passiv");
   const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => navigation(`${row.id}`),
      className: "info",
    },
    {
      icon: FiEdit3,
      action: (row) => navigation(`edit/${row.id}`),
      className: "edit",
    },
    {
      icon: GoTrash,
      action: async (row) => {
        const confirmDelete = window.confirm(
          `İşçini silmək istədiyinizə əminsiniz? (${row.username})`
        );
        if (confirmDelete) {
          try {
            await removeWorker(row.id);
            alert("İşçi uğurla silindi!");
          } catch (err) {
            alert("Silinmə zamanı xəta baş verdi.");
          }
        }
      },
      className: "delete",
    },
  ];
  return (
    <div className="techniciansPageContainer">
      <div className="techiniciansPageTopPart">
        <div className="leftPartOfTop">
          <select name="" id="">
            <option value="">Seçim edin</option>
            <option value="v2">Opt 2</option>
            <option value="v3">Opt 3</option>
            <option value="v4">Opt 4</option>
          </select>
          <div className="searchBarContainer">
            <input type="text" placeholder="Axtarış" />
            <CiSearch className="searchIconBTN" />
          </div>
        </div>
        <div className="rightPartOfTop">
          <Link className="addNewTechnicianNow" to={"add"}>
            <span>+</span>Yenisini əlavə et
          </Link>
          <Link className="exportDataOfTechs" to={"/../"}>
            <CiExport className="exportDataOfTechsIcon" />
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="techniciansTableWrapper">
        <table className="techniciansTable">
          <thead>
            <tr>
              <th><span>İstifadəçi adı</span></th>
              <th><span><HiArrowsUpDown className="tableArrowIcon" /> Adı</span></th>
              <th><span><HiArrowsUpDown className="tableArrowIcon" /> Soyadı</span></th>
              <th><span><HiArrowsUpDown className="tableArrowIcon" /> Ata adı</span></th>
              <th><span><HiArrowsUpDown className="tableArrowIcon" /> İcazələr</span></th>
              <th><span><HiArrowsUpDown className="tableArrowIcon" /> Mobil nömrə</span></th>
              <th><span><HiArrowsUpDown className="tableArrowIcon" /> Qiymətlər</span></th>
              <th><span><HiArrowsUpDown className="tableArrowIcon" /> Status</span></th>
              <th><span>Düzəliş</span></th> 
            </tr>
          </thead>
          <tbody>
            {
              dummyTechnicians.map((tech) => (
                <tr key={tech.id}>
                  <td className="usernameOfTech">
                    <img src={tech.img} className="imageOfTech" alt="" />
                    {tech.username}
                  </td>
                  <td>{tech.name}</td>
                  <td>{tech.surname}</td>
                  <td>{tech.patronymic}</td>
                  <td>{tech.authorities.join(", ")}</td>
                  <td>{tech.phone}</td>
                  <td><Link className="priceListLinkTech" to={`prices/${tech.id}`}>Qiymətlər</Link></td>
                  <td>
                    <span className={`status ${tech.enabled ? "active" : "passive"}`}>
                      {getStatus(tech)}
                    </span>
                  </td>
                 <td>
                      <div className="icons flex gap-3 cursor-pointer">
                        {icons.map((iconObj, idx) => (
                          <iconObj.icon
                            key={idx}
                            className={iconObj.className}
                            onClick={() => iconObj.action(tech)}
                          />
                        ))}
                      </div>
                    </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Technicians;
