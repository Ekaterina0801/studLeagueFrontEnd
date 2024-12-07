import { useState, useEffect } from "react";
import { getFlags } from "../api/apiFlags";
import { getTeamById } from "../api/apiTeams";
import { addFlagToTeam, deleteFlagFromTeam } from "../api/apiTeams";

export const useFlags = (teamId) => {
  const [flags, setFlags] = useState([]);
  const [allFlags, setAllFlags] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const fetchedFlags = await getFlags();
        setAllFlags(fetchedFlags);
      } catch (err) {
        setError("Ошибка загрузки флагов");
      }
    };

    fetchFlags();
  }, []);

  useEffect(() => {
    const fetchTeamFlags = async () => {
      if (teamId) {
        try {
          const teamData = await getTeamById(teamId);
          setFlags(teamData.flags || []);
        } catch (err) {
          setError("Ошибка загрузки флагов команды");
        }
      }
    };

    fetchTeamFlags();
  }, [teamId]);

  const addFlag = async (flagId) => {
    try {
      await addFlagToTeam(teamId, flagId);
      setFlags((prevFlags) => [...prevFlags, { id: flagId }]);
      setSuccessMessage("Флаг успешно добавлен к команде");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Ошибка добавления флага");
    }
  };

  const removeFlag = async (flagId) => {
    try {
      await deleteFlagFromTeam(teamId, flagId);
      setFlags((prevFlags) => prevFlags.filter((flag) => flag.id !== flagId));
      setSuccessMessage("Флаг успешно удален из команды");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Ошибка удаления флага");
    }
  };

  return {
    flags,
    allFlags,
    successMessage,
    error,
    addFlag,
    removeFlag,
  };
};
