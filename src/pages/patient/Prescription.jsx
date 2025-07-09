import React, { useEffect, useState } from "react";
import DownloadIcon from "../../assets/icons/Download";
import SimpleList from "../../components/list/SimpleList";
import { useNavigate, useParams } from "react-router-dom";
import usePatientRecipeStore from "../../../stores/usePatientRecipeStore"; // Path-i düzəldin

const Prescription = () => {
  const navigate = useNavigate();
  const { id: paramPatientId } = useParams();
  const currentPatientId = parseInt(paramPatientId);

  const {
    patientRecipes,
    loading,
    error,
    fetchPatientRecipes,
    removePatientRecipe,
    fetchRecipeName, // <--- Yeni action
    recipeNamesCache, // <--- Cache state
  } = usePatientRecipeStore();

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    console.log("Cari Xəstə ID:", currentPatientId);

    if (currentPatientId) {
      fetchPatientRecipes(currentPatientId);
    } else {
      console.warn("Patient ID is missing in the URL. Cannot fetch recipes.");
    }
  }, [fetchPatientRecipes, currentPatientId]);

  // Yeni useEffect: patientRecipes dəyişdikdə, hər birinin adını gətir
  useEffect(() => {
    const fetchMissingRecipeNames = async () => {
      // Yalnız `recipeName` null olan və ya cache-də olmayan reseptlər üçün sorğu atırıq
      // *** BURADA DA `patientRecipes`-in null/undefined olmaması üçün yoxlama əlavə edirik ***
      const recipesToFetch = (patientRecipes || []).filter(
        (recipe) =>
          !recipe.recipeName && recipe.recipeId && !recipeNamesCache[recipe.recipeId] // recipe.recipeId yoxlaması əlavə edildi
      );

      // Bütün lazımi adları paralel şəkildə fetch etmək üçün Promise.all istifadə edirik
      // (Performans üçün vacibdir!)
      await Promise.all(
        recipesToFetch.map(async (recipe) => {
          await fetchRecipeName(recipe.recipeId);
        })
      );
    };

    // *** BURADA DA `patientRecipes`-in null/undefined olmaması üçün yoxlama əlavə edirik ***
    if (patientRecipes && patientRecipes.length > 0) {
      fetchMissingRecipeNames();
    }
  }, [patientRecipes, fetchRecipeName, recipeNamesCache]); // Asılılıqlara `recipeNamesCache` də əlavə etdik

  // *** Əsas Dəyişiklik BURADA: patientRecipes-i map etməzdən əvvəl yoxlayırıq ***
  const listData = (patientRecipes && patientRecipes.length > 0)
    ? patientRecipes.map((recipe) => ({
        id: recipe.recipeId,
        // Adı cache-dən götürürük. Əgər API cavabında recipeName gəlirsə, onu üstün tuturuq.
        // Əks halda cache-dən, o da yoxdursa fallback dəyər.
        name: recipe.recipeName || recipeNamesCache[recipe.recipeId] || `Resept ${recipe.recipeId}`,
        date: new Date(recipe.date).toLocaleDateString("az-AZ"),
      }))
    : []; // Əgər patientRecipes boşdursa və ya undefined-dirsə, boş bir array qaytarırıq.

  const filteredData = selectedDate
    ? listData.filter((item) => item.date === new Date(selectedDate).toLocaleDateString("az-AZ"))
    : listData;

  const columns = [
    {
      label: "Ad",
      key: "name",
    },
    {
      label: "Tarix",
      key: "date",
    },
  ];

  const handleDelete = async (id) => {
    if (window.confirm("Bu resepti silmək istədiyinizə əminsinizmi?")) {
      try {
        await removePatientRecipe(id, currentPatientId);
        console.log("Resept uğurla silindi!");
      } catch (err) {
        console.error("Resept silinərkən xəta:", err);
        alert("Resept silinərkən xəta baş verdi: " + (err.message || "Naməlum xəta"));
      }
    }
  };

  // Loading state for initial fetch or when recipes are still empty
  if (loading && (!patientRecipes || patientRecipes.length === 0)) {
    return <div>Reseptlər yüklənir...</div>;
  }

  if (error) {
    return <div>Xəta: {error}</div>;
  }

  if (!currentPatientId && !loading && !error) {
    return <div>Xəstə ID-si tapılmadı. Reseptləri göstərmək mümkün deyil.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <div>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`add?patientId=${currentPatientId}`)}
            className="flex justify-center items-center bg-transparent text-[#155EEF] w-[178px] h-[36px] rounded-lg p-2 border border-[#155EEF] hover:bg-[#155EEF] hover:text-white transition-all duration-300"
          >
            + Yenisini əlavə et
          </button>
          <button>
            <DownloadIcon />
          </button>
        </div>
      </div>
      <div>
        {/* SimpleList-i yalnız `filteredData` boş deyilsə render edirik */}
        {filteredData && filteredData.length > 0 ? (
          <SimpleList
            data={filteredData}
            columns={columns}
            startPage={1}
            endPage={1}
            pageSize={10}
            enableEdit={true}
            enableDelete={true}
            enableView={true}
            handleEdit={(id) => {
              navigate(`${id}/edit?patientId=${currentPatientId}`);
            }}
            handleDelete={handleDelete}
            handleView={(id) => {
              navigate(`${id}?patientId=${currentPatientId}`);
            }}
          />
        ) : (
          // Əgər loading bitibsə, xəta yoxdursa və data yoxdursa "Resept tapılmadı" mesajını göstəririk
          !loading && !error && <div className="text-center py-4">Resept tapılmadı.</div>
        )}
      </div>
    </div>
  );
};

export default Prescription;