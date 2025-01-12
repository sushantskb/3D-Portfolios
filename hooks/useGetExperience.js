import { useEffect, useState } from "react";
import useLoadingState from "../libs/loadingState";

const useExperience = () => {
    const { loading, setLoading } = useLoadingState();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const getExperiences = async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_APP_URL;
        const res = await fetch(`${url}/api~v1/profiles`);
        const data = await res.json();
        if (!data.success) {
          console.log("Something went wrong");
        }
        setExperiences(data.profiles);
      } catch (error) {
        console.log("Error in api", error);
      } finally {
        setLoading(false);
      }
    };
    getExperiences();
  }, [setLoading]);

  return {
    loading,
    experiences,
  };
};

export default useExperience;
