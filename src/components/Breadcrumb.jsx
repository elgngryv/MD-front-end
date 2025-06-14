import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const Breadcrumb = () => {
  const location = useLocation();
  const params = useParams();
  
  // URL-dən gələn hissələri decode et
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment)
    .map(decodeURIComponent);

  const getBreadcrumbName = (segment, index, segments) => {
    if (params[segment] || Object.values(params).includes(segment)) {
      const paramKey = Object.keys(params).find(key => params[key] === segment);
      if (paramKey) {
        switch (paramKey) {
          case 'id':
            const context = segments[index - 1];
            switch (context) {
              case 'patient':
                return 'Xəstə #' + segment;
              case 'user':
              case 'employee':
                return 'İşçi #' + segment;
              case 'stock':
                return 'Anbar #' + segment;
              case 'insurance':
                return 'Sığorta #' + segment;
              case 'prescription':
                return 'Reçete #' + segment;
              default:
                return '#' + segment;
            }
          case 'mode':
            return segment === 'view' ? 'Baxış' : 'Redaktə';
          default:
            return segment;
        }
      }
    }

    switch (segment) {
      case 'patient':
        return 'Xəstə';
      case 'card':
        return 'Pasiyent kartı';
      case 'export':
        return 'Məxaric';
      case 'anamnesis-details':
        return 'Anamnezlər';
      case 'anamnesis':
        return 'Anamnezlərin siyahısı';
      case 'recepts':
        return 'Reseptlər';
      case 'recommendations':
        return 'Tövsiyə edənlər';
      case 'general-settings':
        return 'Ümumi tənzimləmələr';
      case 'other-objects':
        return 'Digər obyektlər';
      case 'general':
        return 'Ümumi';
      case 'detail':
        return 'Ətraflı';
      case 'technicals-report':
        return 'Texniklər üzrə hesabat';
      case 'sent-orders':
        return 'Göndərilən sifarişlə';
      case 'received-orders':
        return 'Gələn sifarişlər';      
      case 'work-schedule':
        return 'İşçilərin iş qrafiki';      
      case 'add':
        return 'Yenisini əlavə et';
      case 'edit':
        return 'Redaktə et';
      case 'price-category':
        return 'Qiymət kateqoriyaları';
      case 'cabinets':
        return 'Kabinetlər';
      case 'insurance':
        return 'Sığorta şirkətləri';
      case 'examination':
        return 'Müayinə';
      case 'plans':
        return 'Planlar';
      case 'add-user':
        return 'İşçi əlavə et';
      case 'view-user':
        return 'İşçilər';
      case 'add-patient':
        return 'Xəstə əlavə et';
      case 'compare-plans':
        return 'Müqayisə';
      case 'stock':
        return 'Anbar';
      case 'clinic':
        return 'Klinika';
      case 'cabinet':
        return 'Kabinet';
      case 'import':
        return 'Mədaxil';
      case 'order':
        return 'Sifariş';
      case 'entry':
        return 'Daxilolma';
      case 'delete':
        return 'Silinmə';
      case 'usage':
        return 'İstifadə';
      case 'colors':
        return 'Rənglər';
      case 'edit-category':
        return '';
      case 'edit-product':
        return '';
      case 'edit-queue':
        return 'Redaktə et';
      case 'settings':
        return 'Tənzimləmələr';
      case 'laboratory':
        return 'Laboratoriya';
      case 'employees':
        return 'İşçilər';
      case 'reports':
        return 'Hesabat';
      case 'patients':
        return 'Pasiyentlər';
      case 'product-categories':
        return 'Məhsul kateqoriyaları';
      case 'queue':
        return 'Növbə gözləyənlər';
      case 'add-new':
        return 'Yenisini əlavə et';
      case 'checklist':
        return 'Müayinə siyahısı';
      case 'appointments':
        return 'Randevular';
      case 'employee-schedule':
        return 'İş qrafiki';
      case 'technicians':
        return 'Texniklər';
      case 'admin-users':
        return 'Admin istifadəçiləri';
      case 'edit-employee':
        return 'İşçi readaktəsi';
      case 'permissions':
        return 'İcazələr';
      case 'add-permission':
        return 'İcazə əlavə et';
      case 'academic-degrees':
        return 'Elmi dərəcələr';
      case 'add-degree':
        return 'Elmi dərəcə əlavə et';
      case 'specialities':
        return 'İxtisaslar';
      case 'add-speciality':
        return 'İxtisas əlavə et';
      case 'metals':
        return 'Metallar';
      case 'add-metal':
        return 'Metal əlavə et';
      case 'ceramics':
        return 'Keramikalar';
      case 'add-ceramic':
        return 'Keramika əlavə et';
      case 'blacklist-reasons':
        return 'Qara siyahı səbəbləri';
      case 'add-reason':
        return 'Səbəb əlavə et';
      case 'edit-reason':
        return 'Səbəbi redaktə et';
      case 'edit-ceramic':
        return 'Keramikanı redaktə et';
      case 'edit-metal':
        return 'Metalı redaktə et';
      case 'edit-speciality':
        return 'İxtisası redaktə et';
      case 'edit-degree':
        return 'Elmi dərəcəni redaktə et';

      case 'appointment-types':
        return 'Randevu tipləri';
      case 'employee-add':
        return 'İşçi əlavə et';
      case 'employee':
        return 'İşçi';
      case 'randevu-card':
        return 'Randevu kartı';
      case 'add-new-appointment':
        return 'Yeni randevu';
      case 'receiving-orders':
        return 'Sifarişlərin qəbulu';
      case 'Sərf məhsulları':
        return 'Sərf məhsulları';

      default:
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    }
  };

  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-item">Ana səhifə</Link>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={segment}>
          <IoIosArrowForward className="breadcrumb-separator" />
          {index === pathSegments.length - 1 ? (
            <span className="breadcrumb-item active">
              {getBreadcrumbName(segment, index, pathSegments)}
            </span>
          ) : (
            <Link 
              to={`/${pathSegments.slice(0, index + 1).join('/')}`} 
              className="breadcrumb-item"
            >
              {getBreadcrumbName(segment, index, pathSegments)}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
