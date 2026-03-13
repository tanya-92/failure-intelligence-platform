function FailureTable({ failures }) {

  return (
    <div>

      <h3>Recent Failures</h3>

      <table border="1">
        <thead>
          <tr>
            <th>Time</th>
            <th>Service</th>
            <th>Severity</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {failures.map((failure) => (
            <tr key={failure._id}>
              <td>{new Date(failure.createdAt).toLocaleTimeString()}</td>
              <td>{failure.service}</td>
              <td>{failure.severity}</td>
              <td>{failure.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default FailureTable;