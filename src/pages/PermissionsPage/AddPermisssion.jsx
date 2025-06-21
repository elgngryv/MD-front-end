import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import usePermissionStore from "../../../stores/permissionStore";
import "../../assets/style/PermissionPage/addpermission.css";

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
      "Klinikanın stoku", "Kabinet/Obyekt stoku", "Anbara maddəxil", "Anbara sifariş",
      "Anbardan maxaric", "Anbardan daxilolmalar", "Anbardan silinmə", "Məhsul istifadəsi"
    ]
  },
  {
    group: "TƏNZİMLƏMƏLƏR",
    items: [
      "İcazələr", "Admin istifadəçiləri", "Texniklər", "Randevu tipləri", "Müayinə siyahısı",
      "Əməliyyat növləri", "Digər", "Rənglər", "İmplantlar", "Qarnirlar", "Sığorta şirkətləri",
      "Qiymət kateqoriyaları", "Kabinetlər", "Digər obyektlər", "Reseptlər", "Tövsiyə edənlər",
      "Anamnez siyahısı", "Elmi dərəcələr", "İxtisaslar", "Məhsul kateqoriyaları",
      "Qara siyahı səbəbləri", "Ümumi tənzimləmələr"
    ]
  }
];

const actions = ["Oxuma", "Yaratma", "Redaktə", "Silmə", "Status", "Sıralama"];

function AddPermission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createPermission } = usePermissionStore();

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

  const isActionAllChecked = (action) => {
    return Object.keys(checked).every(item => checked[item][action]);
  };

  const isRowAllChecked = (item) => {
    return actions.every(action => checked[item][action]);
  };

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

  const handleCheck = (item, action) => {
    setChecked(prev => ({
      ...prev,
      [item]: {
        ...prev[item],
        [action]: !prev[item][action]
      }
    }));
  };

  const handleSave = async () => {
    const transformedPermissions = Object.keys(checked).reduce((acc, item) => {
      const selectedActions = Object.keys(checked[item]).filter(
        (action) => checked[item][action]
      );

      if (selectedActions.length > 0) {
        acc.push({
          moduleUrl: item,
          actions: selectedActions.map(action => {
            switch (action) {
              case "Oxuma": return "READ";
              case "Yaratma": return "CREATE";
              case "Redaktə": return "UPDATE";
              case "Silmə": return "DELETE";
              case "Status": return "STATUS";
              case "Sıralama": return "SORT";
              default: return action.toUpperCase();
            }
          })
        });
      }

      return acc;
    }, []);

    const newPermission = {
      permissionName: name,
      permissions: transformedPermissions
    };

    try {
      await createPermission(newPermission);
      navigate("/permissions");
    } catch (error) {
      console.error("İcazə yaratmaqda xəta:", error);
    }
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

          <label style={{ marginTop: 20, fontWeight: 'bold' }}>İcazələr</label>

          <div className="permissionTableWrapper">
            <table className='permissionTable'>
              <thead>
                <tr>
                  <th>İcazələr</th>
                  {actions.map(action => (
                    <th key={action} style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isActionAllChecked(action)}
                        onChange={() => handleCheckAll(action)}
                      />
                      <div>{action}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map(group => (
                  <React.Fragment key={group.group || "main"}>
                    {group.group && (
                      <tr>
                        <td colSpan={actions.length + 1} className="groupHeader">{group.group}</td>
                      </tr>
                    )}
                    {group.items.map(item => (
                      <tr key={item}>
                        <td>
                          <input
                            type="checkbox"
                            checked={isRowAllChecked(item)}
                            onChange={() => handleCheckRow(item)}
                            style={{ marginRight: 8 }}
                          />
                          {item}
                        </td>
                        {actions.map(action => (
                          <td key={action} style={{ textAlign: 'center' }}>
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
              <RxCross2 /> imtina et
            </button>
            <button
              type="submit"
              className="saveBtn"
              onClick={handleSave}
            >
              <FiCheck /> Yadda saxla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPermission;
