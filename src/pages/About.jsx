import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { experiences } from "../contstants/index";

import "react-vertical-timeline-component/style.min.css";
import CTA from "../components/CTA";
import useSkills from "../../hooks/useGetSkills";
import useExperience from "../../hooks/useGetExperience";

const About = () => {
  const { skills, loading: skillLoading } = useSkills();
  const { experiences, loading: expLoading } = useExperience();
  const filteredExpereinces = experiences.map((experience) => {
    return {
      company: experience.company,
      description: experience.description,
      role: experience.role,
      iconBg: "#003770",
      date: experience.fromDate + "-" + experience.toDate,
    };
  });

  return (
    <div
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <section className="max-container relative z-20">
        <h1 className="head-text">
          <span
            className="text-slate-200"
            style={{ textShadow: "2px 2px 4px black" }}>
            Hello, I'm{" "}
          </span>
          <span className="bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-text text-transparent font-semibold drop-shadow">
            {" "}
            Sushant Bishoi
          </span>{" "}
          👋
        </h1>

        <div className="mt-5 flex flex-col gap-3 text-slate-300">
          <p>
            Software Engineer based in India, specializing in technical
            education through hands-on learning and building applications.
          </p>
        </div>

        <div className="py-10 flex flex-col">
          <h3
            className="subhead-text text-slate-300"
            style={{ textShadow: "2px 2px 4px black" }}>
            My Skills
          </h3>

          <div className="mt-16 flex flex-wrap gap-12">
            {!skillLoading ? (
              skills.map((skill) => (
                <div className="block-container w-20 h-20" key={skill.name}>
                  <div className="btn-back rounded-xl" />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mx-auto text-slate-300 text-xl">
                Fetching Skills...
              </p>
            )}
          </div>
        </div>

        <div className="py-16">
          <h3
            className="subhead-text text-gray-200"
            style={{ textShadow: "2px 2px 4px black" }}>
            Work Experience.
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-lg text-slate-300">
            <p>
              I've worked with all sorts of companies, leveling up my skills and
              teaming up with smart people. Here's the rundown:
            </p>
          </div>

          <div className="mt-12 flex">
            <VerticalTimeline>
              {filteredExpereinces?.map((experience, index) => (
                <VerticalTimelineElement
                  key={experience.company}
                  date={experience.date}
                  dateClassName="date-text"
                  iconStyle={{ background: experience.iconBg }}
                  // icon={
                  //   <div className="flex justify-center items-center w-full h-full">
                  //     <img
                  //       src={experience.icon}
                  //       alt={experience.company_name}
                  //       className="w-[60%] h-[60%] object-contain"
                  //     />
                  //   </div>
                  // }
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    // borderBottomColor: experience.iconBg,
                    boxShadow: "none",
                    backgroundColor: "rgba(0, 0, 128, 0.6)",
                  }}>
                  <div>
                    <h3
                      className="text-white text-xl font-poppins font-semibold"
                      style={{ textShadow: "6px 6px 8px black" }}>
                      {experience.role}
                    </h3>
                    <p
                      className="text-white font-medium text-base"
                      style={{ margin: 0 }}>
                      {experience.company}
                    </p>
                  </div>

                  <p className="my-5 ml-5 text-white/50 font-normal pl-1 text-sm">
                    {experience.description}
                  </p>

                  {/* <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, index) => (
                      <li
                        key={`experience-point-${index}`}
                        className="text-white/50 font-normal pl-1 text-sm">
                        {point}
                      </li>
                    ))}
                  </ul> */}
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <hr className="border-slate-200" />

        <CTA />
      </section>
    </div>
  );
};

export default About;
