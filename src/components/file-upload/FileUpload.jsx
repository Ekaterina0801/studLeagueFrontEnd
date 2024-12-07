import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/apiHeaders";
import { withAuth } from "../../api/apiHeaders";
import { getAuthHeaders } from "../../api/apiHeaders";


const FileUpload = ({ tournamentId, leagueId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Пожалуйста, выберите файл");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(tournamentId, leagueId, formData);
      alert("Файл успешно загружен!");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка загрузки файла: ", error);
      alert("Загрузка файла не удалась");
    }
  };

  const uploadFile = async (tournamentId, leagueId, formData) => {
    try {
      await withAuth(async (accessToken) => {
        console.log("Загрузка файла для турнира:", tournamentId, "в лиге:", leagueId);
        
        const response = await axios.post(
          `${API_URL}/upload-results?tournamentId=${tournamentId}&leagueId=${leagueId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              ...getAuthHeaders(accessToken), 
            },
          }
        );
        alert(response.data); 
      });
    } catch (error) {
      console.error("Ошибка загрузки файла: ", error);
      alert("Загрузка файла не удалась");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
};

export default FileUpload;
