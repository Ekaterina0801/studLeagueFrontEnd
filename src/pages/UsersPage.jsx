import React, { useEffect, useState } from 'react';
import Loader from '../components/spinner/Spinner';
import SuccessMessage from '../components/successMessage/SuccessMessage';
import UserTable from '../components/tables/UserTable';
import useUsers from '../hooks/useUsers';
import { useModal } from '../hooks/useModal';
import SearchBar from '../components/search-bar/SearchBar';
import { deleteUser, updateUser } from '../api/apiUsers';
import UserEditForm from '../components/forms/UserEditForm';
import Modal from '../components/forms/Modal/Modal';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import { getCurrentUser } from '../api/apiUsers';

const UsersPage = () => {
    const [filters, setFilters] = useState({ role: '', name: '' });
    const [sort, setSort] = useState({ field: 'username', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(0);
    const { showModal, toggleModal } = useModal();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const { users, totalCount } = useUsers(filters, sort, currentPage);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userData = await getCurrentUser();
                setCurrentUser(userData);
            } catch (err) {
                setErrorMessage("Ошибка при получении текущего пользователя");
                console.error("Ошибка при получении текущего пользователя:", err);
            }
        };

        fetchCurrentUser();
    }, []);

    const handleUserEdit = user => {
        setSelectedUser(user);
        toggleModal();
    };

    const handleEditSubmit = async updatedUser => {
        setLoading(true);
        try {
            await updateUser(selectedUser.id, updatedUser);
            setSuccessMessage('Пользователь успешно обновлен!');
        } catch (error) {
            handleError("Не удалось обновить пользователя. Попробуйте позже");
        } finally {
            setLoading(false);
            setSelectedUser(null);
            toggleModal();
        }
    };

    const handleUserRemove = async userId => {
        const confirmed = window.confirm("Вы уверены, что хотите удалить этого пользователя?");
        if (!confirmed) return;
        setLoading(true);
        try {
            await deleteUser(userId);
            setSuccessMessage('Пользователь успешно удален!');
        } catch (error) {
            handleError("Не удалось удалить пользователя. Попробуйте позже");
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = field => {
        const newDirection = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
        setSort({ field, direction: newDirection });
    };

    const handlePageChange = page => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const handleError = message => {
        setErrorMessage(message);
        console.error(message);
    };

    if (loading) return <Loader />;
    
    if (!currentUser) {
        return <p>Загрузка текущего пользователя...</p>;
    }

    if (currentUser.role.name !== "ROLE_ADMIN") {
        return <p>Вы не авторизованы как администратор, вы не можете просматривать эту страницу</p>;
    }

    return (
        <div>
            {successMessage && <SuccessMessage message={successMessage} />}
            {errorMessage && <ErrorMessage message={errorMessage} />}

            <h2>Пользователи</h2>
            <SearchBar onSearch={search => setFilters(prev => ({ ...prev, name: search }))} />

            <UserTable
                users={users}
                onSortChange={handleSortChange}
                sortField={sort.field}
                sortDirection={sort.direction}
                onUserRemove={handleUserRemove}
                showDeleteButton={true}
                onUserEdit={handleUserEdit}
            />

            <div className="pagination">
                {Array.from({ length: Math.ceil(totalCount / 10) }, (_, index) => (
                    <button
                        className="pageNumberButton"
                        key={index}
                        onClick={() => handlePageChange(index)}
                        disabled={index === currentPage}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {showModal && (
                <Modal show={showModal} onClose={toggleModal}>
                    <UserEditForm 
                        user={selectedUser}                 
                        onSubmit={handleEditSubmit} 
                        onCancel={toggleModal} 
                    />
                </Modal>
            )}
        </div>
    );
};

export default UsersPage;
