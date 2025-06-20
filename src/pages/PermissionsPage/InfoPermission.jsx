import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../../assets/style/PermissionPage/infopermission.css"
import { FiEdit3 } from "react-icons/fi";

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

function InfoPermission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
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

  useEffect(() => {
    // Simulyasiya üçün
    setName("İcazə adı (info)");
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

  return (
    <div className="infoPermissionContainer">
      <div className="infoPermissionWrapper">
        <div className="editIconForInfoPermissionContainer">
            <FiEdit3 className='editIconForInfoPermission' onClick={() => navigate(`/edit-permission/${id}`)} />
        </div>
        <form className="infoPermissionForm" onSubmit={e => e.preventDefault()}>
          <div className="infoTopPartForm">
            <label htmlFor="name">İcazənin adı <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="İcazənin adı"
              disabled
              className="infoInput"
            />
          </div>
          <label style={{marginTop:20, fontWeight:'bold'}}>İcazələr (baxış)</label>
          <div className="infoPermissionTableWrapper">
            <table className='infoPermissionTable' style={{width:'100%', borderCollapse:'collapse', background:'#f8f9fa'}}>
              <thead>
                <tr>
                  <th style={{padding:'8px', textAlign:'left'}}>İcazələr</th>
                  {actions.map(action => (
                    <th key={action} style={{padding:'8px', textAlign:'center'}}>
                      <input
                        type="checkbox"
                        checked={isActionAllChecked(action)}
                        disabled
                        readOnly
                        style={{pointerEvents: 'none'}}
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
                            disabled
                            readOnly
                            style={{marginRight:8, pointerEvents: 'none'}}
                          />
                          {item}
                        </td>
                        {actions.map(action => (
                          <td key={action} style={{textAlign:'center'}}>
                            <input
                              type="checkbox"
                              checked={checked[item][action]}
                              disabled
                              readOnly
                              style={{pointerEvents: 'none'}}
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
          <div className="infoPermissionActions">
           
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default InfoPermission;
