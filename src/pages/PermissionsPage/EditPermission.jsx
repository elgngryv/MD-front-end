import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import "../../assets/style/PermissionPage/editpermission.css"

const permissions = [
  {
    group: null,
    items: [
      "Ümumi təqvim", "Pasientlər", "Müayinələri", "Planları", "Müalicələr", "Anamnez", "Sığortaları", "Reseptləri", "Rentgen", "Fotolar", "Videolar", "Hesabat"
    ]
  },
  {
    group: "QRAFİKLƏR",
    items: [
      "Mənim təqvimim", "Növbə gözləyənlər", "Həkimlər", "Həkimlərin iş qrafiki", "Görülmüş işlər"
    ]
  },
  {
    group: "LABORATORİYA",
    items: [
      "Göndərilən sifarişlər", "Gələn sifarişlər", "Texniklər üzrə hesabat"
    ]
  },
  {
    group: "ANBAR ƏMƏLİYYATLARI",
    items: [
      "Klinikanın stoku",
      "Kabinet/Obyekt stoku",
      "Anbara maddəxil",
      "Anbara sifariş",
      "Anbardan maxaric",
      "Anbardan daxilolmalar",
      "Anbardan silinmə",
      "Məhsul istifadəsi"
    ]
  },
  {
    group: "TƏNZİMLƏMƏLƏR",
    items: [
      "İcazələr",
      "Admin istifadəçiləri",
      "Texniklər",
      "Randevu tipləri",
      "Müayinə siyahısı",
      "Əməliyyat növləri",
      "Digər",
      "Rənglər",
      "İmplantlar",
      "Qarnirlar",
      "Sığorta şirkətləri",
      "Qiymət kateqoriyaları",
      "Kabinetlər",
      "Digər obyektlər",
      "Reseptlər",
      "Tövsiyə edənlər",
      "Anamnez siyahısı",
      "Elmi dərəcələr",
      "İxtisaslar",
      "Məhsul kateqoriyaları",
      "Qara siyahı səbəbləri",
      "Ümumi tənzimləmələr"
    ]
  }
];
const actions = ["Oxuma", "Yaratma", "Redaktə", "Silmə", "Status", "Sıralama"];

function EditPermission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // Mövcud permission-ları API-dən və ya prop-dan yükləmək üçün ayrıca state
  const [checked, setChecked] = useState(() => {
    const obj = {};
    permissions.forEach(group => {
      group.items.forEach(item => {
        obj[item] = {};
        actions.forEach(action => {
          obj[item][action] = false;
        });
      });
    });
    return obj;
  });

  // Simulyasiya: mövcud permission-ları yüklə (əslində API çağırışı olmalıdır)
  useEffect(() => {
    // Burada id ilə permission-ları API-dən çəkib setName və setChecked-ə doldura bilərsən
    // Məsələn:
    // fetch(`/api/permissions/${id}`).then(...)
    // setName(response.name)
    // setChecked(response.permissions)
    // Demo üçün bir neçə dəyəri true edək:
    setName("Redaktə olunan icazə adı");
    setChecked(prev => ({
      ...prev,
      "Ümumi təqvim": { ...prev["Ümumi təqvim"], "Oxuma": true, "Yaratma": true },
      "Klinikanın stoku": { ...prev["Klinikanın stoku"], "Oxuma": true }
    }));
  }, [id]);

  // Sütun başlığı üçün: bütün item-lər checked-dirsə true, yoxsa false
  const isActionAllChecked = (action) => {
    return Object.keys(checked).every(item => checked[item][action]);
  };

  // Row üçün: bütün action-lar checked-dirsə true, yoxsa false
  const isRowAllChecked = (item) => {
    return actions.every(action => checked[item][action]);
  };

  // Sütun başlığındakı inputa basanda bütün item-lər üçün həmin action-u dəyiş
  const handleCheckAll = (action) => {
    const allChecked = isActionAllChecked(action);
    setChecked(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(item => {
        updated[item][action] = !allChecked;
      });
      return updated;
    });
  };

  // Row başındakı inputa basanda bütün action-ları dəyiş
  const handleCheckRow = (item) => {
    const allChecked = isRowAllChecked(item);
    setChecked(prev => ({
      ...prev,
      [item]: actions.reduce((acc, action) => {
        acc[action] = !allChecked;
        return acc;
      }, {})
    }));
  };

  // Əgər hər hansı bir action/row dəyişərsə, başlıqlar avtomatik yenilənəcək (çünki state-dən oxunur)

  const handleCheck = (item, action) => {
    setChecked(prev => ({
      ...prev,
      [item]: {
        ...prev[item],
        [action]: !prev[item][action]
      }
    }));
  };

  const handleSave = () => {
    // Burada redaktə olunan icazələri göndərə bilərsiniz
    console.log("Edit ID:", id, "Yeni ad:", name, checked);
    navigate("/permissions");
  };

  return (
    <div className="addPermissionContainer">
      <div className="addPermissionWrapper">
        <form className="addPermissionForm" onSubmit={e => e.preventDefault()}>
          <div className="topPartForm">
            <label htmlFor="name">İcazənin adı <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="İcazənin adı"
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <label style={{marginTop:20, fontWeight:'bold'}}>İcazələr (redaktə)</label>
          <div className="permissionTableWrapper">
            <table className='permissionTable' style={{width:'100%', borderCollapse:'collapse', background:'#f8f9fa'}}>
              <thead>
                <tr>
                  <th style={{padding:'8px', textAlign:'left'}}>İcazələr</th>
                  {actions.map(action => (
                    <th key={action} style={{padding:'8px', textAlign:'center'}}>
                      <input
                        type="checkbox"
                        checked={isActionAllChecked(action)}
                        indeterminate={!isActionAllChecked(action) && Object.keys(checked).some(item => checked[item][action])}
                        onChange={() => handleCheckAll(action)}
                      />
                      <div>{action}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((group, idx) => (
                  <React.Fragment key={group.group || 'main'}>
                    {group.group && (
                      <tr>
                        <td colSpan={actions.length+1} style={{fontWeight:'bold', fontSize:'14px',textAlign:'left',paddingLeft:'20px',color:'#155EEF', padding:'8px'}}>{group.group}</td>
                      </tr>
                    )}
                    {group.items.map(item => (
                      <tr key={item}>
                        <td style={{padding:'8px'}}>
                          <input
                            type="checkbox"
                            checked={isRowAllChecked(item)}
                            indeterminate={!isRowAllChecked(item) && actions.some(action => checked[item][action])}
                            onChange={() => handleCheckRow(item)}
                            style={{marginRight:8}}
                          />
                          {item}
                        </td>
                        {actions.map(action => (
                          <td key={action} style={{textAlign:'center'}}>
                            <input
                              type="checkbox"
                              checked={checked[item][action]}
                              onChange={() => handleCheck(item, action)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="addPermissionActions">
            <button
              type="button"
              className="cancelBtn"
              onClick={() => navigate("/permissions")}
            >
              <RxCross2 /> İmtina et
            </button>
            <button
              type="submit"
              className="saveBtn"
              onClick={handleSave}
            >
              <FiCheck /> Yadda saxla (redaktə)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPermission;
