import { useEffect } from "react";
import { useState } from "react";
import useLoadingState from "../libs/loadingState";

const useSkills = () => {
  const { loading, setLoading } = useLoadingState();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_APP_URL;
        const res = await fetch(`${url}/api~v1/skills`);
        const data = await res.json();
        if (!data.status) {
          throw new Error(data.message);
        }
        setSkills(data.skills);
      } catch (error) {
        console.log("Error in api", error);
      } finally {
        setLoading(false);
      }
    };
    getSkills();
  }, [setLoading]);
  return { loading, skills };
};

export default useSkills;
