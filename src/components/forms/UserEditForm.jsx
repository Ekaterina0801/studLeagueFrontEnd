import React, { useEffect, useState } from 'react';
import { getRoles } from '../../api/apiUsers';

const UserEditForm = ({ user, onSubmit, onCancel }) => {
    const [fullname, setFullname] = useState(user.fullname);
    const [roleId, setRoleId] = useState(user.role?.id || ''); 
    const [roles, setRoles] = useState([]);

    
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data);
            } catch (error) {
                console.error("Ошибка при загрузке ролей:", error);
            }
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        setFullname(user.fullname);
        setRoleId(user.role?.id || '');
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...user, fullname, role: { id: roleId } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ФИО</label>
                <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Роль</label>
                <select value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
                    {roles.map(roleOption => (
                        <option key={roleOption.id} value={roleOption.id}>
                            {roleOption.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onCancel}>Отменить</button>
        </form>
    );
};

export default UserEditForm;
