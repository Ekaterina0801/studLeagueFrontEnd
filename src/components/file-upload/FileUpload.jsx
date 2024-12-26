import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/apiHeaders";
import { withAuth } from "../../api/apiHeaders";
import { getAuthHeaders } from "../../api/apiHeaders";
import Loader from "../spinner/Spinner";
import SuccessMessage from "../successMessage/SuccessMessage";

const FileUpload = ({ tournamentId, leagueId, type }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Пожалуйста, выберите файл");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(tournamentId, leagueId, type, formData);
      setMessage("Файл успешно загружен!")
      window.location.reload();
    } catch (error) {
      console.error("Ошибка загрузки файла: ", error);
      alert("Загрузка файла не удалась");
    }
    finally{
      setLoading(false);
    }
  };

  const uploadFile = async (tournamentId, leagueId, type, formData) => {
    try {
        await withAuth(async (accessToken) => {
            console.log("Загрузка файла для турнира:", tournamentId, "в лиге:", leagueId);

            const url =
                type === "results"
                    ? `${API_URL}/upload-results?tournamentId=${tournamentId}&leagueId=${leagueId}`
                    : `${API_URL}/upload-compositions?tournamentId=${tournamentId}&leagueId=${leagueId}`;

            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...getAuthHeaders(accessToken),
                },
            });

            alert(response.data); 
        });
    } catch (error) {
        console.error("Ошибка загрузки файла: ", error);
        alert("Загрузка файла не удалась");
    }
  };

  return (
    <div>
      {loading && <Loader />} 
      {message && <SuccessMessage message={message} />}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
};

export default FileUpload;
