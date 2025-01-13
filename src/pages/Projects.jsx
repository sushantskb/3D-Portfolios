import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import CTA from "../components/CTA";
import { projects } from "../contstants/index";
import { arrow } from "../assets/icons";
import useProjects from "../../hooks/useProjects";

const Projects = () => {
  const { projects, loading } = useProjects();

  return (
    <div
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <section className="max-container">
        <h1 className="head-text">
          <span
            className="text-slate-200"
            style={{ textShadow: "2px 2px 4px black" }}>
            My{" "}
          </span>
          <span className="bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-text text-transparent drop-shadow font-semibold">
            Projects
          </span>
        </h1>

        <p className="text-slate-300 mt-2 leading-relaxed">
          I've embarked on numerous projects throughout the years, but these are
          the ones I hold closest to my heart. Many of them are open-source, so
          if you come across something that piques your interest, feel free to
          explore the codebase and contribute your ideas for further
          enhancements. Your collaboration is highly valued!
        </p>

        <div className="flex flex-wrap my-20 gap-16">
          {projects.map((project) => (
            <div className="lg:w-[400px] w-full" key={project.name}>
              <div className="block-container w-12 h-12">
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={project.icon}
                    alt="threads"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col">
                <h4
                  className="text-white text-2xl font-poppins font-semibold"
                  style={{ textShadow: "2px 2px 4px black" }}>
                  {project.name}
                </h4>
                <p
                  className="line-clamp-3 overflow-hidden mt-2 text-slate-200"
                  style={{ textShadow: "2px 2px 4px black" }}>
                  {project.description}
                </p>
                <div className="mt-5 flex items-center gap-2 font-poppins">
                  <Link
                    to={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-300"
                    style={{ textShadow: "2px 2px 4px black" }}>
                    Live Link
                  </Link>
                  <span
                    className="w-4 h-4 text-blue-300"
                    style={{ textShadow: "2px 2px 6px black" }}>
                    <FaArrowRightLong className="" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-slate-200" />

        <CTA />
      </section>
    </div>
  );
};

export default Projects;
