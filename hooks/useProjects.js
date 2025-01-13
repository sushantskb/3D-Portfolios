import { useEffect, useState } from "react";
import useLoadingState from "../libs/loadingState";

const useProjects = () => {
  const { loading, setLoading } = useLoadingState();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_APP_URL;
        const res = await fetch(`${url}/api~v1/projects`);
        const data = await res.json();
        if (!data.success) {
          console.log("Something went wrong");
        }
        setProjects(data.projects);
      } catch (error) {
        console.log("Error in api");
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, [setLoading]);

  return {
    loading,
    projects,
  };
};

export default useProjects;
