import React from 'react';

const ControversialsPage = ({ tournament, controversials }) => {
    return (
        <div>
            <h1>{tournament ? tournament.name : 'Tournament Name Not Available'}</h1>
            {controversials && controversials.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название команды</th>
                            <th>Номер вопроса</th>
                            <th>Ответ команды</th>
                            <th>Статус</th>
                            <th>Комментарий</th>
                            <th>Комментарий апелляционного жюри</th>
                        </tr>
                    </thead>
                    <tbody>
                        {controversials.map((controversial, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{controversial.fullResult?.team?.teamName || 'No Team Name'}</td>
                                <td>{controversial.questionNumber}</td>
                                <td>{controversial.answer}</td>
                                <td>{controversial.status}</td>
                                <td>{controversial.comment}</td>
                                <td>{controversial.appealJuryComment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Спорные отсутствуют</p>
            )}
        </div>
    );
};

export default ControversialsPage;
