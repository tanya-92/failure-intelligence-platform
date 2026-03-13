import { useEffect, useState } from "react";
import api from "../api/api";
import WebsiteSelector from "../components/WebsiteSelector";
import Metrics from "../components/Metrics";
import FailureTable from "../components/FailureTable";

function Dashboard() {
  const [websites, setWebsites] = useState([]);
  const [selectdWebsite, setSelectedWebsite] = useState(null);
  const [failures, setFailures] = useState([]);

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    const res = await api.get("/websites");
    setWebsites(res.data);
  };

  const loadFailures = async (websiteId) => {
    const res = await api.get(`/failures?websiteId=${websiteId}`);
    setFailures(res.data.failures);
  };

  const handleSelect = (website) => {
    setSelectedWebsite(website);
    loadFailures(website._id);
  };

  return (
    <div>
      <h1>Failure Dashboard</h1>

      <WebsiteSelector websites={websites} onSelect={handleSelect} />

      <Metrics failures={failures} />

      <FailureTable failures={failures} />
    </div>
  );
}

export default Dashboard;
