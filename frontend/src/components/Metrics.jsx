function Metrics({ failures }) {
  const today = new Date().toDateString();

  const failuresToday = failures.filter((failure) => new Date(failure.createdAt).toDateString() === today);

  const critical = failures.filter((failure) => failure.severity === "high");

  const services = new Set(failures.map((failure) => failure.service));

  return (
    <div>
      <h3>Metrics</h3>

      <p>Failures Today: {failuresToday.length}</p>
      <p>Critical Failures: {critical.length}</p>
      <p>Services Affected: {services.size}</p>
    </div>
  );
}

export default Metrics;
