import React, { useEffect, useMemo, useState } from 'react';
import debounce from "lodash.debounce";
import useUsers from '../../hooks/useUsers';


const UserSearchForm = ({ onSubmit, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryToSubmit, setQueryToSubmit] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryToSubmit) { 
      onSubmit(queryToSubmit);
      onClose(); 
    }
  };

  const handleSearchChange = useMemo(
    () =>
      debounce((value) => {
        setQueryToSubmit(value.trim() || null); 
      }, 500), 
    []
  );

  useEffect(() => {
    return () => handleSearchChange.cancel();
  }, [handleSearchChange]);

  const filters = useMemo(() => ({
    username: queryToSubmit || "", 
  }), [queryToSubmit]);

  const sort = useMemo(() => ({
    field: "fio",  
    direction: "asc",
  }), []);

  const { users, loading, error } = useUsers(filters); 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите username пользователя"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value); 
            handleSearchChange(e.target.value); 
          }}
        />
        <button type="submit">Поиск</button>
      </form>
      
      {queryToSubmit ? (
        loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error.message || "Произошла ошибка."}</p>
        ) : users.length > 0 ? (
          <div className="user-list">
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.fullname} ({user.username}){" "}
                  <button onClick={() => {
                    onSubmit(user.id); 
                    onClose(); 
                  }}>
                    Добавить
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Пользователи не найдены</p>
        )
      ) : (
        <p>Введите username для поиска пользователей</p>
      )}
    </div>
  );
};

export default UserSearchForm;

