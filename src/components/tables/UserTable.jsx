import React from "react";
import "./style.css"

function UserTable({ users, onSortChange, sortField, sortDirection, onUserRemove, showDeleteButton, onUserEdit }) {
    if (users.length === 0) {
      return <p>Пользователей пока нет</p>;
    }
  
    const getSortIndicator = (field) => {
      if (sortField === field) {
        return sortDirection === "asc" ? "▲" : "▼";
      }
      return "▲";
    };
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th onClick={() => onSortChange("fullname")}>
              ФИО {getSortIndicator("fullname")}
            </th>
            <th onClick={() => onSortChange("username")}>
              Никнейм {getSortIndicator("username")}
            </th>
            <th onClick={() => onSortChange("email")}>
              Электронная почта {getSortIndicator("email")}
            </th>
            <th onClick={() => onSortChange("role")}>
              Роль {getSortIndicator("role")}
            </th>
            {showDeleteButton && <th>Удалить</th>}
            <th>Редактировать</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.fullname}</td>
              <td>
                <a href={`/users/${user.id}`}>{user.username}</a>
              </td>
              <td>{user.email}</td>
              <td>{user.role.name}</td>
              {showDeleteButton && (
                <td>
                  <span
                    className="remove-icon"
                    onClick={() => onUserRemove(user.id)}
                  >
                    🗑️
                  </span>
                  <span className="remove-tooltip">Удалить пользователя</span>
                </td>
              )}
              <td>
                  <span
                    className="remove-icon"
                    onClick={() => onUserEdit(user)} 
                  >
                    ✏️
                  </span>
                  <span className="remove-tooltip">Редактировать пользователя</span>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}
  
export default UserTable;

  