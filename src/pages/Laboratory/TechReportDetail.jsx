import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Images
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

function TechReportDetail() {
  const [technicianId, setTechnicianId] = useState("");
  const [technicianName, setTechnicianName] = useState("");
  const [totalDebt, setTotalDebt] = useState("");
  const [totalPaid, setTotalPaid] = useState("");
  const [totalRemaining, setTotalRemaining] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentData = async () => {
      setIsLoading(true);
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          console.error("Yeniləmə tokeni tapılmadı! Zəhmət olmasa yenidən daxil olun.");
          navigate("/login");
          return;
        }

        const response = await fetch("http://62.84.178.128:5555/api/v1/laboratory-payment/read", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }

        const data = await response.json();
        // Assuming the API returns a single object or we need to display the first one
        if (data && data.length > 0) {
          const paymentData = data[0];
          setTechnicianId(paymentData.technicianId || "");
          setTechnicianName(paymentData.fullName || "");
          setTotalDebt(paymentData.totalDebt.toString() || "");
          setTotalPaid(paymentData.totalPaid.toString() || "");
          setTotalRemaining(paymentData.totalRemaining.toString() || "");
        }
      } catch (error) {
        console.error("Ödəniş məlumatları yüklənərkən xəta baş verdi!", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, [navigate]);

  const handleCancel = () => {
    navigate("/technicals-report");
  };

  return (
    <div className="addSizesWrapper">
      <form className="addSizesContainer">
        <div className="addSizesInput display flex flex-column justify-between w-vw align-items-start">
          <p>
            Texnik<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Texnik adı"
            value={technicianName}
            disabled={true}
          />
        </div>

        <div className=" addSizesInput display flex flex-column justify-between align-items-start">
          <p>
            Ümumi Borc<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Ümumi borc"
            value={totalDebt}
            disabled={true}
          />
        </div>
        <div className=" addSizesInput display flex flex-column justify-between align-items-start">
          <p>
            Ödənilən Məbləğ<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Ödənilən məbləğ"
            value={totalPaid}
            disabled={true}
          />
        </div>
        <div className=" addSizesInput display flex flex-column justify-between align-items-start">
          <p>
            Qalıq<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Qalıq"
            value={totalRemaining}
            disabled={true}
          />
        </div>

        <div className="addSizesButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={handleCancel}
            disabled={isLoading}
          >
            <img src={cancelButton} alt="cancel" />
            İmtina et
          </button>
        </div>
      </form>
    </div>
  );
}

export default TechReportDetail;