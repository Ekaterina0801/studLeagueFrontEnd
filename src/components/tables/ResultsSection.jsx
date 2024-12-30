const ResultsSection = ({ tableResult, showQuestions, toggleQuestions }) => {
  const processedResults = tableResult.map((result, index) => {
    const answers = result.maskResults
      .split("")
      .map((char) => (char === "1" ? "✔" : "✘"));
    return {
      number: index + 1,
      teamName: result.team.name,
      questionNumbers: Array.from({ length: answers.length }, (_, i) => i + 1),
      answers,
      totalScore: result.totalScore,
      countQuestions: answers.length,
    };
  });

  if (processedResults.length === 0) {
    return <p>Результаты отсутствуют</p>;
  }

  return (
    <div>
      <button onClick={toggleQuestions}>
        {showQuestions ? "Скрыть столбцы вопросов" : "Показать столбцы вопросов"}
      </button>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Название команды</th>
              {processedResults[0].questionNumbers.map((number, index) => (
                <th
                  key={index}
                  className={showQuestions ? "questionColumn" : "hidden"}
                >
                  {number}
                </th>
              ))}
              <th>Итог</th>
            </tr>
          </thead>
          <tbody>
            {processedResults.map((result, index) => (
              <tr key={index}>
                <td>{result.number}</td>
                <td>{result.teamName}</td>
                {result.answers.map((answer, answerIndex) => (
                  <td
                    key={answerIndex}
                    className={showQuestions ? "questionColumn" : "hidden"}
                  >
                    {answer}
                  </td>
                ))}
                <td>{`${result.totalScore} / ${result.countQuestions}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsSection;
